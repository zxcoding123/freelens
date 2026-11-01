<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';
	import { reveal, spotlight } from '$lib/motion';

	const features: { icon: IconName; visual: string; title: string; body: string }[] = [
		{
			icon: 'clock',
			visual: 'timer',
			title: 'A timer that never gets in the way',
			body: 'Start it from any page and it keeps running in the tab title. Mark sessions billable or not, or log time by hand.'
		},
		{
			icon: 'folder',
			visual: 'billing',
			title: 'Hourly, fixed or retainer',
			body: 'Bill projects by the hour, at a fixed price split into milestones, or as a monthly retainer with included hours.'
		},
		{
			icon: 'users',
			visual: 'clients',
			title: 'Every client in one place',
			body: 'Contacts, projects, unbilled time and invoice history per client, so you always know who owes what.'
		},
		{
			icon: 'invoice',
			visual: 'invoice',
			title: 'Invoices from your hours',
			body: 'Turn unbilled time into an invoice in a click. Tax, payment terms and numbering are automatic, and every invoice is ready to print or save as PDF.'
		},
		{
			icon: 'sign',
			visual: 'sign',
			title: 'Agreements, signed on screen',
			body: 'Start from a Service Contract, NDA, Statement of Work or Memorandum of Agreement, then sign it right on the screen.'
		},
		{
			icon: 'coins',
			visual: 'currency',
			title: 'Any currency',
			body: 'Set a currency per client. Totals for unbilled, outstanding and paid amounts stay separate for each currency.'
		}
	];

	const billing = ['Hourly', 'Fixed', 'Retainer'];
	const currencies = [
		{ symbol: '$', code: 'USD', amount: '1,200.00' },
		{ symbol: '€', code: 'EUR', amount: '1,105.00' },
		{ symbol: '£', code: 'GBP', amount: '948.00' },
		{ symbol: '¥', code: 'JPY', amount: '178,400' },
		{ symbol: '₱', code: 'PHP', amount: '68,500.00' }
	];
	const clients = [
		['NW', 'bg-sky-500/20 text-sky-300'],
		['LL', 'bg-accent-500/20 text-accent-400'],
		['AC', 'bg-amber-500/20 text-amber-300'],
		['RS', 'bg-rose-500/20 text-rose-300']
	];

	let t = $state(0);
	$effect(() => {
		const i = setInterval(() => t++, 1000);
		return () => clearInterval(i);
	});

	const pad = (n: number) => String(n).padStart(2, '0');
	const clock = (s: number) => `${Math.floor(s / 3600)}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
</script>

<section id="features" class="scroll-mt-20 border-t border-white/5 py-24">
	<div class="mx-auto max-w-6xl px-4 md:px-8">
		<div use:reveal class="mx-auto max-w-2xl text-center">
			<p class="text-sm font-medium text-accent-400">Everything a freelancer needs</p>
			<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">From first hour to final payment</h2>
			<p class="mt-4 text-neutral-400">The whole job, from tracking to getting paid, without a pile of separate tools.</p>
		</div>

		<div class="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f, i (f.title)}
				<article
					use:reveal
					use:spotlight
					style="--i: {i % 3}"
					class="card spot group p-6 hover:-translate-y-1 hover:border-neutral-700"
				>
					<div class="mb-5 flex h-24 items-center justify-center overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60">
						{#if f.visual === 'timer'}
							<div class="flex items-center gap-2.5 rounded-xl border border-accent-500/50 bg-neutral-900 py-1.5 pr-1.5 pl-3 shadow-[0_0_0_4px] shadow-accent-500/10">
								<span class="h-2 w-2 animate-pulse-dot rounded-full bg-accent-500"></span>
								<span class="tabular w-16 text-sm font-semibold text-accent-400">{clock(2533 + t)}</span>
								<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white"><Icon name="stop" size={11} /></span>
							</div>
						{:else if f.visual === 'billing'}
							<div class="relative grid w-full max-w-[15rem] grid-cols-3 rounded-lg bg-neutral-800/70 p-1 text-center text-xs font-medium">
								<span
									class="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-md bg-neutral-950 shadow-sm transition-transform duration-500 ease-spring"
									style="transform: translateX({(Math.floor(t / 2) % 3) * 100}%)"
								></span>
								{#each billing as b, j (b)}
									<span class="relative py-1.5 transition-colors duration-300 {Math.floor(t / 2) % 3 === j ? 'text-white' : 'text-neutral-500'}">{b}</span>
								{/each}
							</div>
						{:else if f.visual === 'clients'}
							<div class="flex items-center">
								{#each clients as [initials, color], j (initials)}
									<span
										class="avatar -ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-950 text-xs font-semibold first:ml-0 {color}"
										style="--n: {j}">{initials}</span
									>
								{/each}
								<span class="avatar -ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-950 bg-neutral-800 text-xs text-neutral-400" style="--n: 4">+12</span>
							</div>
						{:else if f.visual === 'invoice'}
							<div class="w-full max-w-[14rem] space-y-1.5 px-2">
								{#each [72, 48, 60] as w, j (j)}
									<div class="flex items-center gap-3">
										<span class="grow-x h-1.5 rounded-full bg-neutral-700" style="width: {w}%; --i: {j}"></span>
										<span class="ml-auto h-1.5 w-8 rounded-full bg-neutral-800"></span>
									</div>
								{/each}
								<div class="after-draw flex justify-between border-t border-neutral-800 pt-1.5 text-[11px]">
									<span class="text-neutral-500">Total</span>
									<span class="tabular font-semibold text-accent-400">$2,450.00</span>
								</div>
							</div>
						{:else if f.visual === 'sign'}
							<div class="relative w-full max-w-[13rem]">
								<svg viewBox="0 0 150 44" class="h-12 w-full" fill="none" aria-hidden="true">
									<path
										class="draw"
										d="M6 32c8-18 16-26 20-20s-6 24 2 20 10-22 18-18-4 18 4 16 8-14 14-12 2 12 8 11 10-8 16-10 4 8 10 7 16-6 24-9 14-2 22-3"
										stroke="var(--color-accent-400)"
										stroke-width="2.2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<div class="border-t border-dashed border-neutral-700"></div>
								<span class="after-draw badge absolute -top-1 right-0 bg-accent-500/15 text-[10px] text-accent-400"><Icon name="check" size={10} /> Signed</span>
							</div>
						{:else if f.visual === 'currency'}
							{@const c = t % currencies.length}
							<div class="flex items-center gap-2">
								<div class="h-10 overflow-hidden">
									<div class="transition-transform duration-700 ease-spring" style="transform: translateY({-c * 2.5}rem)">
										{#each currencies as cur (cur.code)}
											<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 text-lg font-semibold text-accent-400">{cur.symbol}</div>
										{/each}
									</div>
								</div>
								<div class="text-left">
									<div class="tabular text-lg font-semibold">{currencies[c].amount}</div>
									<div class="text-[11px] tracking-wider text-neutral-500">{currencies[c].code}</div>
								</div>
							</div>
						{/if}
					</div>

					<div class="mb-3 flex items-center gap-2.5">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-accent-400 transition-transform duration-500 ease-spring group-hover:scale-115 group-hover:-rotate-8">
							<Icon name={f.icon} size={16} />
						</span>
						<h3 class="font-semibold">{f.title}</h3>
					</div>
					<p class="text-sm leading-relaxed text-neutral-400">{f.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
