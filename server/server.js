import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));


const { default: articRoutes } = await import("./routes/artic.js");
app.use("/api", articRoutes);

app.listen(PORT, () => {
  console.log(`ArtVault server running on port ${PORT}`);
});