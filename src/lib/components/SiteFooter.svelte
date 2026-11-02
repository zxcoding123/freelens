<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';
	import Logo from './Logo.svelte';
	import { reveal, spotlight } from '$lib/motion';

	const points: { icon: IconName; title: string; body: string }[] = [
		{ icon: 'shield', title: 'Private by default', body: 'Everything is stored in your browser. No account, no server, no tracking of your work.' },
		{ icon: 'offline', title: 'Works offline', body: 'Install it like an app on desktop or phone. It opens instantly, even with no connection.' },
		{ icon: 'download', title: 'Yours to keep', body: 'Export a full backup any time and restore it on another device in seconds.' }
	];
</script>

<section id="privacy" class="scroll-mt-20 border-t border-white/5 py-24">
	<div class="mx-auto max-w-6xl px-4 md:px-8">
		<div use:reveal use:spotlight class="card spot relative overflow-hidden p-8 md:p-12">
			<div class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 animate-pulse rounded-full bg-accent-500/15 blur-3xl [animation-duration:6s]"></div>
			<div class="relative max-w-2xl">
				<p class="text-sm font-medium text-accent-400">Local-first</p>
				<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">Your business data never leaves your device</h2>
			</div>
			<div class="relative mt-10 grid gap-8 md:grid-cols-3">
				{#each points as p, i (p.title)}
					<div use:reveal style="--i: {i + 2}" class="group">
						<span class="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-accent-400 transition-transform duration-500 ease-spring group-hover:scale-115 group-hover:rotate-6">
							<Icon name={p.icon} size={19} />
						</span>
						<h3 class="mt-4 font-semibold">{p.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-neutral-400">{p.body}</p>
					</div>
				{/each}
			</div>
		</div>

		<div use:reveal class="mt-24 text-center">
			<div class="group relative mx-auto h-16 w-16">
				<div class="absolute inset-0 animate-pulse rounded-full bg-accent-500/25 blur-xl [animation-duration:3s]"></div>
				<div class="spin-in relative">
					<Logo size={64} class="text-neutral-100 transition-transform duration-1000 ease-out-expo group-hover:rotate-180" />
				</div>
			</div>
			<h2 class="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
				Freelens is <span class="shimmer">almost here.</span>
			</h2>
			<p class="mt-3 text-neutral-400">The roadmap and launch date are coming soon.</p>
		</div>
	</div>
</section>

<footer class="border-t border-white/5">
	<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-neutral-500 sm:flex-row md:px-8">
		<a href="#top" class="group flex items-center gap-2" aria-label="Back to top">
			<Logo size={16} class="transition-transform duration-700 ease-out-expo group-hover:rotate-60" />
			<span class="font-semibold tracking-[0.18em] text-neutral-300 uppercase">Freelens</span>
		</a>
		<p>Founded, designed and built by Ahmad Pandaog Aquino</p>
		<nav class="flex items-center gap-5">
			<a href="/privacy" class="transition-colors hover:text-neutral-200">Privacy Policy</a>
			<a href="/terms" class="transition-colors hover:text-neutral-200">Terms &amp; Conditions</a>
			<span>© {new Date().getFullYear()}</span>
		</nav>
	</div>
</footer>
