import { deleteModel, Model, Schema, model, models } from "mongoose";

type AdminAuditActor = {
  id: string;
  email: string;
  roleLabel: string;
};

type AdminAuditTarget = {
  id: string;
  email: string;
};

export type AdminAuditLogDocument = {
  actor: AdminAuditActor;
  target: AdminAuditTarget;
  action: string;
  details: Record<string, string>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};

const actorSchema = new Schema<AdminAuditActor>(
  {
    id: { type: String, required: true, trim: true, maxlength: 64 },
    email: { type: String, required: true, trim: true, maxlength: 320 },
    roleLabel: { type: String, required: true, trim: true, maxlength: 120 },
  },
  { _id: false, id: false },
);

const targetSchema = new Schema<AdminAuditTarget>(
  {
    id: { type: String, required: true, trim: true, maxlength: 64 },
    email: { type: String, required: true, trim: true, maxlength: 320 },
  },
  { _id: false, id: false },
);

const adminAuditLogSchema = new Schema<AdminAuditLogDocument>(
  {
    actor: { type: actorSchema, required: true },
    target: { type: targetSchema, required: true },
    action: { type: String, required: true, trim: true, maxlength: 120 },
    details: { type: Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: "", trim: true, maxlength: 128 },
    userAgent: { type: String, default: "", trim: true, maxlength: 512 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminAuditLogSchema.index({ "actor.id": 1, createdAt: -1 }, { name: "idx_admin_audit_actor_created" });
adminAuditLogSchema.index({ "target.id": 1, createdAt: -1 }, { name: "idx_admin_audit_target_created" });

if (process.env.NODE_ENV !== "production" && models.AdminAuditLog) {
  deleteModel("AdminAuditLog");
}

export const AdminAuditLogModel =
  (models.AdminAuditLog as Model<AdminAuditLogDocument>) ||
  model<AdminAuditLogDocument>("AdminAuditLog", adminAuditLogSchema);
