import { mockUsers } from "@/mocks/users";
import { mockCategories } from "@/mocks/categories";
import { mockTasks } from "@/mocks/tasks";
import { mockApplications } from "@/mocks/applications";
import { mockAgreements } from "@/mocks/agreements";
import { mockPayments } from "@/mocks/payments";
import { mockChats } from "@/mocks/chats";
import { mockNotifications } from "@/mocks/notifications";
import { mockRatings } from "@/mocks/ratings";
import { mockDisputes } from "@/mocks/disputes";

export interface MockDatabase {
  users: typeof mockUsers;
  categories: typeof mockCategories;
  tasks: typeof mockTasks;
  applications: typeof mockApplications;
  agreements: typeof mockAgreements;
  payments: typeof mockPayments;
  messages: typeof mockChats;
  notifications: typeof mockNotifications;
  ratings: typeof mockRatings;
  disputes: typeof mockDisputes;
}

/** Repository boundary for the beta. Replace this implementation with API calls later. */
export function createMockDatabase(): MockDatabase {
  return structuredClone({
    users: mockUsers,
    categories: mockCategories,
    tasks: mockTasks,
    applications: mockApplications,
    agreements: mockAgreements,
    payments: mockPayments,
    messages: mockChats,
    notifications: mockNotifications,
    ratings: mockRatings,
    disputes: mockDisputes,
  });
}
