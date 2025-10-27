// add imports near top of server.js
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; // relative path from server.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import repoRoutes from './src/routes/repoRoutes.js';
import graphqlRoutes from './src/routes/graphqlRoutes.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
// console.log(process.env.PORT)

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true
  }
}));

// optional: serve raw JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.use('/api/repos', repoRoutes);
app.use('/api/graphql', graphqlRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GitHub Backend (ESM) listening on port ${PORT}`);
});
