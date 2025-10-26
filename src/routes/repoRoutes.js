import express from 'express';
import * as ctrl from '../controllers/repoController.js';

const router = express.Router();

router.get('/:owner/:repo', ctrl.getRepoMetadata);
router.get('/:owner/:repo/git/trees/:branch', ctrl.getTree);
router.get('/:owner/:repo/contents/*', ctrl.getContents);
router.get('/:owner/:repo/contents', ctrl.getContents);
router.get('/:owner/:repo/commits', ctrl.listCommits);
router.get('/:owner/:repo/commits/:sha', ctrl.getCommit);
router.get('/:owner/:repo/compare/:base...:head', ctrl.compareCommits);
router.get('/:owner/:repo/branches', ctrl.listBranches);
router.get('/:owner/:repo/tags', ctrl.listTags);
router.get('/:owner/:repo/releases', ctrl.listReleases);
router.get('/:owner/:repo/releases/latest', ctrl.latestRelease);
router.get('/:owner/:repo/contributors', ctrl.listContributors);
router.get('/:owner/:repo/collaborators', ctrl.listCollaborators);
router.get('/:owner/:repo/issues', ctrl.listIssues);
router.get('/:owner/:repo/pulls', ctrl.listPulls);
router.get('/:owner/:repo/discussions', ctrl.listDiscussions);
router.get('/:owner/:repo/actions/workflows', ctrl.listWorkflows);
router.get('/:owner/:repo/actions/runs', ctrl.listWorkflowRuns);
router.get('/:owner/:repo/stats/traffic', ctrl.traffic);
router.get('/:owner/:repo/stats/participation', ctrl.participation);
router.get('/:owner/:repo/stats/code_frequency', ctrl.codeFrequency);
router.get('/:owner/:repo/dependency-graph/sbom', ctrl.dependencySBOM);
router.get('/:owner/:repo/dependabot/alerts', ctrl.dependabotAlerts);
router.get('/:owner/:repo/events', ctrl.listEvents);
router.get('/:owner/:repo/hooks', ctrl.listHooks);
router.get('/:owner/:repo/readme', ctrl.getReadme);
router.get('/:owner/:repo/pages', ctrl.getPages);
router.get('/:owner/:repo/environments', ctrl.listEnvironments);
router.get('/:owner/:repo/actions/secrets', ctrl.listSecrets);

export default router;
