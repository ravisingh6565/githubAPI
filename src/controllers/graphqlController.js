import { ghGraphQL } from '../utils/githubClient.js';

export async function runGraphQL(req, res, next) {
  try {
    const { query, variables } = req.body;
    if (!query) {
      const err = new Error('GraphQL query is required in request body');
      err.status = 400;
      throw err;
    }
    const result = await ghGraphQL(query, variables || {});
    res.json(result.data);
  } catch (err) { next(err); }
}
