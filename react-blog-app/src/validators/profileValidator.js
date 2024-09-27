function validateEmail(email) {
  // Regular expression for validating an email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

const profileValidator = ({ name, email}) => {
  const errors = {
    name: "",
    eamil: "",
  };

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  else if (!validateEmail(email)) errors.email = "Invalid email";

  return errors;
};

export default profileValidator;
