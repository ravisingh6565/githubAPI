import { ghRequest } from '../utils/githubClient.js';
import { parsePatch } from '../utils/diffParser.js';

export async function getRepoMetadata(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function getTree(req, res, next) {
  try {
    const { owner, repo, branch } = req.params;
    const recursive = req.query.recursive === '1' ? 1 : undefined;
    const url = `/repos/${owner}/${repo}/git/trees/${branch}${recursive ? '?recursive=1' : ''}`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function getContents(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const path = req.params[0] || req.query.path || '';
    const url = path ? `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}` : `/repos/${owner}/${repo}/contents`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listCommits(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const qs = [];
    ['sha','path','author','since','until','per_page','page'].forEach(k => {
      if (req.query[k]) qs.push(`${k}=${encodeURIComponent(req.query[k])}`);
    });
    const url = `/repos/${owner}/${repo}/commits${qs.length ? '?' + qs.join('&') : ''}`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function getCommit(req, res, next) {
  try {
    const { owner, repo, sha } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/commits/${sha}`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function compareCommits(req, res, next) {
  try {
    const { owner, repo, base, head } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/compare/${encodeURIComponent(base)}...${encodeURIComponent(head)}`);
    const parsed = (data.files || []).map(f => ({
      filename: f.filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
      changes: f.changes,
      patch: f.patch || null,
      parsedPatch: f.patch ? parsePatch(`diff --git a/${f.filename} b/${f.filename}\n${f.patch}`) : []
    }));
    res.json({ summary: { status: data.status, ahead_by: data.ahead_by, behind_by: data.behind_by, total_commits: data.total_commits }, raw: data, files: parsed });
  } catch (err) { next(err); }
}

export async function listBranches(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/branches`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listTags(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/tags`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listReleases(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/releases`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function latestRelease(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/releases/latest`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listContributors(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/contributors`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listCollaborators(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/collaborators`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listIssues(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const qs = req.query || {};
    const q = Object.keys(qs).map(k => `${k}=${encodeURIComponent(qs[k])}`).join('&');
    const url = `/repos/${owner}/${repo}/issues${q ? `?${q}` : ''}`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listPulls(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const qs = req.query || {};
    const q = Object.keys(qs).map(k => `${k}=${encodeURIComponent(qs[k])}`).join('&');
    const url = `/repos/${owner}/${repo}/pulls${q ? `?${q}` : ''}`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listDiscussions(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const url = `/repos/${owner}/${repo}/discussions`;
    const { data } = await ghRequest('GET', url);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listWorkflows(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/actions/workflows`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listWorkflowRuns(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const qs = req.query || {};
    const q = Object.keys(qs).map(k => `${k}=${encodeURIComponent(qs[k])}`).join('&');
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/actions/runs${q ? `?${q}` : ''}`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function traffic(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/traffic/views`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function participation(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/stats/participation`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function codeFrequency(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/stats/code_frequency`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function dependencySBOM(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/dependency-graph/sbom`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function dependabotAlerts(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/dependabot/alerts`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listEvents(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/events`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listHooks(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/hooks`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function getReadme(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/readme`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function getPages(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/pages`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listEnvironments(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/environments`);
    res.json(data);
  } catch (err) { next(err); }
}

export async function listSecrets(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const { data } = await ghRequest('GET', `/repos/${owner}/${repo}/actions/secrets`);
    res.json(data);
  } catch (err) { next(err); }
}
