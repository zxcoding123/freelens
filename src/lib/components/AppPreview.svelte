<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut, backOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { burst, prefersReducedMotion } from '$lib/motion';
	import Icon, { type IconName } from './Icon.svelte';
	import Logo from './Logo.svelte';

	type Entry = { id: number; description: string; project: string; ms: number; when: string };

	const nav: { label: string; icon: IconName }[] = [
		{ label: 'Dashboard', icon: 'dashboard' },
		{ label: 'Time', icon: 'clock' },
		{ label: 'Projects', icon: 'folder' },
		{ label: 'Clients', icon: 'users' },
		{ label: 'Invoices', icon: 'invoice' },
		{ label: 'Agreements', icon: 'sign' }
	];

	const HOUR = 3_600_000;
	const MIN = 60_000;

	let nextId = 4;
	let nextInvoice = 42;
	let description = $state('Homepage redesign');
	let project = $state('Lumen Labs · Website');
	let startedAt = $state<number | null>(Date.now() - (1 * HOUR + 24 * MIN + 7_000));
	let now = $state(Date.now());
	let weekMs = 18 * HOUR + 40 * MIN;
	let unbilled = 2450;
	let outstanding = 3800;
	let weekFlash = $state(0);
	let toast = $state<{ id: number; text: string } | null>(null);
	let entries = $state<Entry[]>([
		{ id: 1, description: 'Brand workshop', project: 'Northwind · Identity', ms: 2 * HOUR + 15 * MIN, when: 'Today' },
		{ id: 2, description: 'API integration', project: 'Atlas Coffee · App', ms: 3 * HOUR + 5 * MIN, when: 'Yesterday' },
		{ id: 3, description: 'Design review', project: 'Lumen Labs · Website', ms: 50 * MIN, when: 'Yesterday' }
	]);
	let ready = $state([
		{ client: 'Lumen Labs', amount: 1600, sent: false },
		{ client: 'Northwind Co.', amount: 850, sent: false }
	]);

	const count = { duration: 1400, easing: cubicOut };
	const weekT = new Tween(0, count);
	const unbilledT = new Tween(0, count);
	const outstandingT = new Tween(0, count);

	onMount(() => {
		const opts = prefersReducedMotion() ? { duration: 0 } : { delay: 900 };
		weekT.set(weekMs, opts);
		unbilledT.set(unbilled, opts);
		outstandingT.set(outstanding, opts);
	});

	$effect(() => {
		if (startedAt === null) return;
		now = Date.now();
		const i = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(i);
	});

	let toastTimer: ReturnType<typeof setTimeout>;
	function notify(text: string) {
		toast = { id: Date.now(), text };
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = null), 2400);
	}

	const pad = (n: number) => String(n).padStart(2, '0');
	const clock = (ms: number) => {
		const s = Math.floor(ms / 1000);
		return `${Math.floor(s / 3600)}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
	};
	const duration = (ms: number) => {
		const m = Math.round(ms / MIN);
		return `${Math.floor(m / 60)}h ${pad(m % 60)}m`;
	};
	const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

	const running = $derived(startedAt !== null);
	const elapsed = $derived(startedAt === null ? 0 : Math.max(0, now - startedAt));

	function toggle(e: SubmitEvent) {
		e.preventDefault();
		if (startedAt === null) {
			startedAt = Date.now();
			notify('Timer started');
			return;
		}
		const ms = Math.max(elapsed, MIN);
		entries = [{ id: nextId++, description: description.trim() || 'Untitled session', project, ms, when: 'Just now' }, ...entries].slice(0, 4);
		weekMs += ms;
		// The running time already shows in the total, so fold it in without re-counting.
		weekT.set(weekMs, { duration: 0 });
		startedAt = null;
		weekFlash++;
		notify(`Saved ${duration(ms)} to ${project.split(' · ')[0]}`);
	}

	function invoice(e: MouseEvent, row: (typeof ready)[number]) {
		burst(e);
		row.sent = true;
		unbilled -= row.amount;
		outstanding += row.amount;
		unbilledT.set(unbilled, { duration: 800 });
		outstandingT.set(outstanding, { duration: 800 });
		notify(`Invoice INV-00${nextInvoice++} created for ${row.client}`);
	}
</script>

<div class="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60 ring-1 ring-white/5">
	<!-- window chrome -->
	<div class="flex items-center gap-2 border-b border-neutral-800/80 bg-neutral-900/60 px-4 py-2.5">
		<span class="h-2.5 w-2.5 rounded-full bg-neutral-700 transition-colors hover:bg-red-400"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-neutral-700 transition-colors hover:bg-amber-400"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-neutral-700 transition-colors hover:bg-accent-400"></span>
		<span class="tabular ml-3 hidden truncate rounded-md bg-neutral-800/70 px-3 py-0.5 text-[11px] text-neutral-500 sm:block">
			{running ? `${clock(elapsed)} · ${project.split(' · ')[0]}` : 'Freelens'}
		</span>
	</div>

	<div class="flex text-left">
		<!-- sidebar -->
		<aside class="hidden w-48 shrink-0 flex-col border-r border-neutral-800/70 bg-neutral-900/50 px-2.5 py-4 md:flex">
			<div class="group mb-6 flex items-center gap-2 px-2">
				<Logo size={20} class="transition-transform duration-700 ease-out-expo group-hover:rotate-60" />
				<span class="text-xs font-bold tracking-[0.18em] uppercase">Freelens</span>
			</div>
			<nav class="flex flex-col gap-0.5">
				{#each nav as item, i (item.label)}
					<span
						class="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors {i === 0
							? 'border border-neutral-700/60 bg-neutral-800 text-white'
							: 'border border-transparent text-neutral-500 hover:bg-white/[0.03] hover:text-neutral-300'}"
					>
						<Icon name={item.icon} size={15} class="transition-transform duration-300 ease-spring group-hover:scale-115 {i === 0 ? 'text-accent-400' : ''}" />
						{item.label}
					</span>
				{/each}
			</nav>
		</aside>

		<div class="min-w-0 flex-1">
			<!-- timer bar -->
			<div class="border-b border-neutral-800/60 px-3 py-2.5 sm:px-5">
				<form
					onsubmit={toggle}
					class="flex items-center gap-2 rounded-xl border bg-neutral-900 p-1 transition-all duration-500 ease-out-expo {running
						? 'border-accent-500/60 shadow-[0_0_0_4px] shadow-accent-500/15'
						: 'border-neutral-800'}"
				>
					<input
						bind:value={description}
						aria-label="Timer description"
						placeholder="What are you working on?"
						class="h-8 min-w-0 flex-1 border-0 bg-transparent px-2 text-[13px] text-neutral-100 placeholder:text-neutral-500 focus:ring-0"
					/>
					<select
						bind:value={project}
						aria-label="Project"
						class="hidden h-8 rounded-lg border-0 bg-neutral-800 py-0 pr-8 pl-2.5 text-[12px] text-neutral-300 focus:ring-0 sm:block"
					>
						<option>Lumen Labs · Website</option>
						<option>Northwind · Identity</option>
						<option>Atlas Coffee · App</option>
					</select>
					{#if running}
						<span class="pop-in flex items-center gap-2 pl-1">
							<span class="h-2 w-2 animate-pulse-dot rounded-full bg-accent-500"></span>
							<span class="tabular w-[3.9rem] text-[13px] font-semibold text-accent-400">{clock(elapsed)}</span>
						</span>
					{/if}
					{#key running}
						<button
							type="submit"
							onclick={(e) => burst(e)}
							data-umami-event={running ? 'preview-timer-stop' : 'preview-timer-start'}
							aria-label={running ? 'Stop timer' : 'Start timer'}
							class="pop-in flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white shadow-md transition hover:scale-110 active:scale-90 {running
								? 'bg-red-500 shadow-red-500/30 hover:bg-red-600'
								: 'bg-accent-600 shadow-accent-600/30 hover:bg-accent-700'}"
						>
							<Icon name={running ? 'stop' : 'play'} size={running ? 13 : 14} />
						</button>
					{/key}
				</form>
			</div>

			<div class="space-y-4 p-3 sm:p-5">
				<div>
					<div class="text-lg font-semibold tracking-tight">Good afternoon, Alex</div>
					<div class="text-xs text-neutral-500">Here's where your week stands</div>
				</div>

				<div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
					{#key weekFlash}
						<div class="card p-3 {weekFlash ? 'ring-flash' : ''}">
							<div class="text-[10px] font-medium text-neutral-500 uppercase">This week</div>
							<div class="tabular mt-0.5 text-lg font-semibold tracking-tight">{duration(weekT.current + elapsed)}</div>
							<div class="text-[11px] text-neutral-500">mostly billable</div>
						</div>
					{/key}
					<div class="card p-3">
						<div class="text-[10px] font-medium text-neutral-500 uppercase">Unbilled</div>
						<div class="tabular mt-0.5 text-lg font-semibold tracking-tight text-accent-400">{usd(unbilledT.current)}</div>
						<div class="text-[11px] text-neutral-500">Ready to invoice</div>
					</div>
					<div class="card p-3">
						<div class="text-[10px] font-medium text-neutral-500 uppercase">Outstanding</div>
						<div class="tabular mt-0.5 text-lg font-semibold tracking-tight">{usd(outstandingT.current)}</div>
						<div class="text-[11px] text-red-400">1 overdue</div>
					</div>
					<div class="card p-3">
						<div class="text-[10px] font-medium text-neutral-500 uppercase">Paid this month</div>
						<div class="tabular mt-0.5 text-lg font-semibold tracking-tight">€1,920 · $5,120</div>
						<div class="text-[11px] text-neutral-500">2 currencies</div>
					</div>
				</div>

				<div class="grid gap-4 lg:grid-cols-5">
					<section class="lg:col-span-3">
						<div class="mb-2 text-[13px] font-semibold">Recent time</div>
						<ul class="card divide-y divide-neutral-800">
							{#each entries as e (e.id)}
								<li class="flex items-center justify-between gap-3 px-3 py-2.5 text-[13px] transition-colors hover:bg-white/[0.02] {e.id >= 4 ? 'pop-in' : ''}">
									<span class="min-w-0">
										<span class="block truncate font-medium">{e.description}</span>
										<span class="block truncate text-[11px] text-neutral-500">{e.project} · {e.when}</span>
									</span>
									<span class="tabular shrink-0 text-neutral-300">{duration(e.ms)}</span>
								</li>
							{/each}
						</ul>
					</section>
					<section class="hidden sm:block lg:col-span-2">
						<div class="mb-2 text-[13px] font-semibold">Ready to invoice</div>
						<ul class="card divide-y divide-neutral-800">
							{#each ready as row (row.client)}
								<li class="flex items-center justify-between gap-2 px-3 py-2.5 text-[13px]">
									<span class="truncate font-medium transition-colors {row.sent ? 'text-neutral-500' : ''}">{row.client}</span>
									<span class="flex items-center gap-2">
										<span class="tabular transition-colors {row.sent ? 'text-neutral-600 line-through' : 'text-neutral-300'}">{usd(row.amount)}</span>
										{#if row.sent}
											<span class="pop-in badge bg-accent-500/15 text-[11px] text-accent-400"><Icon name="check" size={11} /> Sent</span>
										{:else}
											<button
												type="button"
												onclick={(e) => invoice(e, row)}
												data-umami-event="preview-invoice"
												class="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-700 px-2 py-1 text-[11px] transition hover:border-accent-500/60 hover:bg-accent-500/10 hover:text-accent-400 active:scale-90"
											>
												<Icon name="plus" size={11} /> Invoice
											</button>
										{/if}
									</span>
								</li>
							{/each}
						</ul>
					</section>
				</div>
			</div>
		</div>
	</div>

	{#if toast}
		{#key toast.id}
			<div
				in:fly={{ y: 16, duration: 450, easing: backOut }}
				out:fade={{ duration: 180 }}
				role="status"
				class="absolute right-3 bottom-3 flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/95 px-3 py-2 text-[12px] text-neutral-200 shadow-xl shadow-black/40 backdrop-blur"
			>
				<span class="flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-neutral-950"><Icon name="check" size={10} /></span>
				{toast.text}
			</div>
		{/key}
	{/if}
</div>
