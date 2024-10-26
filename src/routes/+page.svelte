<script lang="ts">
	import { onMount } from 'svelte';

	interface Data {
		visited: boolean;
	}

	const { data }: { data: Data } = $props();
	let songs = $state();
	let hasDownloadedSongs = $state(false);
	onMount(() => {
		const songsBlob = localStorage.getItem('songs');
		hasDownloadedSongs = Boolean(songsBlob);

		if (hasDownloadedSongs) {
			songs = songsBlob;
		}
	});
</script>

<main class="grid place-content-center py-5">
	<h1 class="text-1xl col-span-2 text-center">Open සිංහල Lyrics</h1>
	{#if !hasDownloadedSongs}
		<p>Looks like you have not downloaded any songs</p>
	{/if}
	<p></p>
</main>
