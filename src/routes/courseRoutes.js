import express from 'express';
import { createCourse, getAllCourses, getCourseById } from '../controllers/courseController.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;