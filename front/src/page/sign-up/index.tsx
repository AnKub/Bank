import { PageContent } from "../../component/page-content";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

type SignUpPageType = {
  emailHandler: any;
  passwordHandler: any;
  submitHandler: any;
  submitIsActive: any;
  isAlert: any;
};
export const SignUpPage = ({
  emailHandler,
  passwordHandler,
  submitHandler,
  submitIsActive,
  isAlert,
}: SignUpPageType) => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle title="Sign up" subTitle="Choose a registration method" />
        <Field name="Email" handler={emailHandler} type="email" />
        <Field name="Password" handler={passwordHandler} type="password" />
        <QuestionRedirect
          question="Already have an account?"
          redirectText="Sign In"
          redirectTo="/signin"
        />
        <Button isActive={submitIsActive} onClick={submitHandler}>
          Continue
        </Button>
        {isAlert && <Alert message={isAlert} />}
      </PageContent>
    </div>
  );
};
