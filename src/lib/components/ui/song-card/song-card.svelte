<script lang="ts">
	import type { Song } from '../../../../state/songs.svelte';
	import { Card } from '../card';
	import { Separator } from '../separator';

	const { song }: { song: Song } = $props();
	const topLines = $derived(song.lyrics[0].slice(0, 5));
</script>

<Card class="w-full p-2 hover:bg-slate-200">
	<div class="grid">
		<div class="grid grid-flow-col items-end justify-start gap-1">
			<h3 class="text-xl">
				{song.track_name_si}
			</h3>
			<h3 class="text-base">({song.artist_name_si})</h3>
		</div>
	</div>

	<Separator />

	{#each topLines as line}
		<p class="text-sm">{line}</p>
	{/each}
</Card>
