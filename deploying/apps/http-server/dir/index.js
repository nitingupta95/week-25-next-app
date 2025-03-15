"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Enable CORS
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hi there!");
});
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return;
        }
        const user = await client_1.client.user.create({
            data: { username, password }
        });
        res.json({
            message: "Signup successful",
            id: user.id
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(3000, () => console.log("Server running on port 3000"));
