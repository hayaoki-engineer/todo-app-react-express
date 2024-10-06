import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req: Request, res: Response) => {
  console.log("getリクエストを受け付けました。");
  const todos = [
    { id: "1", todo: "test1"},
    { id: "2", todo: "test2"},
    { id: "3", todo: "test3"},
    { id: "4", todo: "test4"},
  ]

  return res.status(200).json({ todos });
});

try {
  app.listen(PORT, () => {
    console.log(`server runnning at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
