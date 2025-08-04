import axios from 'axios';

// 2. Upgrade User Plan
export const upgradeUserPlan = async (userId, planType, token = null) => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  try {
    console.log("📤 Sending plan upgrade request");
    const response = await axios.post('/api/auth/upgrade', { userId, planType }, config);
    console.log("✅ Got upgrade response");
    return response.data;
    
  } catch (error) {
    console.error('Failed to upgrade plan', error);
    throw new Error('Plan upgrade failed. Please contact support.');
  }
};
