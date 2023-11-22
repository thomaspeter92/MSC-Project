import express, { Application, Request, Response } from "express";
import cors from 'cors'



const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors())


const respondToHello = async (req, res) => {
  res.json({hello: 'hi'})
}

app.get("/hello", respondToHello)

app.get("/npm", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Expresskjnkjbnknknbkjk hehehhhhlkjklnhknhe!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
