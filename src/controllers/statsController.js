import Submission from "../models/submissionModel.js";
import mongoose from "mongoose";

export const getCourseStats = async (req, res) => {
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

  if (!stats.length) {
    return res.json({});
  }

  res.json(stats[0]);
};
