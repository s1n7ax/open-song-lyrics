<script lang="ts">
	interface Props {
		song: Song;
		open: boolean;
		onClose: () => void;
	}

	import type { Song } from '../../../../state/songs.svelte';
	import { ScrollArea } from '../scroll-area';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Copy } from '@lucide/svelte';

	let { open, onClose, song }: Props = $props();

	const copyLyrics = async () => {
		const lyricsText = song.lyrics.map(section => 
			section.join('\n')
		).join('\n\n');
		
		try {
			await navigator.clipboard.writeText(lyricsText);
		} catch (err) {
			console.error('Failed to copy lyrics:', err);
		}
	};
</script>

<AlertDialog.Root bind:open onOpenChange={onClose} closeOnOutsideClick={true}>
	<AlertDialog.Content class="grid h-svh grid-rows-[1fr_auto]">
		<AlertDialog.Header
			class="grid w-full grid-rows-[auto_1fr] justify-center gap-2 overflow-hidden"
		>
			<h2 class="text-center text-4xl">{song.track_name_si}</h2>
			<ScrollArea>
				<div class="m-6 grid gap-4 select-none">
					{#each song.lyrics as section}
						<div>
							{#each section as line}
								<p
									class="text-lg text-slate-700 transition-colors duration-1000 ease-out active:bg-yellow-300"
								>
									{line}
								</p>
							{/each}
						</div>
					{/each}
				</div>
			</ScrollArea>
		</AlertDialog.Header>
		
		<AlertDialog.Footer>
			<button 
				onclick={copyLyrics}
				class="btn btn-outline"
				title="Copy lyrics"
			>
				<Copy class="h-4 w-4 mr-2" />
				Copy
			</button>
			<AlertDialog.Cancel>Close</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
