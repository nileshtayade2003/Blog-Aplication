function validateEmail(email) {
  // Regular expression for validating an email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

const signupValidator = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: "",
    eamil: "",
    password: "",
    confirmPassword: "",
  };

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  else if (!validateEmail(email)) errors.email = "Invalid email";

  if (!password) errors.password = "Password is required";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters long";

  if (password != confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};

export default signupValidator;
