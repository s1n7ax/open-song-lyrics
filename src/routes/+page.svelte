<script lang="ts">
	import SongDownloader from '$lib/components/ui/song-downloader/song-downloader.svelte';
	import SongSearch from '$lib/components/ui/song-search/song-search.svelte';
	import { songState } from '../state/songs.svelte';
	import { page } from '$app/stores';
	let songs = $derived(songState.songs);
</script>

<main class="overflow-hidden">
	{#if !songs || $page.url.hash === '#download'}
		<SongDownloader />
	{:else}
		<SongSearch {songs} />
	{/if}
</main>
