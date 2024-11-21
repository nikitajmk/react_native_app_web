import mongoose from "mongoose";

// Base User Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  role: {
    type: String,
    enum: ["Customer", "Admin", "DeliveryPartner"],
    required: true,
  },
  isActivated: { type: Boolean, default: false },
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  ...userSchema.obj, // Inherit base schema fields
  phone: { type: Number, required: true, unique: true },
  role: { type: String, enum: ["Customer"], default: "Customer" }, // Override role for customers
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },
});

// DeliveryPartner Schema
const deliveryPartnerSchema = new mongoose.Schema({
  ...userSchema.obj, // Inherit base schema fields
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" }, // Override role for delivery partners
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

// Admin Schema
const adminSchema = new mongoose.Schema({
  ...userSchema.obj, // Inherit base schema fields
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin"], default: "Admin" }, // Override role for admins
});

export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema
);
export const Admin = mongoose.model("Admin", adminSchema);
