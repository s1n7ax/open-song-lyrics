<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import SongCard from '$lib/components/ui/song-card/song-card.svelte';
	import type { Song } from '../../../../state/songs.svelte';
	import SongPopup from '../song-popup/song-popup.svelte';
	import { searchSongs } from '$lib/utils/search';
	import { X } from '@lucide/svelte';

	const { songs }: { songs: Song[] } = $props();
	let inputValue = $state<string>('');
	let searchQuery = $state<string>('');
	let isDrawerOpened = $state<boolean>(false);
	let selectedSong: Song = $state(songs[0]);

	const onClose = () => {
		isDrawerOpened = false;
	};

	const clearSearch = () => {
		inputValue = '';
		searchQuery = '';
	};

	let filteredSongs = $derived(searchSongs(searchQuery, songs));

	let timeoutId: number;
</script>

<div class="card card-border bg-base-100 grid h-full min-w-96 grid-rows-[auto_1fr] gap-2 p-5">
	<div class="grid grid-cols-[1fr_auto] gap-2">
		<Input
			bind:value={inputValue}
			class="text-xl sm:text-2xl md:text-3xl"
			on:input={(ev) => {
				const value = ev.currentTarget.value.trim().toLowerCase();
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					searchQuery = value;
				}, 700) as unknown as number;
			}}
			type="text"
			placeholder="Search"
		/>
		<button onclick={clearSearch} class="btn btn-outline btn-circle">
			<X class="h-5 w-5" />
		</button>
	</div>
	<ScrollArea>
		<div class="grid gap-1">
			{#each filteredSongs as song}
				<a
					href="/#"
					role="button"
					onclick={(ev) => {
						ev.preventDefault();
						selectedSong = song;
						isDrawerOpened = true;
					}}
				>
					<SongCard {song}></SongCard>
				</a>
			{/each}
		</div>
	</ScrollArea>

	<SongPopup song={selectedSong} open={isDrawerOpened} {onClose} />
</div>
