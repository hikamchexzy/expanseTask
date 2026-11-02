import express from "express"
import postRouter from "./routes/expenseRoutes";

const app = express();
const port = 5000;

app.use (express.json());

app.use('/api/v1/posts', postRouter);

app.get("/", (req, res) => { 
    res.status(200).send("Welcome to the Expense Tracker API");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
