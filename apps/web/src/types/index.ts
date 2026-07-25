export interface UserProfile {
  _id: string;
  email: string;
  name?: string;
  role: string;
  isEmailVerified: boolean;
  preferences?: {
    style?: string;
    colors?: string[];
    occasions?: string[];
  };
}

export interface ClothingItem {
  _id: string;
  name: string;
  category: string;
  color: string;
  favorite?: boolean;
  imageUrl?: string;
  description?: string;
}

export interface RecommendationItem {
  _id: string;
  title: string;
  description: string;
  tag: string;
}

export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  read?: boolean;
}
