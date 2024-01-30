import express from "express";
import { getUser, registerUser } from "../controllers/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Authorization/auth.js";
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      res.status(400).json({ error: "Invalid request" });
    }
    //gen salt
    const salt = await bcrypt.genSalt(10);

    //is the user already exist
    const checkUser = await getUser(req.body.email);
    if (!checkUser) {
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const encryptUser = await { ...req.body, password: hashedPass };
      const user = await registerUser(encryptUser);
      if (!user.acknowledged) {
        return res.status(400).json({ error: "registration failed" });
      }
      return res
        .status(201)
        .json({ message: "Registered Successfully", data: user });
    }
    res.status(400).json({ error: "User already exist" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      res.status(400).json({ error: "Invalid Request" });
    }
    const checkUser = await getUser(req.body.email);
    if (!checkUser) {
      return res.status(404).json({ error: "Invalid Email" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!validPassword) {
      return res.status(404).json({ error: "Wrong Password" });
    }
    const token = generateToken(checkUser._id);
    res.status(200).json({ message: "Logged In Succesfully" ,token});
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});

export const userRouter = router;
