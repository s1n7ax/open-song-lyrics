<script lang="ts">
	import axios from 'axios';
	import { songState } from '../../../../state/songs.svelte';
	import { goto } from '$app/navigation';
	import { SongDao } from '$lib/dao/song-dao';

	let isDownloading = $state(false);
	let downloadProgres = $state({
		progress: 0,
		estimated: ''
	});

	const downloadSongs = async () => {
		const songDao = new SongDao();
		isDownloading = true;
		const res = await axios.request({
			method: 'GET',
			url: 'https://raw.githubusercontent.com/s1n7ax/sinhala-songs-corpus/refs/heads/master/lyrics.json',
			responseType: 'blob',
			onDownloadProgress: (ev) => {
				if (ev.progress) {
					downloadProgres.progress = Math.floor(ev.progress * 100);
				}

				if (ev.estimated) {
					downloadProgres.estimated = Math.floor(ev.estimated) + ' seconds';
				}
			}
		});

		const songsBlob = res.data;
		await songDao.save(songsBlob);
		songState.songs = JSON.parse(await songsBlob.text());
		goto('/');
	};
</script>

<div class="grid h-full w-full place-content-center place-items-start">
	<div class="card card-border bg-base-100 min-w-96">
		<div class="card-body m-5 p-0">
			<h2 class="card-title">Download Songs</h2>
			<p>Click the button to download/update songs</p>
			<div class="card-actions mt-3 justify-center gap-4">
				<button
					class="btn btn-neutral btn-outline hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900"
					disabled={isDownloading}
					onclick={downloadSongs}
				>
					{#if isDownloading}
						<span class="loading loading-dots loading-lg"></span>
					{/if}
					{isDownloading ? 'Downloading' : 'Download'}
				</button>

				<progress class="progress progress-neutral h-4" value={downloadProgres.progress} max="100"
				></progress>
				<p>{downloadProgres.estimated !== '' ? 'Estimation: ' + downloadProgres.estimated : ''}</p>
			</div>
		</div>
	</div>
</div>
