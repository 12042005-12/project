import mongoose, { Schema, type Document, type Model } from 'mongoose'

export interface ITryOn extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description: string
  tag?: string
}

const tryOnSchema = new Schema<ITryOn>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tag: { type: String },
}, {
  timestamps: true,
})

export const TryOn: Model<ITryOn> = mongoose.models.TryOn || mongoose.model<ITryOn>('TryOn', tryOnSchema)
