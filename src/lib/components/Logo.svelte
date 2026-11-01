<script lang="ts">
	// The Freelens aperture mark, shared with freelens_app.
	let { size = 24, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg width={size} height={size} viewBox="96 96 168 168" class={className} aria-hidden="true">
	<circle cx="180" cy="180" r="74" fill="none" stroke="currentColor" stroke-width="10" />
	<g transform="translate(180,180)" fill="currentColor">
		{#each [0, 60, 120, 180, 240, 300] as deg (deg)}
			<rect x="-7" y="-58" width="14" height="36" rx="3" transform="rotate({deg})" />
		{/each}
	</g>
	<circle cx="180" cy="180" r="10" fill="currentColor" />
</svg>
