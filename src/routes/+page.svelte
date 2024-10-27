<script lang="ts">
	import { songState } from '../state/shared.svelte';
	import Downloader from './components/downloader.svelte';
	import Search from './components/search.svelte';
</script>

<main class="overflow-hidden">
	{#if !songState.songs}
		<Downloader />
	{:else}
		<Search songs={songState.songs} />
	{/if}
</main>
