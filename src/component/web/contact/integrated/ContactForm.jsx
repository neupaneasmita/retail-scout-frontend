import React, { useState, useEffect } from "react";
import "../../../../assets/css/formStyle.css";
import contactValidation from "./contactValidation";

const ContactForm = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [correctData, setCorrectData] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // setValues({
    //     fullName: '',
    //     email: '',
    //     title: '',
    //     message: ''
    // });
    setErrors(contactValidation(values));
    setCorrectData(true);
    if (Object.keys(errors).length === 0 && correctData) {
      alert(values.email);
      alert(values.fullName);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && correctData) {
      setSuccessMessage("Contact message submitted successfully!");
    }
    // eslint-disable-next-line
  }, [errors]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className={`paragraph text-primary ${successMessage && "pb-2"}`}>
        {successMessage}
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-4 lg:gap-10">
          <div className="col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
            {/*Full Name*/}
            <div className="col-span-1">
              <label htmlFor="fullName" className="label">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Write your full name"
                id="fullName"
                name="fullName"
                onChange={onChangeHandler}
                value={values.fullName}
                className={`input ${errors.email && "border-2 border-red-600"}`}
              />
              {errors.fullName && (
                <div className="caption text-red-500 mt-1">
                  {errors.fullName}
                </div>
              )}
            </div>
            {/*Email*/}
            <div className="col-span-1">
              <label htmlFor="emailAddress" className="label">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@gmail.com"
                id="emailAddress"
                name="email"
                onChange={onChangeHandler}
                value={values.email}
                className={`input ${errors.email && "border-2 border-red-600"}`}
              />
              {errors.email && (
                <div className="caption text-red-500 mt-1">{errors.email}</div>
              )}
            </div>
          </div>
          {/*Title*/}
          <div className="col-span-1">
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              placeholder="Write a message title"
              id="title"
              name="title"
              onChange={onChangeHandler}
              autoComplete="off"
              value={values.title}
              className={`input ${errors.title && "border-2 border-red-600"}`}
            />
            {errors.title && (
              <div className="caption text-red-500 mt-1">{errors.title}</div>
            )}
          </div>
          {/*Message*/}
          <div className="col-span-1">
            <label htmlFor="message" className="label">
              Message
            </label>
            <textarea
              placeholder="Write a message"
              id="message"
              name="message"
              onChange={onChangeHandler}
              autoComplete="off"
              value={values.message}
              rows="4"
              className={`input ${errors.message && "border-2 border-red-600"}`}
            />
            {errors.message && (
              <div className="caption text-red-500 mt-1">{errors.message}</div>
            )}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="primary-button block lg:flex w-full lg:w-auto"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
