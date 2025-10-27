

// src/routes/graphqlRoutes.js
import express from 'express';
import { runGraphQL } from '../controllers/graphqlController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: GraphQL
 *     description: GraphQL proxy endpoint to GitHub GraphQL API
 */

/**
 * @swagger
 * /graphql:
 *   post:
 *     summary: Run GraphQL query/mutation against GitHub GraphQL API
 *     tags: [GraphQL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: GraphQL query string
 *               variables:
 *                 type: object
 *                 description: Variables for the GraphQL query
 *     responses:
 *       200:
 *         description: GraphQL response
 *       400:
 *         description: Bad request
 */
router.post('/', runGraphQL);

export default router;
