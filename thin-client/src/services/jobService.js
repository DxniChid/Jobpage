/**
 * Job filtering and option extraction service.
 *
 * Provides pure functions to filter job lists and extract
 * unique filter values from job data.
 *
 * @module jobService
 */

/**
 * Filters a list of jobs based on active filter criteria.
 *
 * @function
 * @param {Array<Object>} jobs - Full list of job objects.
 * @param {Object} filters - Current filter values.
 * @param {string} [filters.category] - Job category to match (e.g., "IT").
 * @param {string} [filters.region] - Job region to match (e.g., "BE").
 * @param {boolean} [filters.homeOffice] - Whether home office is possible (`true`/`false`).
 * @param {string} [filters.language] - Required language (e.g., "German").
 * @param {string} [filters.workplace] - Workplace type (e.g., "Remote", "Hybrid").
 * @returns {Array<Object>} Filtered array of jobs that match **all** provided criteria.
 *
 * @example
 * const filtered = filterJobs(jobs, {
 *	 category: 'IT',
 *	 homeOffice: true
 * });
 */
// src/services/jobService.js
export function filterJobs(jobs, filters) {
	return jobs.filter(job => {
		if (filters.searchTerm) {
			const search = filters.searchTerm.toLowerCase();
			const searchableFields = [
				job.title,
				job.company,
				job.location,
				job.zip,
				job.description,
				job.requirements,
				job.benefits,
				job.category,
			];
			const hasMatch = searchableFields.some((field) =>
				String(field || '').toLowerCase().includes(search)
			);
			if (!hasMatch) return false;
		}

		if (filters.category && job.category !== filters.category) return false;
		if (filters.region && job.canton !== filters.region) return false;

		// Search over PLZ and City
		if (filters.locationSearch) {
			const search = filters.locationSearch.toLowerCase();
			const matchesZip = job.zip && job.zip.includes(search);
			const matchesCity = job.location && job.location.toLowerCase().includes(search);
			if (!matchesZip && !matchesCity) return false;
		}

		if (filters.homeOffice !== undefined && job.homeOffice !== filters.homeOffice) return false;
		return true;
	});
}

/**
 * Extracts unique possible values for dynamic filter options.
 *
 * Iterates over the requested filter names and collects
 * all distinct non‑empty values present in the job list.
 *
 * @function
 * @param {Array<Object>} jobs - List of job objects.
 * @param {Array<string>} filterNames - Array of filter names as defined in
 *	 `data-filter-options` (e.g. `['HomeOffice', 'Language']`).
 *	 Supported names (case‑insensitive): `HomeOffice`, `Language`, `Workplace`.
 * @returns {Object.<string, Array>} An object where each key corresponds to a
 *	 filter name (lowercase) and the value is an array of unique possible values.
 *	 - `homeOffice` {Array<boolean>} – contains `true` and/or `false`.
 *	 - `language` {Array<string>} – unique languages.
 *	 - `workplace` {Array<string>} – unique workplace types.
 *
 * @example
 * const options = extractFilterOptions(jobs, ['HomeOffice', 'Language']);
 * // { homeOffice: [true, false], language: ['German', 'French'] }
 */
export function extractFilterOptions(jobs, filterNames) {
	const options = {};
	filterNames.forEach(name => {
		const key = name.toLowerCase();
		if (key === 'homeoffice') {
			options.homeOffice = [
				...new Set(jobs.map(j => j.homeOffice).filter(v => v !== undefined && v !== null))
			];
		} else if (key === 'language') {
			options.language = [...new Set(jobs.map(j => j.language).filter(Boolean))];
		} else if (key === 'workplace') {
			options.workplace = [...new Set(jobs.map(j => j.workplace).filter(Boolean))];
		}
		// Additional filter types can be added here
	});
	return options;
}

/**
 * Extracts unique categories and regions from the job list.
 *
 * Used to populate the static category and region dropdowns
 * when no pre‑defined values are supplied via configuration.
 *
 * @function
 * @param {Array<Object>} jobs - List of job objects.
 * @returns {Object} Object containing two arrays:
 * @returns {Array<string>} return.categories - Unique, non‑empty category values.
 * @returns {Array<string>} return.regions - Unique, non‑empty region values.
 *
 * @example
 * const { categories, regions } = extractStaticFilterOptions(jobs);
 * // categories: ['IT', 'Marketing', 'Bau']
 * // regions: ['BE', 'ZH', 'VS']
 */
export function extractStaticFilterOptions(jobs) {
	return {
		categories: [...new Set(jobs.map(j => j.category).filter(Boolean))],
		regions: [...new Set(jobs.map(j => j.canton).filter(Boolean))]
	};
}
