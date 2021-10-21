import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Link} from "react-router-dom";
import checkmark from "../../../../assets/images/pricing/Checkmark.svg";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
const CardField = ({ onChange }) => (
  <div className="flex flex-col mt-3">
    <label className="caption text-secondary mb-2">Card detail</label>
    <CardElement
      className="rounded border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      onChange={onChange}
    />
  </div>
);
const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="flex flex-col mt-3">
    <label htmlFor={id} className="caption text-secondary mb-2">
      {label}
    </label>
    <input
      className="input-style"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className="primary-button w-full mt-6"
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);
const ErrorMessage = ({ children }) => (
  <div className="text-red-600" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);
const CheckoutForm = () => {

  //Toaster
  const [addPaymentSuccess, setAddPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });
  let stop = "stop";
  const [clientSecret, setClientSecret] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe
      .confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      })
      .then((res) => {
        setAddPaymentSuccess(true);
        // getPaymentIntent();
        if (res.error) {
          setError(payload.error);
        }
        setTimeout(() => {
          window.location.reload();
        }, [3000]);
        
      });
    setProcessing(false);

    if (error) {
      elements.getElement("card").focus();
      return;
    }
  };
  function getPaymentIntent() {
    fetch("http://127.0.0.1:5000/create-setup-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
      })
      .catch((err) => {
        setProcessing(false);
      });
  }
  useEffect(() => {
    getPaymentIntent();
  }, [stop]);
  return (
    <>

      <form className="Form" onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={billingDetails.email}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
          <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={billingDetails.name}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={billingDetails.phone}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="FormGroup">
          <CardField
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </fieldset>
        <div className="block">
          <Link
            to={{ pathname: `https://stripe.com/` }}
            className="cursor-pointer flex items-center w-max"
            target="_blank"
          >
            <div className="text-gray-400 text-sm">
              Powered by
            </div>
            <div className="text-gray-500 font-bold">
              &nbsp;stripe
            </div>
            </Link>
          </div>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}

          {addPaymentSuccess && 
            <div className="mt-2">
              <div className="flex items-center gap-2 justify-between bg-green-200 bg-opacity-70 px-4 py-4 mt-4 rounded">
                <div className="text-green-700">
                  <div className="link mb-1">
                    Success
                  </div>
                  <div className="caption">
                    Payment method sucessfully added.
                  </div>
                </div>
                <div className="">
                  <img src={checkmark} alt="" className="w-8 h-8" />
                </div>
              </div>
            </div>
          }

        {!addPaymentSuccess && 
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe}
            className=""
          >
            Add Card
          </SubmitButton>
        }
        
      </form>
    </>
  );
};

const stripePromise = loadStripe(
  "pk_test_51HmQ6yDvx1549lk5zlQu2UTcarzAgDT2SIP0BLJLWGWuxCvJ4LjtzGePwEVlR4tFRerJQ0wvxlgVsSqRP0ntSbjz00eVVcHLkw"
);

const AddPayment = () => {
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default AddPayment;
