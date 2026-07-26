import mongoose, { Schema, Document } from "mongoose";

export interface IFashionAnalysis extends Document {
  user?: mongoose.Types.ObjectId;

  imageUrl: string;

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

  createdAt: Date;
}

const FashionAnalysisSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    imageUrl: String,

    clothingType: String,

    fabric: String,

    primaryColor: String,

    secondaryColor: String,

    pattern: String,

    style: String,

    season: String,

    occasion: String,

    bodyTypes: [String],

    matchingBottoms: [String],

    matchingFootwear: [String],

    matchingAccessories: [String],

    fashionTips: [String],

    careInstructions: [String],

    confidence: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFashionAnalysis>(
  "FashionAnalysis",
  FashionAnalysisSchema
);