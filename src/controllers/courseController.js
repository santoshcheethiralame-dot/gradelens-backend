import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, department, semester } = req.body;
    const course = await Course.create({
      courseCode,
      courseName,
      department,
      semester,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
