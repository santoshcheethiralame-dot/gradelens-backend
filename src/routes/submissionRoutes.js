import express from 'express';
import { submitFeedback } from '../controllers/submissionController.js';
import { getCourseStats } from '../controllers/statsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:courseId/submit', authMiddleware, submitFeedback);
router.get('/:courseId/stats', getCourseStats);

export default router;