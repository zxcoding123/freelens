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
		date: '2026-11-03',
		kind: 'new',
		title: 'Partial payments, your logo and safer backups',
		summary:
			'Invoices can now be paid in installments, carry your branding and payment details, and your data is better protected against loss.',
		items: [
			'Record payments (amount, date, method) on sent invoices. They show "Partially paid" or "Overdue · part paid" until payments cover the total, then become paid.',
			'"Mark as paid" records the remaining balance, and removing a payment reopens a paid invoice.',
			'Outstanding, overdue and client totals use the balance due, and "Paid this month/year" counts money actually received, including part-payments.',
			'Printed invoices show Total, Paid and Balance due once anything has been paid.',
			'Add payment details in Settings to show a "How to pay" section on invoices. You can edit it per invoice.',
			'Upload your business logo in Settings. It appears on invoices and agreements.',
			'Freelens asks the browser for persistent storage, tracks your last backup date and reminds you on the dashboard after 7 days without one.',
			'Safer restore: preview a backup\'s record counts against your device and download a copy of current data before replacing it.',
			'The timer now requires a project before it can start, and the sidebar can be collapsed.'
		]
	},
	{
		date: '2026-11-01',
		kind: 'new',
		title: 'Freelens for desktop',
		summary: 'Freelens now ships as a native desktop app built with Tauri, alongside the installable web app.',
		items: [
			'App and installer icons generated from the Freelens logo.',
			'Opens centered at 1280x800 with an 800x600 minimum size.',
			'The offline service worker is disabled in desktop builds, so updates are never served from a stale cache.'
		]
	},
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
