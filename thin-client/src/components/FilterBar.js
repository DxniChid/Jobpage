/**
 * Filter bar component.
 * Builds a dynamic filter bar with category, region, and optional
 * additional filters (HomeOffice, Language, Workplace).
 *
 * @module FilterBar
 */

const FILTER_LABELS = {
	category: 'Kategorie',
	region: 'Region',
	homeOffice: 'Home Office',
	language: 'Sprache',
	workplace: 'Arbeitsort',
	searchTerm: 'Suche',
};

const FILTER_SUMMARY_LABELS = {
	category: 'Kategorien',
	region: 'Regionen',
	homeOffice: 'Optionen',
	language: 'Sprachen',
	workplace: 'Arbeitsorte',
};

/**
 * Reads current filter values from the filter bar.
 *
 * @private
 * @function
 * @param {HTMLElement} filterBar - The filter bar DOM element.
 * @returns {Object.<string, (string|Array<string>|Array<boolean>|undefined)>}
 *	 Current filter values keyed by filter name.
 */
function getCurrentFilters(filterBar) {
	const filters = {};
	const searchInput = filterBar.querySelector('input[name="searchTerm"]');
	if (searchInput) {
		const searchValue = searchInput.value.trim();
		filters.searchTerm = searchValue || undefined;
	}

	filterBar.querySelectorAll('[data-filter-group]').forEach((group) => {
		const name = group.dataset.filterGroup;
		const optionCount = Number(group.dataset.optionCount || 0);
		const selectedValues = Array.from(
			group.querySelectorAll('input[type="checkbox"]:checked'),
			(input) => normalizeFilterValue(name, input.value)
		).filter((value) => value !== undefined);

		if (selectedValues.length === 0 || (optionCount > 0 && selectedValues.length === optionCount)) {
			filters[name] = undefined;
			return;
		}

		filters[name] = selectedValues;
	});

	return filters;
}

/**
 * Normalizes a configured value by trimming it, splitting it into an array
 * using comma separators, and filtering out empty strings.
 *
 * If the value is an array, it will be mapped over to trim each entry and
 * filter out empty strings.
 *
 * If the value is a string starting with '[[', it will be attempted to be
 * parsed as JSON. If successful, the parsed array will be mapped over to
 * trim each entry and filter out empty strings. If not successful, it will
 * fall back to splitting the string using comma separators.
 *
 * @param {string|string[]|undefined} value - The value to normalize.
 * @returns {string[]}
 *	 The normalized array of values.
 */
function normalizeConfiguredValues(value) {
	if (Array.isArray(value)) {
		return value.map((entry) => String(entry).trim()).filter(Boolean);
	}

	if (typeof value !== 'string') {
		return [];
	}

	const trimmedValue = value.trim();
	if (!trimmedValue) {
		return [];
	}

	if (trimmedValue.startsWith('[')) {
		try {
			const parsedValue = JSON.parse(trimmedValue);
			if (Array.isArray(parsedValue)) {
				return parsedValue.map((entry) => String(entry).trim()).filter(Boolean);
			}
		} catch (error) {
			// Fall back to comma-separated values.
		}
	}

	return trimmedValue.split(',').map((entry) => entry.trim()).filter(Boolean);
}

/**
 * Normalizes a filter value by trimming it and converting it to a boolean
 * if the filter name is 'homeOffice'.
 *
 * If the value is not a string, it will be returned as is.
 * If the trimmed value is empty, it will be returned as undefined.
 *
 * @param {string} name - The filter name.
 * @param {string|*} value - The value to normalize.
 * @returns {string|boolean|undefined} The normalized value.
 */
function normalizeFilterValue(name, value) {
	if (typeof value !== 'string') {
		return value;
	}

	const trimmedValue = value.trim();
	if (!trimmedValue) {
		return undefined;
	}

	if (name === 'homeOffice') {
		return trimmedValue === 'true';
	}

	return trimmedValue;
}

