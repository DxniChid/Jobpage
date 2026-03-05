/**
 * Job list component.
 * Renders a collection of job items into a container.
 *
 * @module JobList
 */

import { createJobItem } from './JobItem.js';

/**
 * Renders a list of jobs inside a container.
 *
 * Clears the container, then either displays a "no jobs" message
 * or populates it with job items created by `createJobItem`.
 *
 * @function
 * @param {HTMLElement} container - The DOM element to populate.
 * @param {Array<Object>} jobs - Array of job objects to render.
 *	 Each job object must conform to the structure expected by `createJobItem`.
 * @returns {void}
 *
 * @example
 * const jobListContainer = document.querySelector('.job-list');
 * renderJobList(jobListContainer, [
 *	 { id: '1', title: 'Developer', ... },
 *	 { id: '2', title: 'Designer', ... }
 * ]);
 */
export function renderJobList(container, jobs) {
	container.innerHTML = ''; // Clear previous
	if (!jobs || jobs.length === 0) {
		container.innerHTML = '<p class="no-jobs">Keine Stellenangebote gefunden.</p>';
		return;
	}
	jobs.forEach(job => {
		container.appendChild(createJobItem(job));
	});
}