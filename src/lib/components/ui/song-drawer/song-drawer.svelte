<script lang="ts">
	interface Props {
		song: Song;
		open: boolean;
		onClose: () => void;
	}

	import * as Drawer from '$lib/components/ui/drawer';
	import type { Song } from '../../../../state/songs.svelte';
	import { ScrollArea } from '../scroll-area';

	let { open, onClose, song }: Props = $props();
</script>

<Drawer.Root bind:open onOpenChange={onClose}>
	<Drawer.Content class="h-svh">
		<div class="grid w-full grid-rows-[auto_1fr] justify-center gap-2 overflow-hidden">
			<h2 class="text-center text-4xl">{song.track_name_si}</h2>
			<ScrollArea>
				<div class="m-6 grid gap-4">
					{#each song.lyrics as section}
						<div>
							{#each section as line}
								<p class="text-lg text-slate-700">{line}</p>
							{/each}
						</div>
					{/each}
				</div>
			</ScrollArea>
		</div>
	</Drawer.Content>
</Drawer.Root>
