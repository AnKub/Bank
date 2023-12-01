import { ChangeEvent, useEffect, useState } from "react";
import "./index.css";
import { emailRegex, moneyRegex, passwordRegex } from "../../utils/regex";
import eye from "../../assets/svg/Eye.svg";
import eyeHide from "../../assets/svg/eye-hide.svg";
type filedTypes = "text" | "email" | "password" | "money";

const alertDescription: { [key in filedTypes]: any } = {
  text: "",
  email: "Sorry, email is wrong",
  password: "Sorry, the password is too simple",
  money: "Sorry, sum is wrong",
};

enum validStatus {
  DEFAULT,
  VALID,
  INVALID,
}
export type handlerFieldData = {
  isValid: boolean;
  value: string;
};

type fieldProps = {
  name: string;
  type?: filedTypes;
  placeholder?: string;
  optional?: boolean;
  defaultValue?: string;
  handler?: (data: handlerFieldData) => void;
};

export const Field = ({
  name,
  type = "text",
  optional = false,
  placeholder,
  defaultValue = "",
  handler,
}: fieldProps) => {
  const [valid, setValid] = useState<validStatus>(validStatus.DEFAULT);
  const [value, setValue] = useState<string>(defaultValue);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      checkValid(defaultValue);
      if (handler) {
        handler({
          isValid: valid !== validStatus.INVALID ? true : false,
          value,
        });
      }
    }
  }, [defaultValue]);

  const handlerVisibility = () => {
    setVisibility((prev) => !prev);
  };

  const checkValid = (value: string) => {
    let valid;
    if (!value) {
      valid = optional ? validStatus.DEFAULT : validStatus.INVALID;
    } else
      switch (type) {
        case "email":
          valid = emailRegex.test(value)
            ? validStatus.VALID
            : validStatus.INVALID;

          break;
        case "password":
          valid = passwordRegex.test(value)
            ? validStatus.VALID
            : validStatus.INVALID;

          break;
        case "money":
          valid = moneyRegex.test(value)
            ? validStatus.VALID
            : validStatus.INVALID;

          break;
        default:
          valid = validStatus.VALID;
          break;
      }

    setValid(valid);
    return valid;
  };

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    const valid = checkValid(value);
    setValue(value);

    if (handler)
      handler({
        isValid: valid !== validStatus.INVALID ? true : false,
        value,
      });
  };

  return (
    <div className="field">
      <label>{name}</label>
      <div
        className={`field__block__input ${
          valid === validStatus.VALID && "input--valid"
        }   ${valid === validStatus.INVALID && "input--not-valid"}`}
      >
        {type === "money" && <span className="field__money">$</span>}
        <input
          className="field__input"
          onChange={(e) => {
            handlerChange(e);
          }}
          value={value}
          type={type === "password" && visibility ? "text" : type}
          placeholder={placeholder}
        />
        {type === "password" && (
          <img
            onClick={handlerVisibility}
            className="field__view"
            src={visibility ? eyeHide : eye}
          ></img>
        )}
      </div>
      <span className="field-alert">
        {valid === validStatus.INVALID && alertDescription[type]}
      </span>
    </div>
  );
};
