import express from "express";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestion,
  updatedQuestion,
} from "../controllers/question.js";


//initializing router
const router = express.Router();

//get
router.get("/all", async (req, res) => {
  const question = await getAllQuestion();
  
  try {
    if (question.length <= 0) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ Quest: question });
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
    const Quest = { ...req.body };
    const newQuest = await addQuestion(Quest);
    if (!newQuest.acknowledged) {
      return res.send(400).json({ error: "error in adding a question" });
    }

    res.status(201).json({ Quest: newQuest });
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

    const updatedQuest = await updatedQuestion(id, req.body);
    if (!updatedQuest.acknowledged) {
      return res.send(400).json({ error: "error in updating a question" });
    }

    res.status(200).json({ Quest: updatedQuest });
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
    //deleting a question
    const selectedQuest = await deleteQuestion(id);
    if (!selectedQuest.acknowledged) {
      return res.send(400).json({ error: "error in deleting a question" });
    }
    res.status(200).json({ Quest: selectedQuest });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error });
  }
});
export const questRouter = router;
