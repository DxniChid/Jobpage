/**
 * Filter bar component.
 * Builds a dynamic filter bar with category, region, and optional
 * additional filters (HomeOffice, Language, Workplace).
 *
 * @module FilterBar
 */

/**
 * Reads current filter values from all `<select>` elements inside the filter bar.
 *
 * @private
 * @function
 * @param {HTMLElement} filterBar - The filter bar DOM element.
 * @returns {Object.<string, (string|boolean|undefined)>} Filter values keyed by select name.
 *	 - `category` {string|undefined} Selected category or `undefined` for "Alle".
 *	 - `region` {string|undefined} Selected region or `undefined` for "Alle".
 *	 - `homeOffice` {boolean|undefined} `true`, `false`, or `undefined` for "Alle".
 *	 - `language` {string|undefined} Selected language or `undefined` for "Alle".
 *	 - `workplace` {string|undefined} Selected workplace or `undefined` for "Alle".
 */
function getCurrentFilters(filterBar) {
	const filters = {};
	const selects = filterBar.querySelectorAll('select');
	selects.forEach((select) => {
		const name = select.name;
		let value = select.value;
		if (value === '') value = undefined; // No filter
		if (name === 'homeOffice' && value !== undefined) {
			value = value === 'true'; // Convert string to boolean
		}
		filters[name] = value;
	});
	return filters;
}

/**
 * Creates the filter bar DOM element and attaches change event listeners.
 *
 * Generates a `<div class="job-client-filterbar">` containing dropdowns for:
 * - Category (from `availableOptions.categories`)
 * - Region (from `availableOptions.regions`)
 * - Additional filters listed in `config.filterOptions` (HomeOffice, Language, Workplace)
 *
 * Pre‑selects category and region if `config.category` / `config.region` are provided.
 * Emits the current filter set via `onFilterChange` whenever a dropdown value changes.
 *
 * @function
 * @param {Object} config - Widget configuration (parsed from `data-*` attributes).
 * @param {string} [config.apiUrl] - Base URL of the job API (unused here, but part of config).
 * @param {string} [config.category] - Pre‑selected category.
 * @param {string} [config.region] - Pre‑selected region.
 * @param {string} [config.language] - Default language (unused here).
 * @param {string[]} config.filterOptions - Array of additional filter names.
 *	 Possible values: `"HomeOffice"`, `"Language"`, `"Workplace"`.
 * @param {Object} availableOptions - Possible values for static and dynamic filters.
 * @param {string[]} [availableOptions.categories] - Unique category values from all jobs.
 * @param {string[]} [availableOptions.regions] - Unique region values from all jobs.
 * @param {string[]} [availableOptions.language] - Unique language values from all jobs.
 * @param {string[]} [availableOptions.workplace] - Unique workplace values from all jobs.
 * @param {Array} [availableOptions.homeOffice] - Not used (HomeOffice is boolean).
 * @param {Function} onFilterChange - Callback invoked whenever a filter value changes.
 *	 Receives the current filter object (same shape as returned by `getCurrentFilters`).
 * @returns {HTMLElement} The fully constructed filter bar element.
 *
 * @example
 * const filterBar = createFilterBar(
 *	 { category: 'IT', filterOptions: ['HomeOffice'] },
 *	 { categories: ['IT', 'Marketing'], regions: ['BE', 'ZH'] },
 *	 (filters) => applyFilters(filters)
 * );
 * container.appendChild(filterBar);
 */
export function createFilterBar(config, availableOptions, onFilterChange) {
	const filterBar = document.createElement('div');
	filterBar.className = 'job-client-filterbar';

	// --- Category dropdown ---
	const categoryWrapper = document.createElement('div');
	categoryWrapper.className = 'filter-group';
	categoryWrapper.innerHTML = `
		<label for="filter-category">Kategorie</label>
		<select id="filter-category" name="category">
			<option value="">Alle</option>
			${(availableOptions.categories || [])
				.map((cat) => `<option value="${cat}">${cat}</option>`)
				.join('')}
		</select>
	`;

	// --- Region dropdown ---
	const regionWrapper = document.createElement('div');
	regionWrapper.className = 'filter-group';
	regionWrapper.innerHTML = `
		<label for="filter-region">Region</label>
		<select id="filter-region" name="region">
			<option value="">Alle</option>
			${(availableOptions.regions || [])
				.map((reg) => `<option value="${reg}">${reg}</option>`)
				.join('')}
		</select>
	`;

	filterBar.appendChild(categoryWrapper);
	filterBar.appendChild(regionWrapper);

	// --- Dynamic filters (e.g., HomeOffice, Language, Workplace) ---
	if (config.filterOptions) {
		config.filterOptions.forEach((filterName) => {
			const key = filterName.toLowerCase();
			if (key === 'homeoffice') {
				const wrapper = document.createElement('div');
				wrapper.className = 'filter-group';
				wrapper.innerHTML = `
					<label for="filter-homeOffice">Home Office</label>
					<select id="filter-homeOffice" name="homeOffice">
						<option value="">Alle</option>
						<option value="true">Ja</option>
						<option value="false">Nein</option>
					</select>
				`;
				filterBar.appendChild(wrapper);
			} else if (key === 'language' && availableOptions.language) {
				const wrapper = document.createElement('div');
				wrapper.className = 'filter-group';
				wrapper.innerHTML = `
					<label for="filter-language">Sprache</label>
					<select id="filter-language" name="language">
						<option value="">Alle</option>
						${availableOptions.language
							.map((lang) => `<option value="${lang}">${lang}</option>`)
							.join('')}
					</select>
				`;
				filterBar.appendChild(wrapper);
			} else if (key === 'workplace' && availableOptions.workplace) {
				const wrapper = document.createElement('div');
				wrapper.className = 'filter-group';
				wrapper.innerHTML = `
					<label for="filter-workplace">Arbeitsort</label>
					<select id="filter-workplace" name="workplace">
						<option value="">Alle</option>
						${availableOptions.workplace
							.map((wp) => `<option value="${wp}">${wp}</option>`)
							.join('')}
					</select>
				`;
				filterBar.appendChild(wrapper);
			}
		});
	}

	// Attach event listeners – use change event for selects
	filterBar.addEventListener('change', (e) => {
		if (e.target.matches('select')) {
			const filters = getCurrentFilters(filterBar);
			onFilterChange(filters);
		}
	});

	// Preselect values from config (e.g., data-category, data-region)
	if (config.category) {
		const catSelect = filterBar.querySelector('#filter-category');
		if (catSelect) catSelect.value = config.category;
	}
	if (config.region) {
		const regSelect = filterBar.querySelector('#filter-region');
		if (regSelect) regSelect.value = config.region;
	}

	return filterBar;
}