import api from '../lib/api';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  return response.data?.data || response.data;
}

export async function registerUser(name: string, email: string, password: string) {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data?.data || response.data;
}

export async function requestPasswordReset(email: string) {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
}

export async function verifyOtp(email: string, otp: string) {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data;
}
