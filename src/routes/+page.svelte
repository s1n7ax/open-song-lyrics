<script lang="ts">
	import { onMount } from 'svelte';
	import { songState } from '../state/shared.svelte';
	import Downloader from './components/downloader.svelte';
	import Search from './components/search.svelte';

	onMount(() => {
		const songsBlob = localStorage.getItem('songs');
		console.log(songsBlob);

		if (songsBlob) {
			songState.songs = JSON.parse(songsBlob);
		}
	});
</script>

<main class="overflow-hidden">
	{#if !songState.songs}
		<Downloader />
	{:else}
		<Search songs={songState.songs} />
	{/if}
</main>
