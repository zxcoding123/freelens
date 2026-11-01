<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { reveal } from '$lib/motion';

	const steps = [
		{ title: 'Add a client and project', body: 'Set the rate, currency and billing type once. Freelens remembers it.' },
		{ title: 'Track your time', body: 'Press play, do the work, press stop. Every session lands on the right project.' },
		{ title: 'Invoice what is unbilled', body: 'Your dashboard shows who is ready to invoice. One click builds the invoice.' },
		{ title: 'Get paid and stay on top', body: 'Mark invoices paid, see what is overdue and watch the month add up.' }
	];

	let list = $state<HTMLDivElement>();
	let progress = $state(0);

	// How far the list has passed a line 55% down the viewport.
	function update() {
		if (!list) return;
		const r = list.getBoundingClientRect();
		progress = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height));
	}
	onMount(update);
</script>

<svelte:window onscroll={update} onresize={update} />

<section id="workflow" class="scroll-mt-20 border-t border-white/5 py-24">
	<div class="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-start">
		<div use:reveal class="lg:sticky lg:top-32">
			<p class="text-sm font-medium text-accent-400">How it works</p>
			<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">Four steps, then it runs itself</h2>
			<p class="mt-4 max-w-md text-neutral-400">
				You won't need a setup wizard or any training. Open Freelens and a short checklist walks you to your first invoice.
			</p>
			<div class="mt-8 flex items-center gap-3 text-sm text-neutral-500">
				<div class="h-1.5 w-40 overflow-hidden rounded-full bg-neutral-800">
					<div class="h-full origin-left rounded-full bg-accent-500 transition-transform duration-300" style="transform: scaleX({progress})"></div>
				</div>
				<span class="tabular">{Math.round(progress * 100)}% set up</span>
			</div>
		</div>

		<div bind:this={list} class="relative">
			<div class="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-neutral-800" aria-hidden="true">
				<div class="h-full w-full origin-top bg-gradient-to-b from-accent-400 to-accent-600" style="transform: scaleY({progress})"></div>
			</div>
			<ol class="space-y-4">
			{#each steps as s, i (s.title)}
				{@const active = progress > (i + 0.15) / steps.length}
				<li use:reveal style="--i: {i}" class="relative flex gap-4">
					<span
						class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-500 ease-spring {active
							? 'scale-110 border-accent-500 bg-accent-600 text-white shadow-[0_0_0_6px] shadow-accent-500/15'
							: 'scale-90 border-neutral-700 bg-neutral-950 text-neutral-500'}"
					>
						{#if i === steps.length - 1 && active}<Icon name="check" size={15} class="pop-in" />{:else}{i + 1}{/if}
					</span>
					<div class="card flex-1 p-5 transition-opacity duration-500 {active ? 'opacity-100' : 'opacity-50'}">
						<h3 class="font-semibold">{s.title}</h3>
						<p class="mt-1 text-sm text-neutral-400">{s.body}</p>
					</div>
				</li>
			{/each}
			</ol>
		</div>
	</div>
</section>
