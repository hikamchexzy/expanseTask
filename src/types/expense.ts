export type ExpenseStatus = "pending" | "completed";

export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  status: ExpenseStatus;
  date: string;
  createdAt: string;
}