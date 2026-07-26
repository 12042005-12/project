import mongoose, { Schema, type Document, type Model } from 'mongoose'

export interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description: string
  tag?: string
  occasion?: string
}

const recommendationSchema = new Schema<IRecommendation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tag: { type: String },
  occasion: { type: String },
}, {
  timestamps: true,
})

export const Recommendation: Model<IRecommendation> = mongoose.models.Recommendation || mongoose.model<IRecommendation>('Recommendation', recommendationSchema)
