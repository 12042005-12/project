import mongoose, { Schema, type Document, type Model } from 'mongoose'

export interface IWardrobeItem extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  category: string
  color: string
  favorite?: boolean
  imageUrl?: string
  description?: string
  tags?: string[]
}

const wardrobeItemSchema = new Schema<IWardrobeItem>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  favorite: { type: Boolean, default: false },
  imageUrl: { type: String },
  description: { type: String },
  tags: [{ type: String }],
}, {
  timestamps: true,
})

export const WardrobeItem: Model<IWardrobeItem> = mongoose.models.WardrobeItem || mongoose.model<IWardrobeItem>('WardrobeItem', wardrobeItemSchema)
