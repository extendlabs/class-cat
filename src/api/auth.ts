import type { UserProfile } from "@/types/user";

interface AuthResponse {
  user: UserProfile;
  token: string;
}

const TEST_USER: UserProfile = {
  id: "user-1",
  name: "Katarzyna Wiśniewska",
  email: "test@classcat.com",
  phone: "+48 512 345 678",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  memberSince: "2024-03-15",
  totalBookings: 24,
  businessId: "biz-1",
};

const TEST_INSTRUCTOR: UserProfile = {
  id: "user-instructor-1",
  name: "Aleksander Nowak",
  email: "instructor@classcat.com",
  phone: "+48 600 111 222",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  memberSince: "2023-06-01",
  totalBookings: 0,
  instructorId: "inst-6",
};

const TEST_CONSUMER: UserProfile = {
  id: "user-consumer-1",
  name: "Jan Nowicki",
  email: "user@classcat.com",
  phone: "+48 500 123 456",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=200&h=200&fit=crop&crop=face",
  memberSince: "2025-01-10",
  totalBookings: 5,
};

const TEST_DUAL_USER: UserProfile = {
  id: "user-dual-1",
  name: "Marta Kowalczyk",
  email: "dual@classcat.com",
  phone: "+48 600 333 444",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  memberSince: "2022-11-01",
  totalBookings: 12,
  instructorId: "inst-1",
  isBusinessInstructor: true,
};

/** Read the current user from localStorage (for mock API filtering). */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("classcat-auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.user ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

export function getCurrentUserId(): string {
  return getCurrentUser()?.id ?? "user-1";
}

export async function mockLogin(
  email: string,
  password: string
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (email === "test@classcat.com" && password === "password123") {
    return {
      user: TEST_USER,
      token: "mock-jwt-token-abc123",
    };
  }

  if (email === "instructor@classcat.com" && password === "password123") {
    return {
      user: TEST_INSTRUCTOR,
      token: "mock-jwt-token-instructor-123",
    };
  }

  if (email === "user@classcat.com" && password === "password123") {
    return {
      user: TEST_CONSUMER,
      token: "mock-jwt-token-consumer-123",
    };
  }

  if (email === "dual@classcat.com" && password === "password123") {
    return {
      user: TEST_DUAL_USER,
      token: "mock-jwt-token-dual-123",
    };
  }

  throw new Error("Invalid email or password");
}

export async function mockSignUp(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (email === "test@classcat.com" || email === "instructor@classcat.com" || email === "user@classcat.com" || email === "dual@classcat.com") {
    throw new Error("An account with this email already exists");
  }

  const newUser: UserProfile = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone: "",
    location: "",
    avatar: undefined,
    memberSince: new Date().toISOString().split("T")[0],
    totalBookings: 0,
  };

  return {
    user: newUser,
    token: `mock-jwt-token-${Date.now()}`,
  };
}

export async function mockLogout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
}

export async function mockLookupUserByEmail(
  email: string
): Promise<UserProfile | null> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (email === "test@classcat.com") return TEST_USER;
  if (email === "instructor@classcat.com") return TEST_INSTRUCTOR;
  if (email === "user@classcat.com") return TEST_CONSUMER;
  if (email === "dual@classcat.com") return TEST_DUAL_USER;
  return null;
}

export async function mockInviteAsInstructor(
  userId: string,
  _businessId: string
): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Find the user — in real app this would be a DB lookup
  const user = userId === "user-1" ? TEST_USER : TEST_INSTRUCTOR;
  return {
    ...user,
    instructorId: user.instructorId ?? `inst-invited-${Date.now()}`,
  };
}

export async function mockCreateInstructorAccount(
  name: string,
  email: string,
  _businessId: string
): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    id: `user-instructor-${Date.now()}`,
    name,
    email,
    phone: "",
    location: "",
    avatar: undefined,
    memberSince: new Date().toISOString().split("T")[0],
    totalBookings: 0,
    instructorId: `inst-${Date.now()}`,
  };
}
