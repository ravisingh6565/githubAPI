import express from 'express';
import { runGraphQL } from '../controllers/graphqlController.js';
const router = express.Router();
router.post('/', runGraphQL);
export default router;
