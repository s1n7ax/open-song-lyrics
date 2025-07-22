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
	let inputRef: HTMLInputElement;

	const onClose = () => {
		isDrawerOpened = false;
	};

	const clearSearch = () => {
		inputValue = '';
		searchQuery = '';
		inputRef?.focus();
	};

	let filteredSongs = $derived(searchSongs(searchQuery, songs));

	let timeoutId: number;
</script>

<div class="card card-border bg-base-100 grid h-full min-w-96 grid-rows-[auto_1fr] gap-2 p-5">
	<div class="grid grid-cols-[1fr_auto] gap-2">
		<input
			bind:value={inputValue}
			bind:this={inputRef}
			class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-xl sm:text-2xl md:text-3xl file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			oninput={(ev) => {
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
