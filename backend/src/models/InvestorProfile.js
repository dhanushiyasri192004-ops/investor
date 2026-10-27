import mongoose from 'mongoose';

const investorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: ''
    },
    dateOfBirth: {
      type: Date
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' }
    },
    bankDetails: {
      bankName: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      ifscCode: { type: String, uppercase: true, default: '' },
      accountHolderName: { type: String, default: '' },
      isVerified: { type: Boolean, default: false }
    },
    notificationPreferences: {
      emailAlerts: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: true },
      payoutNotifications: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export const InvestorProfile = mongoose.model('InvestorProfile', investorProfileSchema);
