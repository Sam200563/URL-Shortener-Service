import axios from 'axios';

// 1. Create Razorpay Order
export const createRazorpayOrder = async (amount, token = null) => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  try {
    const response = await axios.post('/api/payment/create-order', { amount }, config);
    return response.data;
  } catch (error) {
    console.error('Failed to create Razorpay order', error);
    throw new Error('Unable to initiate payment. Please try again.');
  }
};
