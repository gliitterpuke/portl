import React from "react";
import { SimpleCard } from "matx";
import HorizontalStepper from "./HorizontalStepper";

const WizardForm = () => {
  return (
    <div className="m-sm-30">
      <SimpleCard title="">
        <HorizontalStepper></HorizontalStepper>
      </SimpleCard>
      <div className="py-3"></div>
    </div>
  );
};

export default WizardForm;
