// swagger.js  (ESM)
import swaggerJsdoc from 'swagger-jsdoc';

const serverUrl = process.env.SWAGGER_SERVER_URL || 'http://localhost:5000'; // update default port if different

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'GitHubAPI Backend',
      version: '1.0.0',
      description: 'Auto-generated OpenAPI docs for GitHubAPI project (JSDoc comments).',
      contact: {
        name: 'Ravi Singh',
        email: 'ravisingh6565@example.com'
      },
      license: { name: 'MIT' }
    },
    servers: [
      { url: serverUrl, description: 'Primary (production) server' },
      { url: 'http://localhost:5000', description: 'Local development server' }
    ],
    components: {
      securitySchemes: {
        // Custom header auth as requested
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'x-auth-token',
          in: 'header',
          description: 'Provide your token in the `x-auth-token` header'
        }
      },
      schemas: {
        // global example schemas — extend if you have models
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        RepoResponse: {
          type: 'object',
          description: 'Repository metadata (proxied from GitHub)',
          properties: {
            id: { type: 'integer', example: 123456 },
            name: { type: 'string', example: 'hello-world' },
            full_name: { type: 'string', example: 'owner/hello-world' },
            private: { type: 'boolean', example: false }
          }
        }
      }
    }
  },
  // files to scan for JSDoc comments (adjust if you move files)
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;
