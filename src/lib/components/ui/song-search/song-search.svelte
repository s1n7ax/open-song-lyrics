<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import SongCard from '$lib/components/ui/song-card/song-card.svelte';
	import type { Song } from '../../../../state/songs.svelte';
	import SongDrawer from '../song-drawer/song-drawer.svelte';

	const { songs }: { songs: Song[] } = $props();
	let searchQuery = $state<string>('');
	let isDrawerOpened = $state<boolean>(false);
	let selectedSong: Song = $state(songs[0]);

	const onClose = () => {
		isDrawerOpened = false;
	};

	let filteredSongs = $derived(
		searchQuery === ''
			? songs.slice(0, 10)
			: songs.filter((s) => s.track_name_en.toLowerCase().includes(searchQuery))
	);

	let timeoutId: number;
</script>

<div class="grid h-full grid-rows-[auto_1fr] gap-2 p-1">
	<Input
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
	<ScrollArea>
		<div class="grid gap-1">
			{#each filteredSongs as song}
				<a
					href="/#"
					role="button"
					onclick={() => {
						selectedSong = song;
						isDrawerOpened = true;
					}}
				>
					<SongCard {song}></SongCard>
				</a>
			{/each}
		</div>
	</ScrollArea>

	<SongDrawer song={selectedSong} open={isDrawerOpened} {onClose} />
</div>