/**
 * Returns a human-readable representation of a filter value.
 *
 * If the filter name is 'homeOffice', it will return 'Ja' if the value is true and 'Nein' if it is false.
 * For all other filter names, it will return the string representation of the value.
 * @param {string} name - The filter name.
 * @param {*} value - The value to display.
 * @returns {string} The human-readable representation of the value.
 */
function getDisplayValue(name, value) {
	if (name === 'homeOffice') {
		return value === true ? 'Ja' : 'Nein';
	}

	return String(value);
}

/**
 * Returns a human-readable summary of a filter group.
 *
 * If no values are selected, it will return 'Alle'.
 * If only one value is selected, it will return the human-readable representation of that value.
 * If multiple values are selected, it will return '{count} {label}' where {count} is the number of selected values and {label} is the human-readable label of the filter group.
 * @param {string} name - The filter name.
 * @param {Array<*>} selectedValues - The values of the filter group.
 * @returns {string} The human-readable summary of the filter group.
 */
function getSummaryText(name, selectedValues) {
	if (!selectedValues || selectedValues.length === 0) {
		return 'Alle';
	}

	if (selectedValues.length === 1) {
		return getDisplayValue(name, selectedValues[0]);
	}

	return `${selectedValues.length} ${FILTER_SUMMARY_LABELS[name] || 'ausgewaehlt'}`;
}

function updateGroupSummary(group) {
	const summaryLabel = group.querySelector('[data-filter-summary]');
	if (!summaryLabel) {
		return;
	}

	const name = group.dataset.filterGroup;
	const selectedValues = Array.from(
		group.querySelectorAll('input[type="checkbox"]:checked'),
		(input) => normalizeFilterValue(name, input.value)
	).filter((value) => value !== undefined);

	summaryLabel.textContent = getSummaryText(name, selectedValues);
}

/**
 * Updates the human-readable summaries of all filter groups in the filter bar.
 *
 * @param {HTMLElement} filterBar - The DOM element of the filter bar.
 */
function updateAllGroupSummaries(filterBar) {
	filterBar.querySelectorAll('[data-filter-group]').forEach((group) => {
		updateGroupSummary(group);
	});
}

/**
 * Clears all selected values of a filter group.
 *
 * @param {HTMLElement} filterBar - The DOM element of the filter bar.
 * @param {string} filterName - The name of the filter group to clear.
 */
function clearFilterGroup(filterBar, filterName) {
	const group = filterBar.querySelector(`[data-filter-group="${filterName}"]`);
	if (!group) {
		return;
	}

	group.querySelectorAll('input[type="checkbox"]').forEach((input) => {
		input.checked = false;
	});
	updateGroupSummary(group);
}

/**
 * Closes all dropdowns in the filter bar, except for the one specified as
 * `exceptGroup`. This is useful when a user selects a filter value and
 * we want to close all other dropdowns to prevent the user from accidentally
 * changing other filters.
 * @param {HTMLElement} filterBar - The DOM element of the filter bar.
 * @param {HTMLElement|null} exceptGroup - The group to exclude from being closed.
 */
function closeAllDropdowns(filterBar, exceptGroup = null) {
	filterBar.querySelectorAll('[data-filter-group]').forEach((group) => {
		if (group !== exceptGroup) {
			group.open = false;
		}
	});
}

/**
 * Renders active filter chips in the filter bar.
 * If no filters are active, it will hide the active filter chip container.
 * If filters are active, it will create a button for each active filter with a label
 * indicating the filter name and a value indicating the selected filter value(s).
 * Each button also has an "x" icon to remove the filter.
 * Additionally, it will create a "clear all filters" button that will clear all active filters
 * and reset the filter bar to its initial state.
 * @param {HTMLElement} filterBar - The DOM element of the filter bar.
 * @param {function} onFilterChange - Callback invoked whenever a filter value changes.
 */
