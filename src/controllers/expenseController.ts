
import { Request, Response } from "express";
import { Expense, ExpenseStatus } from "../types/expense";

// Dummy Data
let dataExpenses: Expense[] = [
  {
    id: 1,
    title: "Makan Siang",
    description: "Membeli nasi ayam di kantin sekolah",
    amount: 25000,
    category: "Food",
    status: "completed",
    date: "2026-11-01",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Transportasi",
    description: "Biaya transportasi pergi ke sekolah",
    amount: 15000,
    category: "Transportation",
    status: "completed",
    date: "2026-11-02",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Membeli Buku",
    description: "Membeli buku untuk keperluan belajar",
    amount: 50000,
    category: "Education",
    status: "pending",
    date: "2026-11-03",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Membeli Kopi",
    description: "Membeli kopi sebelum berangkat sekolah",
    amount: 20000,
    category: "Food",
    status: "completed",
    date: "2026-11-03",
    createdAt: new Date().toISOString(),
  },
];

// Controller
export class ExpenseController {

  // GET /expenses
  getAllExpenses = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get All Expenses Success",
      data: {
        total: dataExpenses.length,
        expenses: dataExpenses,
      },
    });
  };

  // GET /expenses/:id
  getExpenseById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const expense = dataExpenses.find((e) => e.id === id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "ID transaksi tidak valid",
      });
    }

    if (!expense) {
      return res.status(404).json({
        status: false,
        message: `Expense dengan ID ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Get Expense Success",
      data: { expense },
    });
  };

  // POST /expenses
  createExpense = async (req: Request, res: Response) => {
    const { title, description, amount, category, status, date } = req.body;

    // Validasi title dan description
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        status: false,
        message: "Title dan description wajib diisi",
      });
    }

    // Validasi amount
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Amount harus berupa angka lebih dari 0",
      });
    }

    // Validasi category
    if (typeof category !== "string" || !category.trim()) {
      return res.status(400).json({
        status: false,
        message: "Category wajib diisi",
      });
    }

    // Validasi status
    const expenseStatus = status ?? "pending";

    if (!["pending", "completed"].includes(expenseStatus)) {
      return res.status(400).json({
        status: false,
        message: "Status hanya boleh pending atau completed",
      });
    }

    // Validasi tanggal
    const expenseDate = date ?? new Date().toISOString().split("T")[0];

    if (
      typeof expenseDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) ||
      !Number.isFinite(Date.parse(expenseDate)) ||
      new Date(expenseDate).toISOString().slice(0, 10) !== expenseDate
    ) {
      return res.status(400).json({
        status: false,
        message: "Format tanggal harus YYYY-MM-DD",
      });
    }

    const newId =
      dataExpenses.length > 0
        ? Math.max(...dataExpenses.map((e) => e.id)) + 1
        : 1;

    const newExpense: Expense = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      amount,
      category: category.trim(),
      status: expenseStatus as ExpenseStatus,
      date: expenseDate,
      createdAt: new Date().toISOString(),
    };

    dataExpenses.push(newExpense);

    return res.status(201).json({
      status: true,
      message: "Create Expense Success",
      data: { expense: newExpense },
    });
  };

  // PUT /expenses/:id
  updateExpense = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const expense = dataExpenses.find((e) => e.id === id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "ID transaksi tidak valid",
      });
    }

    if (!expense) {
      return res.status(404).json({
        status: false,
        message: `Expense dengan ID ${id} tidak ditemukan`,
      });
    }

    const { title, description, amount, category, status, date } = req.body;

    const updatedTitle = title ?? expense.title;
    const updatedDescription = description ?? expense.description;
    const updatedAmount = amount ?? expense.amount;
    const updatedCategory = category ?? expense.category;
    const updatedStatus = status ?? expense.status;
    const updatedDate = date ?? expense.date;

    if (
      typeof updatedTitle !== "string" ||
      !updatedTitle.trim() ||
      typeof updatedDescription !== "string" ||
      !updatedDescription.trim()
    ) {
      return res.status(400).json({
        status: false,
        message: "Title dan description tidak boleh kosong",
      });
    }

    if (
      typeof updatedAmount !== "number" ||
      !Number.isFinite(updatedAmount) ||
      updatedAmount <= 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Amount harus berupa angka lebih dari 0",
      });
    }

    if (
      typeof updatedCategory !== "string" ||
      !updatedCategory.trim()
    ) {
      return res.status(400).json({
        status: false,
        message: "Category tidak boleh kosong",
      });
    }

    if (!["pending", "completed"].includes(updatedStatus)) {
      return res.status(400).json({
        status: false,
        message: "Status hanya boleh pending atau completed",
      });
    }

    if (
      typeof updatedDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(updatedDate) ||
      !Number.isFinite(Date.parse(updatedDate)) ||
      new Date(updatedDate).toISOString().slice(0, 10) !== updatedDate
    ) {
      return res.status(400).json({
        status: false,
        message: "Format tanggal harus YYYY-MM-DD",
      });
    }

    expense.title = updatedTitle.trim();
    expense.description = updatedDescription.trim();
    expense.amount = updatedAmount;
    expense.category = updatedCategory.trim();
    expense.status = updatedStatus as ExpenseStatus;
    expense.date = updatedDate;

    return res.status(200).json({
      status: true,
      message: "Update Expense Success",
      data: { expense },
    });
  };

  // DELETE /expenses/:id
  deleteExpense = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "ID transaksi tidak valid",
      });
    }

    const index = dataExpenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: false,
        message: `Expense dengan ID ${id} tidak ditemukan`,
      });
    }

    const deletedExpense = dataExpenses.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Expense Success",
      data: { expense: deletedExpense },
    });
  };

  // GET /expenses/summary
  getExpenseSummary = async (req: Request, res: Response) => {
    const totalExpenses = dataExpenses.reduce(
      (total, e) => total + e.amount,
      0
    );

    const completedExpenses = dataExpenses
      .filter((e) => e.status === "completed")
      .reduce((total, e) => total + e.amount, 0);

    const pendingExpenses = dataExpenses
      .filter((e) => e.status === "pending")
      .reduce((total, e) => total + e.amount, 0);

    return res.status(200).json({
      status: true,
      message: "Get Expense Summary Success",
      data: {
        totalTransactions: dataExpenses.length,
        totalExpenses,
        completedExpenses,
        pendingExpenses,
      },
    });
  };
}

export default new ExpenseController();
