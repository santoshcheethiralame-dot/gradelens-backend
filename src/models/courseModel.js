import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    couseCode: {
      type: String,
      required: true,
      unique: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
    },
  },

  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
