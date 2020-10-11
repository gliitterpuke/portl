export const imm5257forms = [
    { code: "IMM5257", name: "Application for Temporary Resident Visa", required: "Required",
        description: "The main application form; needs to be validated if completed on a computer." },
    { code: "IMM5409", name: "Statutory Delcaration of Common-law Union", required: "Required",
        description: "Refer to the responsible visa office for your region" },
    { code: "IMM5707", name: "Family Information", required: "Required",
        description: "Must be completed in the application package for your region" },
    { code: "IMM5476", name: "Use of a Representative", required: "Required",
        description: "Complete this form only if you used the services of a representative, or if you are appointing/cancelling a representative." },
    { code: "IMM5475", name: "Authority to Release Personal Information to a Designated Individual (Optional)", required: "Required",
        description: "Complete this form only if you authorize Citizenship and Immigration Canada (CIC) and the Canada Border Services Agency (CBSA) to release information to a designated individual." },
    { code: "IMM5257", name: "Application for Temporary Resident Visa", required: "Required",
        description: "The main application form; needs to be validated if completed on a computer." },
  ];

  <Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography className={classes.heading1}>Forms</Typography>
  </AccordionSummary>
  {imm5257forms.map((form) => (
    <>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>{form.code}</Typography>
      <Typography className={classes.secondaryHeading}>{form.name}</Typography>
    </AccordionSummary> 
    <AccordionDetails>
      <Typography>
        {form.description}
      </Typography>
    </AccordionDetails>
    </>
  ))}
</Accordion>