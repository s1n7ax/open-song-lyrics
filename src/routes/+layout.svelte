<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { songState } from '../state/shared.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	let { children } = $props();

	onMount(() => {
		const songsStr = localStorage.getItem('songs');
		if (songsStr) {
			songState.songs = JSON.parse(songsStr);
		}
		songState.isLoadingSongs = false;
	});
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-1 justify-items-center p-3">
	<div
		class="grid w-11/12 grid-rows-[auto_1fr] gap-3 overflow-hidden rounded-md bg-slate-100 p-3 md:w-8/12 lg:w-7/12"
	>
		<h1 class="text-center text-3xl md:text-4xl lg:text-5xl">Open සිංහල Lyrics</h1>
		{#if songState.isLoadingSongs}
			<div class="grid h-full w-full place-content-center content-center items-center">
				<Spinner />
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</div>
