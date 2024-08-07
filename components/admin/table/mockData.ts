import { User } from "@/types";

// mockData.ts
export const mockUsers: User[] = [
  {
    _creationTime: new Date(),

    email: "john.doe@example.com",
    image: "/assets/images/user1.jpg",
    isOnline: true,
    tokenIdentifier: "abc123",
    isAdmin: true,
    name: "John Doe",
  },
  {
    _creationTime: new Date(),

    email: "jane.doe@example.com",
    image: "/assets/images/user2.jpg",
    isOnline: false,
    tokenIdentifier: "def456",
    isAdmin: false,
    name: "Jane Doe",
  },
  {
    _creationTime: new Date(),

    email: "admin@example.com",
    image: "/assets/images/user3.jpg",
    isOnline: true,
    tokenIdentifier: "ghi789",
    isAdmin: true,
    name: "Admin User",
  },
];
