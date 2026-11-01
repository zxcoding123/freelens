<script lang="ts">
	import AppPreview from './AppPreview.svelte';
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';
	import { spotlight, tilt } from '$lib/motion';

	const words = ['Track', 'the', 'hours.', 'Send', 'the', 'invoice.'];

	let scrollY = $state(0);
	let progress = $state(0);
	const onscroll = () => {
		const max = document.documentElement.scrollHeight - innerHeight;
		progress = max > 0 ? scrollY / max : 0;
	};
</script>

<svelte:window bind:scrollY {onscroll} />

<header
	class="sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-500 ease-out-expo {scrollY > 8
		? 'border-white/5 bg-neutral-950/80 shadow-lg shadow-black/20'
		: 'border-transparent bg-transparent'}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
		<a href="/" class="group flex items-center gap-2.5" aria-label="Freelens home">
			<Logo size={24} class="transition-transform duration-700 ease-out-expo group-hover:rotate-60" />
			<span class="text-sm font-bold tracking-[0.18em] uppercase">Freelens</span>
		</a>
		<nav class="flex items-center gap-1">
			{#each [['#features', 'Features'], ['#workflow', 'How it works'], ['#changelog', 'Changelog'], ['#privacy', 'Privacy']] as [href, label] (href)}
				<a {href} class="btn btn-ghost hidden md:inline-flex">{label}</a>
			{/each}
			<span class="badge ml-2 border border-accent-500/30 bg-accent-500/10 text-accent-400">
				<span class="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-500"></span>
				Coming soon
			</span>
		</nav>
	</div>
	<div class="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent-600 to-accent-400" style="transform: scaleX({progress})"></div>
</header>

<section use:spotlight class="group/hero relative overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,_black,_transparent_70%)] [background-size:24px_24px] opacity-[0.07]"
	></div>
	<div
		class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/hero:opacity-100"
		style="background: radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklch, var(--color-accent-500) 9%, transparent), transparent 60%)"
	></div>

	<div class="relative mx-auto max-w-6xl px-4 pt-16 pb-20 text-center md:px-8 md:pt-24">
		<p class="rise mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-neutral-300">
			<Icon name="offline" size={13} class="text-accent-400" />
			Offline-first · No account<span class="hidden sm:inline"> · Your data stays on your device</span>
		</p>

		<h1 class="mx-auto max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
			{#each words as w, i (i)}<span class="word" style="--w: {i}">{w}</span>{' '}{/each}<span class="ink text-accent-400"
				><span class="word" style="--w: {words.length}">Get</span>{' '}<span class="word" style="--w: {words.length + 1}">paid.</span></span
			>
		</h1>

		<p class="rise mx-auto mt-6 max-w-xl text-base text-pretty text-neutral-400 md:text-lg" style="--i: 6">
			Freelens is a calm workspace for freelancers: time tracking, clients, projects, invoices and signed agreements, all in one place.
		</p>

		<div class="rise mt-9 flex flex-col justify-center gap-3 sm:flex-row" style="--i: 7">
			<a href="#features" class="group btn btn-primary btn-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10" data-umami-event="hero-features">
				See what's inside <Icon name="arrow" size={16} class="transition-transform duration-300 ease-spring group-hover:translate-x-1" />
			</a>
			<a href="#workflow" class="btn btn-secondary btn-lg hover:-translate-y-0.5" data-umami-event="hero-workflow">How it works</a>
		</div>

		<div class="land relative mx-auto mt-16 max-w-5xl">
			<div class="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 animate-pulse rounded-[3rem] bg-accent-500/10 blur-3xl [animation-duration:5s]"></div>

			<div use:tilt={3} class="tilt relative">
				<AppPreview />
			</div>

			<div class="float-chip absolute bottom-[12%] -left-16 z-10 hidden items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2.5 text-left shadow-2xl shadow-black/50 backdrop-blur xl:flex" style="--d: 1.8s">
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/15 text-accent-400"><Icon name="check" size={16} /></span>
				<span>
					<span class="block text-[13px] font-medium">INV-0039 paid</span>
					<span class="tabular block text-xs text-accent-400">+ $1,200.00</span>
				</span>
			</div>

			<div class="float-chip absolute -right-12 bottom-[22%] z-10 hidden items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2.5 text-left shadow-2xl shadow-black/50 backdrop-blur xl:flex" style="--d: 2.3s">
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-200"><Icon name="sign" size={15} /></span>
				<span>
					<span class="block text-[13px] font-medium">Agreement signed</span>
					<span class="block text-xs text-neutral-500">Northwind · Service Contract</span>
				</span>
			</div>

			<p class="mt-5 text-xs text-neutral-500">Try it: start and stop the timer, or create an invoice.</p>
		</div>
	</div>
</section>
