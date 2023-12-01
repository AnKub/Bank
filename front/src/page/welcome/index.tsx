import "./index.css";
import { PageContent } from "../../component/page-content";
import { Button } from "../../component/button";
import money from "./money.png";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  const login = () => {};
  const registration = () => {};

  return (
    <div className="page welcome">
      <div className="background__img"></div>
      <img src={money} alt="Money" className="money__img"></img>
      <PageContent isBetween>
        <div className="heading">
          <h1 className="heading__title">Hello!</h1>
          <h4 className="heading__sub__title">Welcome to bank app</h4>
        </div>
        <div className="form">
          <Link to="/signup">
            <Button isOutside onClick={registration}>
              Sign Up
            </Button>
          </Link>
          <Link to="/signin">
            <Button onClick={login}> Sign In</Button>
          </Link>
        </div>
      </PageContent>
    </div>
  );
};
