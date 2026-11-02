<script lang="ts">
	import type { Snippet } from 'svelte';
	import Logo from './Logo.svelte';

	let { title, updated, children }: { title: string; updated: string; children: Snippet } = $props();
</script>

<svelte:head><title>{title} · Freelens</title></svelte:head>

<header class="border-b border-white/5">
	<div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 md:px-8">
		<a href="/" class="group flex items-center gap-2.5" aria-label="Freelens home">
			<Logo size={24} class="transition-transform duration-700 ease-out-expo group-hover:rotate-60" />
			<span class="text-sm font-bold tracking-[0.18em] uppercase">Freelens</span>
		</a>
		<a href="/" class="btn btn-ghost">Back to home</a>
	</div>
</header>

<main class="mx-auto max-w-3xl px-4 py-16 md:px-8">
	<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
	<p class="mt-3 text-sm text-neutral-500">Last updated: {updated}</p>
	<div class="legal mt-10 space-y-10 text-neutral-400">
		{@render children()}
	</div>
</main>

<footer class="border-t border-white/5">
	<div class="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-8 text-sm text-neutral-500 md:px-8">
		<p>© {new Date().getFullYear()} Freelens</p>
		<nav class="flex gap-5">
			<a href="/privacy" class="transition-colors hover:text-neutral-200">Privacy Policy</a>
			<a href="/terms" class="transition-colors hover:text-neutral-200">Terms &amp; Conditions</a>
		</nav>
	</div>
</footer>

<style>
	.legal :global(h2) {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-neutral-100);
		margin-bottom: 0.75rem;
	}
	.legal :global(p),
	.legal :global(li) {
		line-height: 1.7;
	}
	.legal :global(p + p),
	.legal :global(p + ul),
	.legal :global(ul + p) {
		margin-top: 0.75rem;
	}
	.legal :global(ul) {
		list-style: disc;
		padding-left: 1.25rem;
	}
	.legal :global(strong) {
		color: var(--color-neutral-200);
		font-weight: 600;
	}
</style>
