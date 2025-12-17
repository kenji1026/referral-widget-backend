import { Passkey } from "../models/Passkey";

export const getUserPasskeys = async (authId: string) => {
  return Passkey.find({ credentialID: authId });
};

export const registerPasskey = async (params: {
  // username: string;
  credentialID: string;
  credentialPublicKey: string; // Uint8Array | Buffer;
  webAuthnUserID: string;
  counter: number;
  transports?: string[];
  deviceType?: string;
  backedUpStatus?: boolean;
}) => {
  const {
    // username,
    credentialID,
    credentialPublicKey,
    webAuthnUserID,
    counter,
    transports,
    deviceType,
    backedUpStatus,
  } = params;
  return Passkey.create({
    // username,
    credentialID,
    credentialPublicKey,
    webAuthnUserID,
    counter,
    transports,
    deviceType,
    backedUpStatus,
  });
};

export const getUserPasskeyByCredID = async (
  // username: string,
  credentialID: string
) => {
  return Passkey.findOne({ credentialID });
};

export const updatePasskeyCounter = async (
  // username: string,
  credentialID: string,
  newCounter: number
) => {
  return Passkey.findOneAndUpdate(
    { credentialID },
    { $set: { counter: newCounter } },
    { new: true }
  );
};
