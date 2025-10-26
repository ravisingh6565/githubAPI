import 'dotenv/config';
import axios from 'axios';

const BASE = process.env.GITHUB_API_BASE || 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN || null; 
// console.log("token:",TOKEN)

const instance = axios.create({
  baseURL: BASE,
  timeout: 20000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'github-backend-esm/1.0'
  }
});

if (TOKEN) {
  instance.defaults.headers.common['Authorization'] = `token ${TOKEN}`;
}

export async function ghRequest(method, url, options = {}) {
  try {
    const res = await instance.request({ method, url, ...options });
    return { data: res.data, status: res.status, headers: res.headers };
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      const message = data?.message || 'GitHub API error';
      const error = new Error(message);
      error.status = status;
      error.details = data;
      throw error;
    } else {
      const error = new Error(err.message || 'Network error');
      error.status = 502;
      throw error;
    }
  }
}

export async function ghGraphQL(query, variables = {}) {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v4+json',
      'User-Agent': 'github-backend-esm/1.0'
    };
    if (TOKEN) headers['Authorization'] = `bearer ${TOKEN}`;
    const res = await axios.post(`${BASE}/graphql`, { query, variables }, { headers, timeout: 20000 });
    if (res.data.errors) {
      const err = new Error('GraphQL error');
      err.status = 500;
      err.details = res.data.errors;
      throw err;
    }
    return { data: res.data.data };
  } catch (err) {
    if (err.response) {
      const error = new Error(err.response.data?.message || 'GitHub GraphQL error');
      error.status = err.response.status;
      error.details = err.response.data;
      throw error;
    }
    throw err;
  }
}
