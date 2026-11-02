import { Router } from "express";
import ExpenseController from "../controllers/expenseController";

const router = Router();

router.get("/", ExpenseController.getAllExpenses);
router.get("/summary", ExpenseController.getExpenseSummary);
router.get("/:id", ExpenseController.getExpenseById);

router.post("/", ExpenseController.createExpense);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export default router;