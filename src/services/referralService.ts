import { ReferralEvent, IReferralEvent } from "../models/ReferralEvent";

export const addReferralEvent = async (data: {
  referrer: string;
  referee: string;
  brand: string;
  product: string;
}): Promise<IReferralEvent> => {
  const referralEvent = new ReferralEvent({
    referrer: data.referrer,
    referee: data.referee,
    brand: data.brand,
    product: data.product,
  });

  return await referralEvent.save();
};

export const getReferralEvent = async (
  referrer: string,
  referee: string,
  brand: string,
  product: string
): Promise<IReferralEvent | null> => {
  return await ReferralEvent.findOne({ referrer, referee, brand, product });
};

export const getUserReferralEvents = async (
  referrer: string,
  limit: number
): Promise<IReferralEvent[]> => {
  if (limit > 0) {
    return await ReferralEvent.find({ referrer })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  return await ReferralEvent.find({ referrer }).sort({ createdAt: -1 });
};
