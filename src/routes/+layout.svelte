<script lang="ts">
	export const prerender = true;
	import { onMount } from 'svelte';
	import '../app.css';
	import { songState } from '../state/songs.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { SongDao } from '$lib/dao/song-dao';
	import { RefreshCcw, MoreVertical } from '@lucide/svelte';

	let { children } = $props();

	onMount(async () => {
		const songDao = new SongDao();
		const songs = await songDao.find();
		if (songs) {
			songState.songs = songs;
		}
		songState.isLoadingSongs = false;
	});
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-1 justify-items-center p-0 sm:p-3">
	<div
		class="grid w-full grid-rows-[auto_1fr] gap-3 overflow-hidden rounded-md p-3 sm:w-11/12 md:w-8/12 lg:w-7/12"
	>
		<div class="flex justify-between items-center">
			<h1 class="text-center text-3xl md:text-4xl lg:text-5xl flex-1">Open සිංහල Lyrics</h1>
			{#if !songState.isLoadingSongs && songState.songs}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-outline btn-circle">
						<MoreVertical class="w-5 h-5" />
					</div>
					<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
						<li>
							<a href="#download" class="flex items-center gap-2">
								<RefreshCcw class="w-4 h-4" />
								Refresh Songs
							</a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		{#if songState.isLoadingSongs}
			<div class="grid h-full w-full place-content-center content-center items-center">
				<Spinner />
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</div>
