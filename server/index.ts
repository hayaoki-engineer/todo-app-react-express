import express, { Request, Response } from "express";
import cors from "cors";
import { uid } from "uid";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/add", (req: Request, res: Response) => {
  console.log("postリクエストを受け付けました");
  console.log(req.body.data.todo);
  const { todo } = req.body.data;
  const uidValue = uid();
  // id と todo をフロント側に返却
  return res.status(200).json({ id: uidValue, todo })
})

try {
  app.listen(PORT, () => {
    console.log(`server runnning at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
