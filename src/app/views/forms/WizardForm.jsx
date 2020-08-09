import React from "react";
import { SimpleCard } from "matx";
import HorizontalStepper from "./HorizontalStepper";
import HorizontalStepper2 from "./HorizontalStepper2";
import Hor from "./Hor";

const WizardForm = () => {
  return (
    <div className="m-sm-30">
      <SimpleCard title="">
        <Hor></Hor>
      </SimpleCard>
      <div className="py-3"></div>
    </div>
  );
};

export default WizardForm;
