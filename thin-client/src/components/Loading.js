/**
 * Loading spinner component.
 * Creates a reusable loading indicator for async operations.
 *
 * @module Loading
 */

/**
 * Creates a loading spinner element.
 *
 * Generates a `<div>` containing a CSS spinner animation and a text label.
 * The element is initially hidden (`display: none`) and must be shown
 * by the parent component when loading begins.
 *
 * @function
 * @returns {HTMLElement} A `<div>` element with class `job-client-loading`,
 *	 containing a spinner and the text "Lade Stellenangebote…".
 *	 The element is hidden by default.
 *
 * @example
 * const spinner = createLoadingSpinner();
 * container.appendChild(spinner);
 * spinner.style.display = 'flex'; // Show spinner
 */
export function createLoadingSpinner() {
	const spinner = document.createElement('div');
	spinner.className = 'job-client-loading';
	spinner.innerHTML = `
		<div class="spinner"></div>
		<span>Lade Stellenangebote...</span>
	`;
	spinner.style.display = 'none'; // Hidden by default
	return spinner;
}