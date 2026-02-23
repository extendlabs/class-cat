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

  throw new Error("Invalid email or password");
}

export async function mockSignUp(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (email === "test@classcat.com" || email === "instructor@classcat.com") {
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
  return null;
}

export async function mockInviteAsInstructor(
  userId: string,
  businessId: string
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
  businessId: string
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
