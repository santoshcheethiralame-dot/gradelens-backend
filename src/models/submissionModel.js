import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    workload: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    gradingStrictness: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

submissionSchema.index({ user: 1, course: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
