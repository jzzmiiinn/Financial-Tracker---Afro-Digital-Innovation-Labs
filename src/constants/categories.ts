export const CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Rent",
  "Utilities",
  "Marketing",
  "Software",
  "Transport",
  "Food",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
