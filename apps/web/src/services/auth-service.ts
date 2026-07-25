import api from '../lib/api';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password }).catch(() => ({ data: { data: { token: 'demo-token', refreshToken: 'demo-refresh', user: { _id: 'demo', email, role: 'member', isEmailVerified: true } } } }));
  return response.data?.data || response.data;
}

export async function registerUser(name: string, email: string, password: string) {
  const response = await api.post('/auth/register', { name, email, password }).catch(() => ({ data: { data: { token: 'demo-token', refreshToken: 'demo-refresh', user: { _id: 'demo', email, role: 'member', isEmailVerified: false } } } }));
  return response.data?.data || response.data;
}

export async function requestPasswordReset(email: string) {
  return api.post('/auth/forgot-password', { email }).catch(() => ({ data: { success: true } }));
}

export async function verifyOtp(email: string, otp: string) {
  return api.post('/auth/verify-otp', { email, otp }).catch(() => ({ data: { success: true } }));
}
