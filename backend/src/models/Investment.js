import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvestmentOffer',
      required: true
    },
    amountInvested: {
      type: Number,
      required: true
    },
    returnRate: {
      type: Number,
      required: true
    },
    tenureMonths: {
      type: Number,
      required: true
    },
    expectedReturns: {
      type: Number,
      required: true
    },
    returnsReceived: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    maturityDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Completed', 'Cancelled'],
      default: 'Confirmed'
    },
    payoutFrequency: {
      type: String,
      default: 'Monthly'
    },
    certificateNumber: {
      type: String,
      default: () => 'CI-CERT-' + Math.floor(100000 + Math.random() * 900000)
    }
  },
  { timestamps: true }
);

export const Investment = mongoose.model('Investment', investmentSchema);
