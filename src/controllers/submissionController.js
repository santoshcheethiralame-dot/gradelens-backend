import Submission from "../models/submissionModel.js";

export const submitFeedback = async (req, res) => {
  try {
    const { workload, difficulty, gradingStrictness } = req.body;

    if (
      ![workload, difficulty, gradingStrictness].every(
        v => typeof v === "number" && v >= 1 && v <= 5
      )
    ) {
      return res.status(400).json({
        message: "Ratings must be numbers between 1 and 5",
      });
    }

    const existing = await Submission.findOne({
      user: req.user,
      course: req.params.courseId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Feedback already submitted for this course",
      });
    }

    const submission = await Submission.create({
      user: req.user,
      course: req.params.courseId,
      workload,
      difficulty,
      gradingStrictness,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