function renderActiveFilterChips(filterBar, onFilterChange) {
	const chipRow = filterBar.querySelector('[data-active-filters]');
	if (!chipRow) {
		return;
	}

	const filters = getCurrentFilters(filterBar);
	const chips = [];

	['category', 'region', 'homeOffice', 'language', 'workplace'].forEach((name) => {
		if (!Array.isArray(filters[name]) || filters[name].length === 0) {
			return;
		}

		chips.push({
			label: FILTER_LABELS[name],
			value: filters[name].map((entry) => getDisplayValue(name, entry)).join(', '),
			onRemove: () => {
				clearFilterGroup(filterBar, name);
				renderActiveFilterChips(filterBar, onFilterChange);
				onFilterChange(getCurrentFilters(filterBar));
			},
		});
	});

	if (filters.searchTerm) {
		chips.push({
			label: FILTER_LABELS.searchTerm,
			value: filters.searchTerm,
			onRemove: () => {
				const searchInput = filterBar.querySelector('input[name="searchTerm"]');
				if (searchInput) {
					searchInput.value = '';
				}
				renderActiveFilterChips(filterBar, onFilterChange);
				onFilterChange(getCurrentFilters(filterBar));
			},
		});
	}

	chipRow.innerHTML = '';

	if (chips.length === 0) {
		chipRow.hidden = true;
		return;
	}

	chipRow.hidden = false;
	chips.forEach((chip) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'active-filter-chip';
		button.innerHTML = `
			<span class="active-filter-chip-label">${chip.label}</span>
			<span class="active-filter-chip-value">${chip.value}</span>
			<span class="active-filter-chip-remove" aria-hidden="true">x</span>
		`;
		button.addEventListener('click', chip.onRemove);
		chipRow.appendChild(button);
	});

	const clearButton = document.createElement('button');
	clearButton.type = 'button';
	clearButton.className = 'active-filter-chip active-filter-chip-clear';
	clearButton.innerHTML = `
		<span class="active-filter-chip-label">Alle Filter loeschen</span>
		<span class="active-filter-chip-remove" aria-hidden="true">x</span>
	`;
	clearButton.addEventListener('click', () => {
		filterBar.querySelectorAll('[data-filter-group] input[type="checkbox"]').forEach((input) => {
			input.checked = false;
		});
		const searchInput = filterBar.querySelector('input[name="searchTerm"]');
		if (searchInput) {
			searchInput.value = '';
		}
		updateAllGroupSummaries(filterBar);
		renderActiveFilterChips(filterBar, onFilterChange);
		onFilterChange(getCurrentFilters(filterBar));
	});
	chipRow.appendChild(clearButton);
}

/**
 * Returns whether the search bar should be rendered based on the configuration.
 *
 * @private
 * @param {Object} config - The widget configuration.
 * @returns {boolean} Whether the search bar should be rendered.
 */
function shouldRenderSearchBar(config) {
	return config.showSearchBar !== false;
}

/**
 * Creates a multi-select filter group with a given name, options and selected values.
 * @param {string} filterName - The name of the filter group.
 * @param {Array<{value: string, label: string}>} options - The options of the filter group.
 * @param {Array<string>} selectedValues - The selected values of the filter group.
 * @returns {HTMLElement} The created multi-select filter group element.
 */
function createMultiSelectGroup(filterName, options, selectedValues = []) {
	const wrapper = document.createElement('div');
	wrapper.className = 'filter-group';
	wrapper.innerHTML = `
		<label for="filter-${filterName}-trigger">${FILTER_LABELS[filterName]}</label>
		<details
			class="multi-select"
			data-filter-group="${filterName}"
			data-option-count="${options.length}"
		>
			<summary id="filter-${filterName}-trigger">
				<span data-filter-summary>${getSummaryText(filterName, selectedValues)}</span>
			</summary>
			<div class="multi-select-options">
				${options.map((option) => {
					const optionValue = String(option.value);
					return `
						<label class="multi-select-option">
							<input
								type="checkbox"
								value="${optionValue}"
								${selectedValues.includes(optionValue) ? 'checked' : ''}
							/>
							<span>${option.label}</span>
						</label>
					`;
				}).join('')}
			</div>
		</details>
	`;
	return wrapper;
}

