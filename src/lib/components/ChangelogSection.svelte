<script lang="ts">
	import Icon from './Icon.svelte';
	import { changelog, type ChangelogEntry } from '$lib/changelog';
	import { reveal, spotlight } from '$lib/motion';

	const kinds: Record<ChangelogEntry['kind'], { label: string; class: string }> = {
		new: { label: 'New', class: 'border-accent-500/30 bg-accent-500/10 text-accent-400' },
		improved: { label: 'Improved', class: 'border-sky-500/30 bg-sky-500/10 text-sky-300' },
		fixed: { label: 'Fixed', class: 'border-amber-500/30 bg-amber-500/10 text-amber-300' }
	};

	const formatDate = (iso: string) =>
		new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
</script>

<section id="changelog" class="scroll-mt-20 border-t border-white/5 py-24">
	<div class="mx-auto max-w-6xl px-4 md:px-8">
		<div use:reveal class="mx-auto max-w-2xl text-center">
			<p class="text-sm font-medium text-accent-400">Changelog</p>
			<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">Built in the open, one update at a time</h2>
			<p class="mt-4 text-neutral-400">Every improvement to the app, newest first.</p>
		</div>

		<ol class="relative mx-auto mt-14 max-w-3xl space-y-6">
			{#each changelog as entry, i (entry.title)}
				<li use:reveal style="--i: {i}" class="relative grid gap-3 md:grid-cols-[9rem_1fr] md:gap-8">
					<div class="flex items-center gap-3 md:block md:pt-6 md:text-right">
						<time datetime={entry.date} class="block text-sm font-medium text-neutral-300">{formatDate(entry.date)}</time>
						{#if entry.version}
							<span class="tabular text-xs text-neutral-500 md:mt-1 md:block">v{entry.version}</span>
						{/if}
					</div>

					<article use:spotlight class="card spot group p-6 transition hover:border-neutral-700">
						<div class="flex flex-wrap items-center gap-2">
							<span class="badge border {kinds[entry.kind].class}">{kinds[entry.kind].label}</span>
							{#if i === 0}
								<span class="badge border border-white/10 bg-white/5 text-neutral-300">
									<span class="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-500"></span>
									Latest
								</span>
							{/if}
						</div>
						<h3 class="mt-3 text-lg font-semibold">{entry.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-neutral-400">{entry.summary}</p>
						<ul class="mt-4 space-y-2.5">
							{#each entry.items as item, j (j)}
								<li class="flex gap-2.5 text-sm leading-relaxed text-neutral-300">
									<span class="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400 transition-transform duration-500 ease-spring group-hover:scale-110">
										<Icon name="check" size={11} />
									</span>
									{item}
								</li>
							{/each}
						</ul>
					</article>
				</li>
			{/each}
		</ol>
	</div>
</section>
