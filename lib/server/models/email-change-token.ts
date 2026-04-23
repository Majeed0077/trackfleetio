import { deleteModel, Model, Schema, model, models } from "mongoose";

export type EmailChangeTokenDocument = {
  userId: string;
  currentEmail: string;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const emailChangeTokenSchema = new Schema<EmailChangeTokenDocument>(
  {
    userId: { type: String, required: true, trim: true, maxlength: 64 },
    currentEmail: { type: String, required: true, trim: true, maxlength: 320 },
    pendingEmail: { type: String, required: true, trim: true, maxlength: 320 },
    tokenHash: { type: String, required: true, trim: true, maxlength: 128 },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

emailChangeTokenSchema.index({ userId: 1, pendingEmail: 1, usedAt: 1 }, { name: "idx_email_change_user_pending" });
emailChangeTokenSchema.index({ tokenHash: 1 }, { unique: true, name: "uq_email_change_token_hash" });

if (process.env.NODE_ENV !== "production" && models.EmailChangeToken) {
  deleteModel("EmailChangeToken");
}

export const EmailChangeTokenModel =
  (models.EmailChangeToken as Model<EmailChangeTokenDocument>) ||
  model<EmailChangeTokenDocument>("EmailChangeToken", emailChangeTokenSchema);
