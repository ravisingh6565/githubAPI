
import express from 'express';
import * as ctrl from '../controllers/repoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Repos
 *     description: Repository endpoints proxied from GitHub
 */

/**
 * @swagger
 * /api/repos/{owner}/{repo}:
 *   get:
 *     summary: Get repository metadata
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *         description: Repository owner (username or org)
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *         description: Repository name
 *     responses:
 *       200:
 *         description: Repository metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RepoResponse'
 *       404:
 *         description: Repo not found
 *       500:
 *         description: Server error
 */
router.get('/:owner/:repo', ctrl.getRepoMetadata);

/**
 * @swagger
* /api/repos/{owner}/{repo}/git/trees/{branch}:
 *   get:
 *     summary: Get the git tree for a branch
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: branch
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tree object
 */
router.get('/:owner/:repo/git/trees/:branch', ctrl.getTree);

/**
 * @swagger
* /api/repos/{owner}/{repo}/contents:
 *   get:
 *     summary: Get repository contents (file listing) — root or path via wildcard
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: path
 *         in: query
 *         required: false
 *         schema: { type: string }
 *         description: Optional path inside repo (or use wildcard route)
 *     responses:
 *       200:
 *         description: File/directory content listing
 */
router.get('/:owner/:repo/contents/*', ctrl.getContents);
router.get('/:owner/:repo/contents', ctrl.getContents);

/**
 * @swagger
* /api/repos/{owner}/{repo}/commits:
 *   get:
 *     summary: List commits for a repository
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: per_page
 *         in: query
 *         schema: { type: integer }
 *         description: Items per page
 *       - name: page
 *         in: query
 *         schema: { type: integer }
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of commits
 */
router.get('/:owner/:repo/commits', ctrl.listCommits);

/**
 * @swagger
* /api/repos/{owner}/{repo}/commits/{sha}:
 *   get:
 *     summary: Get a single commit by SHA
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: sha
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Commit object
 */
router.get('/:owner/:repo/commits/:sha', ctrl.getCommit);

/**
 * @swagger
* /api/repos/{owner}/{repo}/compare/{base}...{head}:
 *   get:
 *     summary: Compare two commits/branches
 *     tags: [Repos]
 *     parameters:
 *       - name: owner
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: repo
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: base
 *         in: path
 *         required: true
 *         schema: { type: string }
 *       - name: head
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Comparison result
 */
router.get('/:owner/:repo/compare/:base...:head', ctrl.compareCommits);

/**
 * @swagger
* /api/repos/{owner}/{repo}/branches:
 *   get:
 *     summary: List branches in a repository
 *     tags: [Repos]
 */
router.get('/:owner/:repo/branches', ctrl.listBranches);

/**
 * @swagger
* /api/repos/{owner}/{repo}/tags:
 *   get:
 *     summary: List tags
 *     tags: [Repos]
 */
router.get('/:owner/:repo/tags', ctrl.listTags);

/**
 * @swagger
* /api/repos/{owner}/{repo}/releases:
 *   get:
 *     summary: List releases
 *     tags: [Repos]
 */
router.get('/:owner/:repo/releases', ctrl.listReleases);

/**
 * @swagger
* /api/repos/{owner}/{repo}/releases/latest:
 *   get:
 *     summary: Get latest release
 *     tags: [Repos]
 */
router.get('/:owner/:repo/releases/latest', ctrl.latestRelease);

/**
 * @swagger
* /api/repos/{owner}/{repo}/contributors:
 *   get:
 *     summary: List contributors
 *     tags: [Repos]
 */
router.get('/:owner/:repo/contributors', ctrl.listContributors);

/**
 * @swagger
* /api/repos/{owner}/{repo}/collaborators:
 *   get:
 *     summary: List collaborators
 *     tags: [Repos]
 */
router.get('/:owner/:repo/collaborators', ctrl.listCollaborators);

/**
 * @swagger
* /api/repos/{owner}/{repo}/actions/runs:
 *   get:
 *     summary: List workflow runs (actions)
 *     tags: [Repos]
 */
router.get('/:owner/:repo/actions/runs', ctrl.listWorkflowRuns);

/**
 * @swagger
* /api/repos/{owner}/{repo}/stats/traffic:
 *   get:
 *     summary: Get traffic stats
 *     tags: [Repos]
 */
router.get('/:owner/:repo/stats/traffic', ctrl.traffic);

/**
 * @swagger
* /api/repos/{owner}/{repo}/stats/participation:
 *   get:
 *     summary: Get participation stats
 *     tags: [Repos]
 */
router.get('/:owner/:repo/stats/participation', ctrl.participation);

/**
 * @swagger
* /api/repos/{owner}/{repo}/stats/code_frequency:
 *   get:
 *     summary: Get code frequency stats
 *     tags: [Repos]
 */
router.get('/:owner/:repo/stats/code_frequency', ctrl.codeFrequency);

/**
 * @swagger
* /api/repos/{owner}/{repo}/dependency-graph/sbom:
 *   get:
 *     summary: Get dependency SBOM
 *     tags: [Repos]
 */
router.get('/:owner/:repo/dependency-graph/sbom', ctrl.dependencySBOM);

/**
 * @swagger
* /api/repos/{owner}/{repo}/dependabot/alerts:
 *   get:
 *     summary: List dependabot alerts
 *     tags: [Repos]
 */
router.get('/:owner/:repo/dependabot/alerts', ctrl.dependabotAlerts);

/**
 * @swagger
* /api/repos/{owner}/{repo}/events:
 *   get:
 *     summary: List repo events
 *     tags: [Repos]
 */
router.get('/:owner/:repo/events', ctrl.listEvents);

/**
 * @swagger
* /api/repos/{owner}/{repo}/hooks:
 *   get:
 *     summary: List hooks
 *     tags: [Repos]
 */
router.get('/:owner/:repo/hooks', ctrl.listHooks);

/**
 * @swagger
* /api/repos/{owner}/{repo}/readme:
 *   get:
 *     summary: Get README
 *     tags: [Repos]
 */
router.get('/:owner/:repo/readme', ctrl.getReadme);

/**
 * @swagger
* /api/repos/{owner}/{repo}/pages:
 *   get:
 *     summary: Get pages info
 *     tags: [Repos]
 */
router.get('/:owner/:repo/pages', ctrl.getPages);

/**
 * @swagger
* /api/repos/{owner}/{repo}/environments:
 *   get:
 *     summary: List environments
 *     tags: [Repos]
 */
router.get('/:owner/:repo/environments', ctrl.listEnvironments);

/**
 * @swagger
* /api/repos/{owner}/{repo}/actions/secrets:
 *   get:
 *     summary: List actions secrets (requires appropriate GH scopes)
 *     tags: [Repos]
 */
router.get('/:owner/:repo/actions/secrets', ctrl.listSecrets);

export default router;
