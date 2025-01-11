import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "@/features/auth/useAuth";
import { showToast } from "@/utils/toastUtils";
const PaymentForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (amount > 0) {
      const fetchClientSecret = async () => {
        try {
          const response = await axios.post("http://localhost:3000/create-payment-intent", {
            price: amount,
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error("Error fetching client secret:", error);
          setMessage("Error initializing payment. Please try again.");
        }
      };
      fetchClientSecret();
    }
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    if (amount <= 0) {
      setMessage("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setMessage("Card Element not found");
      setLoading(false);
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    } else {
      console.log(paymentMethod); // Should log the payment method details
      setMessage("Payment method created successfully!");
      setLoading(false);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setMessage(confirmError.message);
      setLoading(false);
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        showToast("Payment Successfull");
        const payment = {
          title,
          amount,
          status: "pending",
          user_id: user.id,
          created_at: new Date(),
        };
        try {
          await axios.post("http://localhost:3000/payments", payment);
          setTitle("");
          setAmount(0);
          setMessage("Payment Successfull");
        } catch (error) {
          setMessage("Error saving payment");
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Payment Form</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
         placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Amount (USD)</label>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Card Details</label>
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
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || loading || !clientSecret}
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {message && (
        <div
          className={`mt-4 text-sm ${
            message.includes("failed") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
