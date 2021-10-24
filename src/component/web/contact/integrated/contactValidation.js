const contactValidation = (values) => {
    let errors = {};
    if (!values.fullName) {
        errors.fullName = "Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid";
    }
    if (!values.title) {
        errors.title = "Title is required";
    }
    if (!values.message) {
        errors.message = "Message is required";
    }
    return errors;
};

export default contactValidation;