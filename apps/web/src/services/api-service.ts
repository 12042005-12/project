import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

const authEndpoints = {
  login: '/auth/login',
  register: '/auth/register',
  refresh: '/auth/refresh',
  forgotPassword: '/auth/forgot-password',
  verifyOtp: '/auth/verify-otp',
};

const profileEndpoints = {
  me: '/users/me',
  update: '/users/me',
};

const wardrobeEndpoints = {
  list: '/wardrobe',
  create: '/wardrobe',
  detail: (id: string) => `/wardrobe/${id}`,
  update: (id: string) => `/wardrobe/${id}`,
  delete: (id: string) => `/wardrobe/${id}`,
};

const recommendationEndpoints = {
  list: '/recommendations',
  create: '/recommendations',
};

const tryOnEndpoints = {
  list: '/tryon',
  generate: '/tryon/generate',
};

const savedOutfitEndpoints = {
  list: '/saved-outfits',
  create: '/saved-outfits',
  delete: (id: string) => `/saved-outfits/${id}`,
};

export function useAuthProfile() {
  return useQuery({
    queryKey: ['auth-profile'],
    queryFn: async () => {
      const response = await api.get(profileEndpoints.me);
      return response.data?.data || response.data;
    },
  });
}

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const [recommendations, wardrobe, savedOutfits] = await Promise.all([
        api.get(recommendationEndpoints.list).catch(() => ({ data: { data: [] } })),
        api.get(wardrobeEndpoints.list).catch(() => ({ data: { data: [] } })),
        api.get(savedOutfitEndpoints.list).catch(() => ({ data: { data: [] } })),
      ]);
      return {
        recommendations: recommendations.data?.data || recommendations.data || [],
        wardrobe: wardrobe.data?.data || wardrobe.data || [],
        savedOutfits: savedOutfits.data?.data || savedOutfits.data || [],
      };
    },
  });
}

export function useWardrobe() {
  return useQuery({
    queryKey: ['wardrobe'],
    queryFn: async () => {
      const response = await api.get(wardrobeEndpoints.list);
      return response.data?.data || response.data || [];
    },
  });
}

export function useCreateWardrobeItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post(wardrobeEndpoints.create, payload);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wardrobe'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateWardrobeItem(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.put(wardrobeEndpoints.update(id), payload);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wardrobe'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteWardrobeItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(wardrobeEndpoints.delete(id));
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wardrobe'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const response = await api.get(recommendationEndpoints.list);
      return response.data?.data || response.data || [];
    },
  });
}

export function useCreateRecommendation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post(recommendationEndpoints.create, payload);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useTryOnHistory() {
  return useQuery({
    queryKey: ['tryon'],
    queryFn: async () => {
      const response = await api.get(tryOnEndpoints.list);
      return response.data?.data || response.data || [];
    },
  });
}

export function useGenerateTryOn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await api.post(tryOnEndpoints.generate, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tryon'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useSavedOutfits() {
  return useQuery({
    queryKey: ['saved-outfits'],
    queryFn: async () => {
      const response = await api.get(savedOutfitEndpoints.list);
      return response.data?.data || response.data || [];
    },
  });
}

export function useCreateSavedOutfit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = await api.post(savedOutfitEndpoints.create, payload);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['saved-outfits'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteSavedOutfit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(savedOutfitEndpoints.delete(id));
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['saved-outfits'] });
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
export interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}
export function useCreateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SupportTicket) => {
      const response = await api.post("/support", payload);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["support"],
      });
    },
  });
}

export async function uploadClothing(formData: FormData) {
  const response = await api.post(wardrobeEndpoints.create, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data?.data || response.data;
}

export async function updateProfile(payload: Record<string, unknown>) {
  const response = await api.put(profileEndpoints.update, payload);
  return response.data?.data || response.data;
}

export { authEndpoints, profileEndpoints, wardrobeEndpoints, recommendationEndpoints, tryOnEndpoints, savedOutfitEndpoints };
