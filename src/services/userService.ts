import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import crypto from "crypto";
import { IUser, User } from "../models/User";

export const isUserRegistered = async (authId: string): Promise<boolean> => {
  const user = await User.findOne({ credentialID: authId });
  return !!user;
};

export const registerUser = async (
  // username: string,
  credentialID: string
): Promise<IUser | null> => {
  const { walletAddress, secretKey } = generateSuiWalletAddress();
  const referralCode = generateReferralCode();

  const user = await User.create({
    // username,
    credentialID,
    walletAddress,
    secretKey,
    referralCode,
    // chainObjectId: "123",
  });

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  return User.findOne({ username });
};

export const getUserByCredentialID = async (
  authId: string
): Promise<IUser | null> => {
  return User.findOne({ credentialID: authId });
};

export const getUserByRefCode = async (
  referralCode: string
): Promise<IUser | null> => {
  return User.findOne({ referralCode });
};

// Generate a standard, production-style referral code (8 uppercase alphanumeric chars)
export const generateReferralCode = (length = 8): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
};

// SUI wallet address generator
function generateSuiWalletAddress(): {
  walletAddress: string;
  secretKey: string;
} {
  const keypair = new Ed25519Keypair();
  const secretKey = keypair.getSecretKey();
  const publicKey = keypair.getPublicKey();
  const walletAddress = publicKey.toSuiAddress();

  return { walletAddress, secretKey };
}
