import React from "react";
import { SimpleCard } from "matx";
import UserForm from "./UserForm";

const WizardForm = () => {
  return (
    <div className="m-sm-30">
      <SimpleCard title="">
        <UserForm></UserForm>
      </SimpleCard>
      <div className="py-3"></div>
    </div>
  );
};

export default WizardForm;
