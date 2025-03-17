import { db, FILE_TABLE } from '$lib/db/db';
import type { Song } from '../../state/songs.svelte';

export class SongDao {
	async save(blob: Blob) {
		const idb = await db();
		const trx = idb.transaction(FILE_TABLE, 'readwrite');
		await trx.objectStore(FILE_TABLE).clear();
		await trx.objectStore(FILE_TABLE).put({ id: 1, songs: blob });
		trx.commit();
	}

	async find(): Promise<Song[] | null> {
		const idb = await db();
		const trx = idb.transaction(FILE_TABLE, 'readwrite');
		const result = await trx.objectStore(FILE_TABLE).getAll();

		if (result.length === 0) {
			return null;
		}

		const songList = JSON.parse(await result[0].songs.text());
		await trx.done;
		return songList;
	}
}
