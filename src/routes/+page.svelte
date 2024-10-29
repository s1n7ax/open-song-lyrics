<script lang="ts">
	import SongDownloader from '$lib/components/ui/song-downloader/song-downloader.svelte';
	import SongSearch from '$lib/components/ui/song-search/song-search.svelte';
	import { songState } from '../state/songs.svelte';
</script>

<main class="overflow-hidden">
	{#if !songState.songs}
		<SongDownloader />
	{:else}
		<SongSearch songs={songState.songs} />
	{/if}
</main>
