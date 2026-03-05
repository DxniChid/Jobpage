/**
 * Creates a DOM element representing a single job.
 * @param {Object} job - Job data.
 * @returns {HTMLElement} Article element with job details.
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

// Simple escape to prevent XSS
function escapeHTML(str) {
	return String(str).replace(/[&<>"]/g, function(match) {
		if (match === '&') return '&amp;';
		if (match === '<') return '&lt;';
		if (match === '>') return '&gt;';
		if (match === '"') return '&quot;';
		return match;
	});
}