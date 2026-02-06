import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} from '../controllers/TEMPenquiryController.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', getAllEnquiries);
router.delete('/:id', deleteEnquiry);

export default router;
