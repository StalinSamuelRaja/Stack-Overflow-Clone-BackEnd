import express, { request } from "express";
import { addAnswer, deleteAnswer, getAllAnswer, showAnswer, updatedAnswer } from "../controllers/answer.js";
// import { isAuthorized } from "../Authorization/auth.js";


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

router.get("/showans/:qid", async (req, res) => {

  const { qid } = req.params;

  const answer = await showAnswer(qid);

  console.log("quesId",qid)
  console.log("answer",answer)
  try {
    if (answer.length <= 0) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ answer: answer });
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

    const updatedAnsw = await updatedAnsw(id, req.body);
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


//add
router.post("/add", async (req, res) => {
  try {
    console.log(req.body)
    if (Object.keys(req.body).length <= 0) {
      return res.send(400).json({ error: "check request body" });
    }
    const Answ = { ...req.body };
    const newAnsw = await addAnswer(Answ);
    console.log(newAnsw)
    if (!newAnsw.acknowledged) {
      return res.send(400).json({ error: "error in adding a answer" });
    }

    res.status(201).json({ Answ: newAnsw , acknowledged: true});
  } catch (error) {
    console.log(error)
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
        