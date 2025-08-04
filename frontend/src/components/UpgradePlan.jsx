import React from "react";
import { createRazorpayOrder } from "../services/paymentService";
import { upgradeUserPlan } from "../services/planService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const plans = [
  { name: "Bronze", amount: 29, limit: 15, duration: "1 Month" },
  { name: "Silver", amount: 59, limit: 25, duration: "3 Months" },
  { name: "Gold", amount: 149, limit: "Unlimited", duration: "1 Year" },
];

const UpgradePlan = () => {
  const { token } = useAuth();
  const handlePurchase = async (plan) => {
    try {
      const decode = jwtDecode(token);
      const userId = decode.user.id;
      if (!userId) throw new Error("Missing user Id");
      // 1. Create Razorpay Order from backend
      const { order } = await createRazorpayOrder(plan.amount, token);

      // 2. Razorpay Checkout Options
      const options = {
        key: "rzp_test_dU2Vvn0LKjVRUU", 
        amount: order.amount,
        currency: "INR",
        name: "Short.ly",
        description: `Upgrade to ${plan.name}`,
        order_id: order.id,
        handler: async function (response) {
          // 3. On Payment Success → Upgrade Plan
          await upgradeUserPlan(userId, plan.name, token);
          alert(`✅ Successfully upgraded to ${plan.name} plan`);
          window.location.reload();
        },
        prefill: {
          name: "Short.ly User",
          email: "user@example.com", 
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("❌ Payment failed or cancelled");
      console.error("Payment error", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Choose a Premium Plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-xl shadow-xl p-6 bg-white hover:scale-105 transform transition duration-300 ease-in-out"
          >
            {/* Header */}
            <div
              className={`text-white text-center py-3 rounded-t-xl font-bold text-xl ${
                plan.name === "Gold"
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
                  : plan.name === "Silver"
                  ? "bg-gradient-to-r from-gray-400 to-gray-600"
                  : "bg-gradient-to-r from-orange-400 to-orange-600"
              }`}
            >
              {plan.name} Plan
            </div>

            {/* Body */}
            <div className="mt-6 text-gray-800 space-y-2 text-center">
              <div className="text-3xl font-semibold">₹{plan.amount}</div>
              <div className="text-sm text-gray-500">{plan.duration}</div>
              <div className="text-md mt-3">
                🔗 <b>{plan.limit}</b> short links
              </div>
              <div className="text-xs text-gray-400">+ Track clicks</div>
              <div className="text-xs text-gray-400">+ Access dashboard</div>
            </div>

            {/* Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => handlePurchase(plan)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePlan;
