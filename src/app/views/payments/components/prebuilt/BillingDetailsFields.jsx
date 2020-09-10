import React from "react"
import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="Jane Smith"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="jane.smith@example.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="221B Baker Street"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="London"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="UK"
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="00000"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
