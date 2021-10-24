const signupValidation = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Confirm password is required";
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = "Password does not match";
  }
  return errors;
};

export default signupValidation;
