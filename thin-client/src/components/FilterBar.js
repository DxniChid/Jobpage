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

function getDisplayValue(name, value) {
	if (name === 'homeOffice') {
		return value === true ? 'Ja' : 'Nein';
	}

	return String(value);
}

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

function updateAllGroupSummaries(filterBar) {
	filterBar.querySelectorAll('[data-filter-group]').forEach((group) => {
		updateGroupSummary(group);
	});
}

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

function closeAllDropdowns(filterBar, exceptGroup = null) {
	filterBar.querySelectorAll('[data-filter-group]').forEach((group) => {
		if (group !== exceptGroup) {
			group.open = false;
		}
	});
}

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

function shouldRenderSearchBar(config) {
	return config.showSearchBar !== false;
}

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
