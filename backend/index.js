import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_API_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});
export const uploadFile = async (req, res, next) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).send(result);
  } catch (error) {
    next(
      new AppError("Error generating upload authentication parameters", 500)
    );
  }
};
app.get("/auth", uploadFile);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
