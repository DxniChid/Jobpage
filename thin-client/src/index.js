/**
 * Thin Client entry point.
 * Auto-initializes job widgets found in the DOM.
 *
 * This module defines a `JobWidget` class that transforms a container element
 * into a fully interactive job listing with filtering capabilities.
 * The widget reads its configuration from HTML `data-*` attributes,
 * fetches job data (with automatic fallback to mock data), and renders
 * a filter bar and a list of job items.
 *
 * @module index
 */

import { fetchJobs } from './api/jobApi.js';
import { filterJobs, extractFilterOptions, extractStaticFilterOptions } from './services/jobService.js';
import { createLoadingSpinner } from './components/Loading.js';
import { createFilterBar } from './components/FilterBar.js';
import { renderJobList } from './components/JobList.js';

/**
 * Job listing widget.
 *
 * Reads configuration from a container element and renders
 * a fully interactive job list with filters.
 *
 * @class
 * @classdesc Embeds a job board widget into any container.
 */
class JobWidget {
	/**
	 * Create a new JobWidget instance.
	 *
	 * @constructor
	 * @param {HTMLElement} container - DOM element that will host the widget.
	 *	 This element is expected to have optional `data-*` attributes for configuration.
	 */
	constructor(container) {
		/**
		 * The container element where the widget is rendered.
		 * @type {HTMLElement}
		 * @private
		 */
		this.container = container;

		/**
		 * Configuration object parsed from `data-*` attributes.
		 * @type {Object}
		 * @property {string} apiUrl - Base URL of the job API.
		 * @property {string|undefined} category - Pre‑selected job category.
		 * @property {string|undefined} region - Pre‑selected region.
		 * @property {string|undefined} language - Default language hint.
		 * @property {string[]} filterOptions - Array of additional filter names.
		 * @property {string|undefined} styleEntry - URL to an external CSS file.
		 * @property {string|undefined} styleSearchBar - Inline CSS rules.
		 * @property {boolean} showSearchBar - Whether to render the text search field.
		 * @property {string|undefined} searchBackgroundColor - Search input background color.
		 * @property {string|undefined} searchPlaceholderColor - Search input placeholder color.
		 * @property {boolean} useMock - Whether to force mock data.
		 * @private
		 */
		this.config = this.parseConfig(container);

		/**
		 * Full list of jobs fetched from the API (or mock data).
		 * @type {Array<Object>}
		 * @private
		 */
		this.jobs = [];

		/**
		 * Filtered subset of jobs currently displayed.
		 * @type {Array<Object>}
		 * @private
		 */
		this.filteredJobs = [];

		/**
		 * The filter bar DOM element.
		 * @type {HTMLElement|null}
		 * @private
		 */
		this.filterBar = null;

		/**
		 * Container that holds the job list (grid).
		 * @type {HTMLElement|null}
		 * @private
		 */
		this.jobListContainer = null;

		/**
		 * Loading spinner element.
		 * @type {HTMLElement|null}
		 * @private
		 */
		this.loadingSpinner = null;

		// Start the initialisation process
		this.init();
	}

	/**
	 * Read configuration from `data-*` attributes of the container.
	 *
	 * @private
	 * @param {HTMLElement} container - The widget container.
	 * @returns {Object} Parsed configuration object.
	 */
	parseConfig(container) {
		const config = {
			apiUrl: container.dataset.apiUrl || 'https://api.jobs.bfo.ch',
			category: container.dataset.category,
			region: container.dataset.region,
			language: container.dataset.language, // Could be default language
			filterOptions: container.dataset.filterOptions
				? JSON.parse(container.dataset.filterOptions)
				: [],
			styleEntry: container.dataset.styleEntry,
			styleSearchBar: container.dataset.styleSearchBar,
			showSearchBar: container.dataset.showSearchBar !== 'false',
			searchBackgroundColor: container.dataset.searchBackgroundColor,
			searchPlaceholderColor: container.dataset.searchPlaceholderColor,
			// Allow forcing mock data via data-use-mock="true"
			useMock: container.dataset.useMock === 'true',
		};
		return config;
	}

