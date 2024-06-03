import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

const PaymentForm = ({ salary, selectedEmployee, paymentMonth, paymentYear, onPaymentSuccess }) => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (salary) {
      axiosSecure.post("/create-payment-intent", { amount: salary, payment_method_types: ['card'] }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, salary]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName,
        email: user?.email,
      },
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError(null);
    }

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (intentError) {
      setError(intentError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Salary paid successfully",
          showConfirmButton: false,
          timer: 1500,
        })
        const paymentDetails = {
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
          salary,
          transactionId: paymentIntent.id,
          month: paymentMonth ? paymentMonth.format("MMMM") : null,
          year: paymentYear ? paymentYear.format("YYYY") : null,
          status: "completed",
        };

        const result = await axiosSecure.post("/payments", paymentDetails);

        if (result.data.success) {
          message.success("Salary paid successfully");
          onPaymentSuccess();
        } else {
          message.error("Failed to record payment");
        }
      }
    }
  };


  return (
    <div>
      <form onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-red-500">{error}</p>
        <button type="submit" disabled={!stripe || !clientSecret} className="border-b-4 text-[#BB8506] border-[#BB8506] rounded-md px-5 py-2 hover:bg-black font-semibold">
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
