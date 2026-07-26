import api from "../lib/api";

export interface FashionAnalysis {
  clothingType: string;
  fabric: string;
  primaryColor: string;
  secondaryColor: string;
  pattern: string;
  style: string;
  season: string;
  occasion: string;
  bodyTypes: string[];
  matchingBottoms: string[];
  matchingFootwear: string[];
  matchingAccessories: string[];
  fashionTips: string[];
  careInstructions: string[];
  confidence: number;
}

export async function analyzeImage(file: File): Promise<FashionAnalysis> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/ai/analyze-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}