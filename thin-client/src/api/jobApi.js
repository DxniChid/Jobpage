/**
 * Job API client.
 * Handles fetching job listings from a remote REST endpoint,
 * with automatic fallback to built‑in mock data.
 *
 * @module jobApi
 */

import { mockJobs } from './mockJobs.js';

/**
 * Default base URL of the job API.
 * Used when no `apiUrl` is provided to `fetchJobs`.
 *
 * @constant {string}
 * @default 'https://api.jobs.bfo.ch'
 */
const DEFAULT_API_URL = 'https://api.jobs.bfo.ch';

/**
 * Fetches job listings from the configured API.
 *
 * If `useMock` is `true`, the function immediately returns a copy of the
 * built‑in mock job data without attempting a network request.
 *
 * Otherwise, it performs a `GET` request to `${apiUrl}/jobs`. If the request
 * fails (network error, non‑OK HTTP status, or invalid JSON), it logs a
 * warning and falls back to returning the mock data.
 *
 * @async
 * @function
 * @param {string} [apiUrl=DEFAULT_API_URL] - Base URL of the job API.
 *	 The endpoint `{apiUrl}/jobs` is expected to return a JSON array of job objects.
 * @param {boolean} [useMock=false] - If `true`, bypass the network request
 *	 and immediately return mock data. Useful for testing and development.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of job objects.
 *	 In case of API failure, this will be the mock data.
 *
 * @throws {Error} Only in very rare cases, e.g. if the Promise chain is
 *	 interrupted unexpectedly. Most errors are caught and handled internally.
 *
 * @example
 * // Fetch from default URL with real API
 * const jobs = await fetchJobs();
 *
 * @example
 * // Force mock data for testing
 * const mockJobs = await fetchJobs('https://example.com', true);
 *
 * @example
 * // Use custom API endpoint
 * const jobs = await fetchJobs('https://my-jobs-api.example');
 */
export async function fetchJobs(apiUrl = DEFAULT_API_URL, useMock = true) {
	if (useMock) {
		console.log('Using mock job data (testing mode)');
		return [...mockJobs];
	}

	try {
		const response = await fetch(`${apiUrl}/jobs`);
		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
		}
		const jobs = await response.json();
		return jobs;
	} catch (error) {
		console.warn('API fetch failed, falling back to mock data:', error);
		return [...mockJobs];
	}
}