import employeeFormInputData from "../lib/employeeFormInputData"

const validateEmail = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const validateFullName = (fullName) => {
  const words = fullName.trim().split(/\s+/);
  return words.length >= 2 && words.every(word => /^[a-zA-Z]+$/.test(word));
}

const validateForm = (allEmployees, formData, setFormErr) => {
  const errors = {};

  // Validate each form input
  employeeFormInputData.forEach(({ name }) => {
    errors[name] = formData[name] && formData[name].trim() ? false : `Please enter a valid ${name.replace("_", " ")}.`;
  });

  // Check email
  if (!errors.email) {
    const email = formData.email.trim();
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email.";
    } else if (allEmployees.some(obj => obj.email === email)) {
      errors.email = "This email is already in use.";
    }
  }

  // Check full name
  if (!errors.name) {
    const fullName = formData.name.trim();
    if (!validateFullName(fullName)) {
      errors.name = "Please enter a valid full name.";
    }
  }
  
  // Update form errors
  setFormErr(errors);
  // Check if there are no errors
  return !Object.values(errors).some(value => value !== false);
};

export default validateForm;