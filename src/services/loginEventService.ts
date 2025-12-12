import { ILoginEvent, LoginEvent } from "../models/LoginEvent";

/**
 * Creates a new login event
 * @param data - The login event data containing username and optional brand
 * @returns Promise<ILoginEvent> - The created login event
 */
export const addLoginEvent = async (username: string): Promise<ILoginEvent> => {
  try {
    const loginEvent = await LoginEvent.create({
      username,
    });

    return loginEvent;
  } catch (error) {
    throw new Error(
      `Failed to create login event: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Gets login events by username
 * @param username - The username to filter by
 * @returns Promise<ILoginEvent[]> - Array of login events for the user
 */
export const getLoginEventsByUsername = async (
  username: string
): Promise<ILoginEvent[]> => {
  try {
    return await LoginEvent.find({ username }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(
      `Failed to fetch login events: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Gets login events by brand
 * @param brand - The brand to filter by
 * @returns Promise<ILoginEvent[]> - Array of login events for the brand
 */
export const getLoginEventsByBrand = async (
  brand: string
): Promise<ILoginEvent[]> => {
  try {
    return await LoginEvent.find({ brand }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(
      `Failed to fetch login events by brand: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Gets all login events
 * @returns Promise<ILoginEvent[]> - Array of all login events
 */
export const getAllLoginEvents = async (): Promise<ILoginEvent[]> => {
  try {
    return await LoginEvent.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(
      `Failed to fetch all login events: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Gets how many days ago a user last logged in
 * @param username - The username to check
 * @returns Promise<number | null> - Number of days since last login, or null if user never logged in
 */
export const getDaysSinceLastLogin = async (
  username: string
): Promise<Date | null> => {
  try {
    let lastLoginEvent;

    const events = await LoginEvent.find({ username })
      .sort({ createdAt: -1 })
      .limit(2);
    lastLoginEvent =
      events.length === 2 ? events[1] : events.length === 1 ? events[0] : null;

    if (!lastLoginEvent) {
      return null; // User has never logged in
    }

    return lastLoginEvent.createdAt;

    // const now = new Date();
    // const lastLoginDate = new Date(lastLoginEvent.createdAt);
    // const timeDifference = now.getTime() - lastLoginDate.getTime();
    // const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // if (daysDifference !== 0) {
    //   return `${daysDifference} days ago`;
    // } else {
    //   const minsDifference = Math.floor(timeDifference / (1000 * 60));
    //   return `${minsDifference} mins ago`;
    // }
  } catch (error) {
    throw new Error(
      `Failed to calculate days since last login: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Gets the login event before the last login for a user
 * @param username - The username to check
 * @returns Promise<ILoginEvent | null> - The login event before the last login, or null if not found
 */
export const getLoginEventBeforeLast = async (
  username: string
): Promise<ILoginEvent | null> => {
  try {
    const events = await LoginEvent.find({ username })
      .sort({ createdAt: -1 })
      .limit(2);
    return events.length === 2 ? events[1] : null;
  } catch (error) {
    throw new Error(
      `Failed to fetch login event before last: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
