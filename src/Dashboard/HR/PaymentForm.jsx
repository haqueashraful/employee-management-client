import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { message } from "antd";
import Swal from "sweetalert2";


const PaymentForm = ({
  // salary,
  selectedEmployee,
  paymentMonth,
  paymentYear,
  handleModalClose,
}) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [doublePay, setDoublePay] = useState(false);

  useEffect(() => {
    const checkDoublePayment = async () => {
      try {
        const res = await axiosSecure.get(
          `/payment/${selectedEmployee?.email}?month=${paymentMonth?.format(
            "MMMM"
          )}&year=${paymentYear?.format("YYYY")}`
        );
        setDoublePay(res.data.exists);
      } catch (error) {
        console.error("Failed to check double payment", error);
      }
    };

    if (selectedEmployee && paymentMonth && paymentYear) {
      checkDoublePayment();
    }
  }, [axiosSecure, paymentMonth, paymentYear, selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee.salary) {
      axiosSecure
        .post("/create-payment-intent", {
          amount: selectedEmployee.salary,
          payment_method_types: ["card"],
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Failed to create payment intent", error);
        });
    }
  }, [axiosSecure, selectedEmployee.salary, paymentMonth, paymentYear]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (doublePay) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Salary already paid",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: selectedEmployee?.name,
        email: selectedEmployee?.email,
      },
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    } else {
      setError(null);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Salary paid successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const paymentDetails = {
          email: selectedEmployee?.email,
          salary: selectedEmployee?.salary,
          name: selectedEmployee?.name,
          photo: selectedEmployee?.photo,
          designation: selectedEmployee?.designation,
          bankAccountNo: selectedEmployee?.bank_account_no,
          role: selectedEmployee?.role,
          transactionId: paymentIntent.id,
          month: paymentMonth ? paymentMonth.format("MMMM") : null,
          year: paymentYear ? paymentYear.format("YYYY") : null,
          status: "completed",
        };

        try {
          const result = await axiosSecure.post("/payments", paymentDetails);
          if (result.data.acknowledged) {
            message.success("Salary paid successfully");
            handleModalClose();
          } else {
            message.error("Failed to record payment");
          }
        } catch (error) {
          console.error("Failed to record payment", error);
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
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="text-white bg-blue-700/50 rounded-md px-5 py-2 hover:bg-blue-700 font-semibold"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  salary: PropTypes.number.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
  paymentMonth: PropTypes.object.isRequired,
  paymentYear: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default PaymentForm;
