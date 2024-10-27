<script lang="ts">
	import type { Song } from '../../../../state/shared.svelte';
	import { Card } from '../card';

	const { song }: { song: Song } = $props();
	const firstFiveLines: string[] = [];

	for (let i = 0; i < song.lyrics[0].length && i < 5; i++) {
		firstFiveLines.push(song.lyrics[0][i]);
	}
</script>

<Card class="w-full p-2">
	<h3 class="text-sm font-semibold">{song.track_name_si}</h3>
	<h4 class="text-xs font-semibold">{song.artist_name_si}</h4>
	{#each firstFiveLines as line}
		<p class="text-xs">{line}</p>
	{/each}
</Card>
