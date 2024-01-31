import express from "express";
import { addAnswer, deleteAnswer, getAllAnswer, updatedAnswer } from "../controllers/answer.js";


//initializing router
const router = express.Router();

//get
router.get("/all", async (req, res) => {
  const answer = await getAllAnswer();

  try {
    if (answer.length <= 0) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ Answ: answer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});

//add
router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.send(400).json({ error: "check request body" });
    }
    const Answ = { ...req.body };
    const newAnsw = await addAnswer(Answ);
    if (!newAnsw.acknowledged) {
      return res.send(400).json({ error: "error in adding a answer" });
    }

    res.status(201).json({ Answ: newAnsw });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});

//update
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (Object.keys(req.body).length <= 0) {
      return res.send(400).json({ error: "check request body" });
    }

    const updatedAnsw = await updatedAnswer(id, req.body);
    if (!updatedAnsw.acknowledged) {
      return res.send(400).json({ error: "error in updating a answer" });
    }

    res.status(200).json({ Answ: updatedAnsw });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //deleting a answer
    const selectedAnsw = await deleteAnswer(id);
    if (!selectedAnsw.acknowledged) {
      return res.send(400).json({ error: "error in deleting a answ" });
    }
    res.status(200).json({ Answ: selectedAnsw });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});
export const answRouter = router;