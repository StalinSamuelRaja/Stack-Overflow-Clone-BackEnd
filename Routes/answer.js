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

// add
router.post("/add", async (req, res) => {
  try {
    // Check if the user is authorized (add your authentication logic here)
    if (!isAuthorized) {
      return res.status(401).json({ error: "Login or sign in required" });
    }

    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Check request body" });
    }

    // Extract necessary fields from req.body
    const { questionId, newAnswer } = req.body;

    // Add the answer using the provided questionId and newAnswer
    const addedAnswer = await addAnswer(questionId, newAnswer);

    // Check if the answer was successfully added
    if (!addedAnswer) {
      return res.status(400).json({ error: "Error in adding the answer" });
    }

    // Send a success response
    res.status(201).json({ answer: addedAnswer });
  } catch (error) {
    // Handle internal server errors
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal server error" });
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
