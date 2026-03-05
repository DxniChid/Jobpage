/**
 * Job item component.
 * Renders a single job listing as an interactive DOM element.
 *
 * @module JobItem
 */

/**
 * Escapes special HTML characters to prevent XSS attacks.
 *
 * @private
 * @function
 * @param {*} str - The input value to escape (converted to string).
 * @returns {string} Escaped string safe for insertion into HTML.
 */
function escapeHTML(str) {
	return String(str).replace(/[&<>"]/g, (match) => {
		if (match === '&') return '&amp;';
		if (match === '<') return '&lt;';
		if (match === '>') return '&gt;';
		if (match === '"') return '&quot;';
		return match;
	});
}

/**
 * Creates a DOM element representing a single job.
 *
 * Generates an `<article>` element populated with the job's title, company,
 * location, category, region, optional badges (home office, language),
 * a truncated description, and a link to the full posting.
 *
 * @function
 * @param {Object} job - Job data object.
 * @param {string} job.id - Unique identifier for the job.
 * @param {string} [job.title] - Job title (defaults to empty string).
 * @param {string} [job.company] - Company name (defaults to empty string).
 * @param {string} [job.location] - Job location (defaults to empty string).
 * @param {string} [job.category] - Professional category (defaults to empty string).
 * @param {string} [job.region] - Geographic region (defaults to empty string).
 * @param {boolean} [job.homeOffice] - Whether home office is possible.
 * @param {string} [job.language] - Main language required.
 * @param {string} [job.description] - Short job description (truncated to 200 chars).
 * @param {string} [job.url] - Link to the full job posting (defaults to '#').
 * @returns {HTMLElement} An `<article>` element with the job details.
 *
 * @example
 * const jobElement = createJobItem({
 *	 id: '123',
 *	 title: 'Frontend Developer',
 *	 company: 'BFO AG',
 *	 location: 'Bern',
 *	 category: 'IT',
 *	 region: 'BE',
 *	 homeOffice: true,
 *	 language: 'German',
 *	 description: '...',
 *	 url: 'https://jobs.bfo.ch/123'
 * });
 * container.appendChild(jobElement);
 */
// src/components/JobItem.js
export function createJobItem(job) {
    const article = document.createElement('article');
    article.className = 'job-item';

    // Datum formatieren
    const date = job.publishedAt ? new Date(job.publishedAt).toLocaleDateString('de-CH') : 'k.A.';

    article.innerHTML = `
        <div class="job-header">
            <span class="job-date">${date}</span>
            <h3 class="job-title">${escapeHTML(job.title || '')}</h3>
        </div>
        <div class="job-company">${escapeHTML(job.company || '')}</div>
        <div class="job-location">
            <i class="icon-pin"></i> ${escapeHTML(job.zip || '')} ${escapeHTML(job.location || '')} (${escapeHTML(job.region || '')})
        </div>

        <div class="job-details">
            <h4>Beschreibung</h4>
            <p>${escapeHTML(job.description || '')}</p>

            ${job.requirements ? `<h4>Anforderungen</h4><p>${escapeHTML(job.requirements)}</p>` : ''}
            ${job.benefits ? `<h4>Wir bieten</h4><p>${escapeHTML(job.benefits)}</p>` : ''}
        </div>

        <div class="job-meta">
            <span class="job-category">${escapeHTML(job.category || '')}</span>
            ${job.homeOffice ? '<span class="badge">Home Office</span>' : ''}
        </div>
        <a href="${escapeHTML(job.url || '#')}" class="job-link" target="_blank">Vollständiges Inserat</a>
    `;
    return article;
}