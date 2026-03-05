// src/api/mockJobs.js
export const mockJobs = [
{
        id: '1',
        title: 'Frontend-Entwickler/in',
        company: 'BFO AG',
        location: 'Bern',
        plz: '3000', // Neu
		category: 'IT',
        canton: 'BE', // Kanton
        description: 'Entwicklung moderner Webapplikationen mit React.', 
        requirements: 'Erfahrung mit JavaScript und CSS.', // Neu
        benefits: 'Flexible Arbeitszeiten, modernes Büro.', // Neu
        homeOffice: true,
        language: 'Deutsch',
        workplace: 'Hybrid',
        url: 'https://jobs.bfo.ch/1',
        publishedAt: '2026-02-01' // Datum der Ausstellung
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