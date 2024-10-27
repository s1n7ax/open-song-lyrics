<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/components/ui/card/card.svelte';
	import { redirect } from '@sveltejs/kit';
	import { songState } from '../../../state/shared.svelte';
	const songId = $page.params.songId;

	if (!songState.songs) redirect(302, '/');
	let song = $derived(songState.songs.find((s) => s.track_id === songId));
</script>

<main>
	{#if !song}
		<h1>Song not found</h1>
	{:else}
		<Card>
			<h1>{song.track_name_si}</h1>
		</Card>
	{/if}
</main>
