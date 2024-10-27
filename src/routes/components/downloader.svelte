<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import { songState } from '../../state/shared.svelte';
	import axios from 'axios';

	let downloadProgres = $state({
		progress: 0,
		estimated: 'calculating...'
	});

	const downloadSongs = async () => {
		const res = await axios.request({
			method: 'GET',
			url: 'https://raw.githubusercontent.com/s1n7ax/sinhala-songs-corpus/refs/heads/master/lyrics.json',
			onDownloadProgress: (ev) => {
				if (ev.progress) {
					downloadProgres.progress = Math.floor(ev.progress * 100);
				}

				if (ev.estimated) {
					downloadProgres.estimated = Math.floor(ev.estimated) + ' seconds';
				}
			}
		});

		const songs = res.data;
		localStorage.setItem('songs', JSON.stringify(songs));
		songState.songs = songs;
	};
</script>

<Card class="m-2 grid w-11/12 p-3">
	<p class="py-1">Looks like you have not downloaded any songs</p>
	<p class="py-1">Click the button to download all the songs</p>
	<Button class="mt-3 place-self-center" on:click={downloadSongs}>Download</Button>
	<Progress class="mt-3" value={downloadProgres.progress} />
	<p>{downloadProgres.estimated}</p>
</Card>
