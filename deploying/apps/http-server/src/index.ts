import express, { Request, Response } from "express";
import cors from "cors";  
import { client } from "@repo/db/client";

const app = express();

 
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hi there!");
});

app.post("/signup", async(req:Request, res:Response): Promise<void> =>{
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return ;
        }

        const user = await client.user.create({
            data: { username, password }
        });

        res.json({
            message: "Signup successful",
            id: user.id
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3002, () => console.log("Server running on port 3002"));
