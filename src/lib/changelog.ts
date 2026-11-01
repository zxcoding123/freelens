// Release notes for freelens_app, newest first. Add a new entry at the top for each release.
export type ChangelogEntry = {
	date: string;
	version?: string;
	kind: 'new' | 'improved' | 'fixed';
	title: string;
	summary: string;
	items: string[];
};

export const changelog: ChangelogEntry[] = [
	{
		date: '2026-11-01',
		kind: 'improved',
		title: 'Jump straight to unfilled placeholders',
		summary:
			'Agreements already showed how many [placeholders] were left to fill, but there was no quick way to reach them. Now there is.',
		items: [
			'The placeholder banner has Previous and Go to next buttons. They open "Edit clauses", scroll to the clause and select the placeholder so you can type over it.',
			'Click any highlighted placeholder in "Preview & sign" to jump to it the same way.',
			'Go to next continues from the last placeholder you visited, so filling one in never makes you skip the next.',
			'The buttons wrap around at the ends and hide once the agreement is signed. Printed copies are unchanged.'
		]
	},
	{
		date: '2026-11-01',
		version: '0.1.0',
		kind: 'new',
		title: 'First build of Freelens',
		summary: 'The first working version of the app, with everything a freelancer needs from first hour to final payment.',
		items: [
			'Dashboard with this week\'s hours, unbilled and outstanding amounts, overdue invoices and who is ready to invoice.',
			'An always-on timer in the top bar, plus manual time entries and billable tracking.',
			'Clients and projects billed hourly, at a fixed price with milestones, or as a monthly retainer.',
			'Invoices built from unbilled time, with tax, payment terms, automatic numbering and print-ready layouts.',
			'Agreements from four templates (Service Contract, NDA, Statement of Work, Memorandum of Agreement) with on-screen signatures.',
			'Per-client currencies, light and dark themes, a demo workspace, and JSON backup export and import.',
			'Installable as an app and works fully offline. All data stays on your device.'
		]
	}
];
