import Submission from "../models/submissionModel.js";
import mongoose from "mongoose";

export const getCourseStats = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId);

    const stats = await Submission.aggregate([
      { $match: { course: courseId } },
      {
        $group: {
          _id: "$course",
          avgWorkload: { $avg: "$workload" },
          avgDifficulty: { $avg: "$difficulty" },
          avgGradingStrictness: { $avg: "$gradingStrictness" },
          count: { $sum: 1 },
        },
      },
    ]);

    // ✅ Empty state FIRST
    if (!stats.length) {
      return res.json({
        workload: null,
        difficulty: null,
        gradingStrictness: null,
        submissions: 0,
        gpaRisk: null,
      });
    }

    // ✅ Normalize values
    const workload = Number(stats[0].avgWorkload.toFixed(1));
    const difficulty = Number(stats[0].avgDifficulty.toFixed(1));
    const gradingStrictness = Number(stats[0].avgGradingStrictness.toFixed(1));
    const submissions = stats[0].count;

    // ✅ GPA Risk logic
    let gpaRisk = "Low";

    if (difficulty >= 4 && gradingStrictness >= 4) {
      gpaRisk = "High";
    } else if (difficulty >= 3 && gradingStrictness >= 3) {
      gpaRisk = "Medium";
    }

    res.json({
      workload,
      difficulty,
      gradingStrictness,
      submissions,
      gpaRisk,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course stats" });
  }
};
