import Submission from "../models/submissionModel.js";

export const submitFeedback = async (req, res) => {
  try {
    // 1. Check if user already submitted for this course
    const existing = await Submission.findOne({
      user: req.user,
      course: req.params.courseId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Feedback already submitted for this course",
      });
    }

    // 2. Create submission
    const submission = await Submission.create({
      user: req.user,
      course: req.params.courseId,
      workload: req.body.workload,
      difficulty: req.body.difficulty,
      gradingStrictness: req.body.gradingStrictness,
    });

    // 3. Respond
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
