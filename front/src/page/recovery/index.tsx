import { PageContent } from "../../component/page-content";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

type SignUpPageType = {
  emailHandler: any;
  submitHandler: any;
  submitIsActive: any;
  isAlert: any;
};
export const RecoveryPage = ({
  emailHandler,
  submitHandler,
  submitIsActive,
  isAlert,
}: SignUpPageType) => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle
          title="Recover password"
          subTitle="Choose a recovery method"
        />
        <Field name="Email" handler={emailHandler} type="email" />
        <Button isActive={submitIsActive} onClick={submitHandler}>
          Send code
        </Button>
        {isAlert && <Alert message={isAlert} />}
      </PageContent>
    </div>
  );
};
