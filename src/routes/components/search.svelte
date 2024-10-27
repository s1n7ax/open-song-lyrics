<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import SongCard from '$lib/components/ui/song-card/song-card.svelte';
	import type { Song } from '../../state/shared.svelte';

	const { songs }: { songs: Song[] } = $props();
	let searchQuery = $state<string>('');

	let getFilteredSongs = () =>
		searchQuery === ''
			? songs.slice(0, 10)
			: songs.filter((s) => s.track_name_en.toLowerCase().includes(searchQuery));

	let timeoutId: number;

	const onQueryChange = (
		ev: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const value = ev.currentTarget.value.trim().toLowerCase();
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			searchQuery = value;
		}, 700) as unknown as number;
	};
</script>

<div class="grid h-full grid-rows-[auto_1fr] gap-2 p-1">
	<Input on:keyup={onQueryChange} type="text" placeholder="Search" />
	<ScrollArea>
		<div class="grid gap-1">
			{#each getFilteredSongs() as song}
				<SongCard {song}></SongCard>
			{/each}
		</div>
	</ScrollArea>
</div>
