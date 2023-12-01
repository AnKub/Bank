import { PageContent } from "../../component/page-content";
import { PageTitle } from "../../component/page-title";
import { Header } from "../../component/header";
import { Field } from "../../component/filed";
import { Button } from "../../component/button";

import { QuestionRedirect } from "../../component/question-redirect";
import { Alert } from "../../component/alert";

type SignUpConfirmPageType = {
  codeHandler: any;
  submitHandler: any;
  submitIsActive: any;
  isAlert: any;
};
export const SignUpConfirmPage = ({
  codeHandler,
  submitHandler,
  submitIsActive,
  isAlert,
}: SignUpConfirmPageType) => {
  return (
    <div className="page">
      <PageContent>
        <Header />
        <PageTitle
          title="Confirm account"
          subTitle="Write the code you received"
        />
        <Field name="Code" handler={codeHandler} />
        <Button isActive={submitIsActive} onClick={submitHandler}>
          Confirm
        </Button>
        {isAlert && <Alert message={isAlert} />}
      </PageContent>
    </div>
  );
};