/**
 * Creates the filter bar DOM element and attaches event listeners.
 *
 * @function
 * @param {Object} config - Widget configuration.
 * @param {Object} availableOptions - Possible values for static and dynamic filters.
 * @param {Function} onFilterChange - Callback invoked whenever a filter value changes.
 * @returns {HTMLElement} The fully constructed filter bar element.
 */
export function createFilterBar(config, availableOptions, onFilterChange) {
	const filterBar = document.createElement('div');
	filterBar.className = 'job-client-filterbar';
	if (config.searchBackgroundColor) {
		filterBar.style.setProperty('--job-search-bg', config.searchBackgroundColor);
	}
	if (config.searchPlaceholderColor) {
		filterBar.style.setProperty('--job-search-placeholder-color', config.searchPlaceholderColor);
	}

	const searchWrapper = document.createElement('div');
	searchWrapper.className = 'filter-group filter-group-search';
	searchWrapper.innerHTML = `
		<label for="filter-searchTerm">Suche</label>
		<input
			id="filter-searchTerm"
			name="searchTerm"
			type="search"
			placeholder="Titel, Firma, Ort, Beschreibung"
		/>
	`;

	const selectedCategories = normalizeConfiguredValues(config.category);
	const selectedRegions = normalizeConfiguredValues(config.region);

	if (shouldRenderSearchBar(config)) {
		filterBar.appendChild(searchWrapper);
	}

	filterBar.appendChild(createMultiSelectGroup(
		'category',
		(availableOptions.categories || []).map((value) => ({ value, label: value })),
		selectedCategories
	));

	filterBar.appendChild(createMultiSelectGroup(
		'region',
		(availableOptions.regions || []).map((value) => ({ value, label: value })),
		selectedRegions
	));

	if (config.filterOptions) {
		config.filterOptions.forEach((filterName) => {
			const key = filterName.toLowerCase();
			if (key === 'homeoffice') {
				filterBar.appendChild(createMultiSelectGroup(
					'homeOffice',
					[
						{ value: 'true', label: 'Ja' },
						{ value: 'false', label: 'Nein' },
					]
				));
			} else if (key === 'language' && availableOptions.language) {
				filterBar.appendChild(createMultiSelectGroup(
					'language',
					availableOptions.language.map((value) => ({ value, label: value }))
				));
			} else if (key === 'workplace' && availableOptions.workplace) {
				filterBar.appendChild(createMultiSelectGroup(
					'workplace',
					availableOptions.workplace.map((value) => ({ value, label: value }))
				));
			}
		});
	}

	const activeFiltersWrapper = document.createElement('div');
	activeFiltersWrapper.className = 'active-filter-row';
	activeFiltersWrapper.hidden = true;
	activeFiltersWrapper.setAttribute('data-active-filters', '');
	filterBar.appendChild(activeFiltersWrapper);

	filterBar.addEventListener('change', (e) => {
		if (!e.target.matches('input[type="checkbox"]')) {
			return;
		}

		const group = e.target.closest('[data-filter-group]');
		if (!group) {
			return;
		}

		updateGroupSummary(group);
		group.open = false;
		renderActiveFilterChips(filterBar, onFilterChange);
		onFilterChange(getCurrentFilters(filterBar));
	});

	filterBar.addEventListener('toggle', (e) => {
		const group = e.target;
		if (!group.matches('[data-filter-group]')) {
			return;
		}

		if (group.open) {
			closeAllDropdowns(filterBar, group);
		}
	}, true);

	document.addEventListener('pointerdown', (e) => {
		if (!filterBar.contains(e.target)) {
			closeAllDropdowns(filterBar);
		}
	}, true);

	filterBar.addEventListener('input', (e) => {
		if (e.target.matches('input[name="searchTerm"]')) {
			renderActiveFilterChips(filterBar, onFilterChange);
			onFilterChange(getCurrentFilters(filterBar));
		}
	});

	updateAllGroupSummaries(filterBar);
	renderActiveFilterChips(filterBar, onFilterChange);

	return filterBar;
}
