import "./index.css";
import { Link, useNavigate } from "react-router-dom";

export const QuestionRedirect = ({
  question,
  redirectText,
  redirectTo,
}: {
  question: string;
  redirectTo: string;
  redirectText: string;
}) => {
  const navigate = useNavigate();

  return (
    <span className="question__redirect">
      {question} <Link to={redirectTo}>{redirectText}</Link>
    </span>
  );
};