	/**
	 * Initialize the widget:
	 * - inject custom styles
	 * - fetch job data
	 * - build the filter bar and job list containers
	 * - render initial job list
	 *
	 * @private
	 * @async
	 * @returns {Promise<void>}
	 */
	async init() {
		// 1. Inject custom CSS if provided
		if (this.config.styleEntry) {
			this.loadExternalCSS(this.config.styleEntry);
		}
		if (this.config.styleSearchBar) {
			this.injectInlineStyle(this.config.styleSearchBar);
		}

		// 2. Build basic DOM structure
		this.container.innerHTML = '';
		this.container.classList.add('job-client-widget');

		// 3. Add loading spinner
		this.loadingSpinner = createLoadingSpinner();
		this.container.appendChild(this.loadingSpinner);
		this.showLoading();

		// 4. Fetch jobs – mock fallback is handled inside fetchJobs
		try {
			this.jobs = await fetchJobs(this.config.apiUrl, this.config.useMock);
		} catch (error) {
			// fetchJobs already falls back to mock data on failure.
			// This catch only triggers if an unexpected error occurs after the fallback.
			console.error('Unrecoverable job fetch error:', error);
			this.container.innerHTML = `<p class="error">Fehler beim Laden der Stellenangebote. Bitte versuchen Sie es später erneut.</p>`;
			return;
		} finally {
			this.hideLoading();
		}

		// 5. Prepare filter options (static and dynamic)
		const staticOptions = extractStaticFilterOptions(this.jobs);
		const dynamicOptions = extractFilterOptions(this.jobs, this.config.filterOptions);

		// 6. Create filter bar
		this.filterBar = createFilterBar(
			this.config,
			{ ...staticOptions, ...dynamicOptions },
			(filters) => this.applyFilters(filters)
		);
		this.container.appendChild(this.filterBar);

		// 7. Create container for job list
		this.jobListContainer = document.createElement('div');
		this.jobListContainer.className = 'job-list';
		this.container.appendChild(this.jobListContainer);

		// 8. Initial filter (using pre-set values from config)
		const initialFilters = {
			category: this.config.category,
			region: this.config.region,
			// dynamic filters are initially undefined
		};
		this.applyFilters(initialFilters);
	}

	/**
	 * Apply filters to the job list and re-render.
	 *
	 * @param {Object} filters - Key-value pairs of filter criteria.
	 *	 Supported keys: `category`, `region`, `homeOffice`, `language`, `workplace`.
	 * @public
	 */
	applyFilters(filters) {
		this.filteredJobs = filterJobs(this.jobs, filters);
		renderJobList(this.jobListContainer, this.filteredJobs);
	}

	/**
	 * Show the loading spinner.
	 * @private
	 */
	showLoading() {
		if (this.loadingSpinner) this.loadingSpinner.style.display = 'flex';
	}

	/**
	 * Hide the loading spinner.
	 * @private
	 */
	hideLoading() {
		if (this.loadingSpinner) this.loadingSpinner.style.display = 'none';
	}

	/**
	 * Dynamically load an external CSS file.
	 *
	 * @private
	 * @param {string} href - URL of the stylesheet.
	 */
	loadExternalCSS(href) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;
		document.head.appendChild(link);
	}

	/**
	 * Inject inline CSS rules.
	 *
	 * @private
	 * @param {string} styleString - Raw CSS rules.
	 */
	injectInlineStyle(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.appendChild(style);
	}
}

// Auto-initialise all containers with id="job-client" on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	/**
	 * All placeholder elements that should become job widgets.
	 * @type {NodeListOf<HTMLElement>}
	 */
	const containers = document.querySelectorAll('#job-client');

	containers.forEach((container) => {
		// Avoid double initialisation
		if (!container._jobWidget) {
			/**
			 * Attach the widget instance to the container to prevent duplicate creation.
			 * @type {JobWidget}
			 */
			container._jobWidget = new JobWidget(container);
		}
	});
});
