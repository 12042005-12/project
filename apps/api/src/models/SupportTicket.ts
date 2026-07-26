import mongoose, { Document, Schema } from "mongoose";

export interface ISupportTicket extends Document {
  name: string;
  email: string;
  subject: string;
  category:
    | "General"
    | "Technical"
    | "Account"
    | "Billing"
    | "Bug Report"
    | "Feature Request";

  message: string;

  status:
    | "Open"
    | "In Progress"
    | "Resolved"
    | "Closed";

  priority:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  attachment?: string;

  assignedTo?: string;

  createdAt: Date;

  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "General",
        "Technical",
        "Account",
        "Billing",
        "Bug Report",
        "Feature Request",
      ],
      default: "General",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Resolved",
        "Closed",
      ],
      default: "Open",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    attachment: {
      type: String,
      default: "",
    },

    assignedTo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

SupportTicketSchema.index({
  status: 1,
  priority: 1,
});

SupportTicketSchema.index({
  email: 1,
});

SupportTicketSchema.index({
  createdAt: -1,
});

const SupportTicket = mongoose.model<ISupportTicket>(
  "SupportTicket",
  SupportTicketSchema
);

export default SupportTicket;