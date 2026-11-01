<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { reveal, prefersReducedMotion } from '$lib/motion';

	const stats = [
		{ n: 6, label: 'tools in one app' },
		{ n: 4, label: 'contract templates' },
		{ n: 3, label: 'ways to bill a project' },
		{ n: 0, label: 'accounts or servers needed' }
	].map((s) => ({ ...s, value: new Tween(s.n === 0 ? 9 : 0, { duration: 1300, easing: cubicOut }) }));

	const show = () => {
		const reduced = prefersReducedMotion();
		stats.forEach((s, i) => s.value.set(s.n, reduced ? { duration: 0 } : { delay: 150 + i * 140 }));
	};
</script>

<section class="border-t border-white/5">
	<div use:reveal={show} class="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-14 md:grid-cols-4 md:px-8">
		{#each stats as s (s.label)}
			<div class="text-center">
				<div class="tabular bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
					{Math.round(s.value.current)}
				</div>
				<div class="mt-1 text-sm text-neutral-500">{s.label}</div>
			</div>
		{/each}
	</div>
</section>
