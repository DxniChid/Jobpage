/**
 * Mock job data for testing and development.
 *
 * Provides a static array of sample job listings that match the expected
 * API response format. Used as a fallback when the real API is unavailable
 * or when `useMock` mode is enabled.
 *
 * @module mockJobs
 */

/**
 * A collection of sample job objects for testing the Thin Client.
 *
 * Each job object conforms to the structure expected by the widget
 * components (`JobItem`, filter functions, etc.) and mirrors the
 * response format documented in `docs/api.md`.
 *
 * @constant {Array<Object>}
 * @property {string} id - Unique job identifier.
 * @property {string} title - Job title (German).
 * @property {string} company - Employer name.
 * @property {string} location - City of work.
 * @property {string} category - Professional category (e.g., "IT").
 * @property {string} region - Canton or region code (e.g., "BE").
 * @property {string} description - Short job description (German).
 * @property {boolean} homeOffice - Whether home office is possible.
 * @property {string} language - Main language required.
 * @property {string} workplace - Workplace type ("Remote", "Hybrid", "Vor Ort").
 * @property {string} url - Link to the full job posting.
 * @property {string} publishedAt - ISO 8601 publication date.
 *
 * @example
 * import { mockJobs } from './mockJobs.js';
 * console.log(mockJobs.length); // 6
 * console.log(mockJobs[0].title); // "Frontend-Entwickler/in"
 */
export const mockJobs = [
{
		id: '1',
		title: 'Frontend-Entwickler/in',
		company: 'BFO AG',
		location: 'Bern',
		plz: '3000',
		category: 'IT',
		canton: 'BE',
		description: 'Entwicklung moderner Webapplikationen mit React.',
		requirements: 'Erfahrung mit JavaScript und CSS.',
		benefits: 'Flexible Arbeitszeiten, modernes Büro.',
		homeOffice: true,
		language: 'Deutsch',
		workplace: 'Hybrid',
		url: 'https://jobs.bfo.ch/1',
		publishedAt: '2026-02-01'
	},
	{
		id: '2',
		title: 'Java-Entwickler/in',
		company: 'TechSolutions GmbH',
		location: 'Zürich',
		plz: '8000',
		category: 'IT',
		canton: 'ZH',
		description: 'Backend-Entwicklung mit Spring Boot. Aufbau von Microservices.',
		homeOffice: false,
		language: 'Englisch',
		workplace: 'Vor Ort',
		url: 'https://jobs.bfo.ch/2',
		publishedAt: '2026-01-28T10:30:00Z'
	},
	{
		id: '3',
		title: 'Marketing Manager/in',
		company: 'Swiss Marketing AG',
		location: 'Basel',
		plz: '4000',
		category: 'Marketing',
		canton: 'BS',
		description: 'Planung und Umsetzung von Kampagnen. Schwerpunkt Digital Marketing.',
		homeOffice: true,
		language: 'Deutsch',
		workplace: 'Remote',
		url: 'https://jobs.bfo.ch/3',
		publishedAt: '2026-02-05T09:15:00Z'
	},
	{
		id: '4',
		title: 'Projektleiter/in Bau',
		company: 'Bauplan AG',
		location: 'Sitten',
		plz: '1950',
		category: 'Bau',
		canton: 'VS',
		description: 'Leitung von Hochbauprojekten. Koordination von Subunternehmern.',
		homeOffice: false,
		language: 'Französisch',
		workplace: 'Vor Ort',
		url: 'https://jobs.bfo.ch/4',
		publishedAt: '2026-01-30T14:20:00Z'
	},
	{
		id: '5',
		title: 'HR-Assistent/in',
		company: 'PersonalPro',
		location: 'Luzern',
		plz: '6000',
		category: 'Personalwesen',
		canton: 'LU',
		description: 'Unterstützung im Recruiting und in der Personaladministration.',
		homeOffice: true,
		language: 'Deutsch',
		workplace: 'Hybrid',
		url: 'https://jobs.bfo.ch/5',
		publishedAt: '2026-02-03T11:00:00Z'
	},
	{
		id: '6',
		title: 'Sachbearbeiter/in Buchhaltung',
		company: 'Treuhand AG',
		location: 'Chur',
		plz: '7000',
		category: 'Finanzen',
		canton: 'GR',
		description: 'Debitoren- und Kreditorenbuchhaltung, Zahlungsverkehr.',
		homeOffice: false,
		language: 'Deutsch',
		workplace: 'Vor Ort',
		url: 'https://jobs.bfo.ch/6',
		publishedAt: '2026-02-02T13:45:00Z'
	}
];