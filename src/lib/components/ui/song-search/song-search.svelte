<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import SongCard from '$lib/components/ui/song-card/song-card.svelte';
	import type { Song } from '../../../../state/songs.svelte';
	import SongPopup from '../song-popup/song-popup.svelte';
	import { searchSongs } from '$lib/utils/search';
	import { RefreshCcw } from '@lucide/svelte';

	const { songs }: { songs: Song[] } = $props();
	let searchQuery = $state<string>('');
	let isDrawerOpened = $state<boolean>(false);
	let selectedSong: Song = $state(songs[0]);

	const onClose = () => {
		isDrawerOpened = false;
	};

	let filteredSongs = $derived(searchSongs(searchQuery, songs));

	let timeoutId: number;
</script>

<div class="grid h-full grid-rows-[auto_1fr] gap-2 p-1">
	<div class="grid grid-cols-[1fr_auto]">
		<Input
			class="text-xl sm:text-2xl md:text-3xl"
			on:keyup={(ev) => {
				const value = ev.currentTarget.value.trim().toLowerCase();
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					searchQuery = value;
				}, 700) as unknown as number;
			}}
			type="text"
			placeholder="Search"
		/>
		<a href="#download" class="p-2">
			<RefreshCcw class="accent-indigo-100" />
		</a>
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
