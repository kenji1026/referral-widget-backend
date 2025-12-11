import { Request, Response } from "express";
import { User } from "../models/User";
import {
  getUserByUsername,
  getUserByRefCode,
  getUserByCredentialID,
} from "../services/userService";
import {
  addReferralEvent,
  getReferralEvent,
  getUserReferralEvents,
} from "../services/referralService";
import {
  subscribeCliEventService,
  TransactionType,
} from "../common/background/subscribeCliEventService";

export const getUserReferrals = async (req: Request, res: Response) => {
  try {
    const { authId } = req.params;
    if (!authId) {
      return res.status(400).json({ error: "Authentication ID is required" });
    }

    const user = await getUserByCredentialID(authId);
    const referralEvents = await getUserReferralEvents(authId, 0);

    const activities = [
      ...referralEvents.map((event) => ({
        type: "Referral commission",
        amount: "+$10.00",
        product: event.product,
        date: event.createdAt,
      })),
      {
        type: "Bonus commission",
        amount: "+$1.00",
        product: "Account creation",
        date: user?.createdAt,
      },
    ];

    res.json({ activities });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get user referrals",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const getReferralLink = async (req: Request, res: Response) => {
  // TODO: Implement referral link generation logic
  res.json({ message: "Referral link endpoint (to be implemented)" });
};

export const logReferralEvent = async (req: Request, res: Response) => {
  try {
    const { refCode, referee, brand, product } = req.body;

    if (!refCode || !referee || !brand || !product) {
      return res
        .status(400)
        .json({ error: "refCode and referee, and brand are required" });
    }

    const refereeUser = await getUserByCredentialID(referee);
    const referrerUser = await getUserByRefCode(refCode);

    if (!refereeUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!referrerUser) {
      return res
        .status(404)
        .json({ error: "Referrer not found for provided refCode" });
    }

    // Execute create_referral txn
    subscribeCliEventService.getEventEmitter().emit("executeActivityTxn", {
      type: TransactionType.REFER,
      isNew: false,
      custodialAddress: refereeUser.walletAddress,
      custodialSecretKey: refereeUser.secretKey,
      custodialChainObjectId: refereeUser.chainObjectId,
      referrerAddress: referrerUser.walletAddress,
      referrerChainObjectId: referrerUser.chainObjectId,
    });

    // Add referral event to database
    const event = await addReferralEvent({
      referrer: referrerUser.credentialID,
      referee: refereeUser.credentialID,
      brand,
      product,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      error: "Failed to log referral event",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const checkReferralRegistered = async (req: Request, res: Response) => {
  try {
    const { refCode, referee, brand, product } = req.body;
    if (!refCode || !referee || !brand || !product) {
      return res.status(400).json({
        error: "Referrer, referee, and brand are rquired",
      });
    }

    const user = await getUserByRefCode(refCode);

    if (!user) {
      return res
        .status(404)
        .json({ error: "Referrer not found for provided refCode" });
    }

    const referrer = user.credentialID;

    // You can change the field below to 'walletAddress' if that's the unique identifier
    const referralEvent = await getReferralEvent(
      referrer,
      referee,
      brand,
      product
    );

    res.json({ registered: !!referralEvent });
  } catch (error) {
    res.status(500).json({
      error: "Failed to check referee registration",
      details: error instanceof Error ? error.message : error,
    });
  }
};
