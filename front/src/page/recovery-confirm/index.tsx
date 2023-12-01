import { PageContent } from "../../component/page-content";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

type RecoveryConfirmPageType = {
  passwordHandler: any;
  codeHandler: any;
  submitHandler: any;
  submitIsActive: any;
  isAlert: any;
};
export const RecoveryConfirmPage = ({
  passwordHandler,
  codeHandler,
  submitHandler,
  submitIsActive,
  isAlert,
}: RecoveryConfirmPageType) => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle
          title="Recover password"
          subTitle="Write the code you received"
        />
        <Field name="Code" handler={codeHandler} />
        <Field name="New password" handler={passwordHandler} type="password" />
        <QuestionRedirect
          question=" Forgot your password?"
          redirectText="Restore"
          redirectTo="/recovery"
        />
        <Button isActive={submitIsActive} onClick={submitHandler}>
          Restore password
        </Button>
        {isAlert && <Alert message={isAlert} />}
      </PageContent>
    </div>
  );
};
