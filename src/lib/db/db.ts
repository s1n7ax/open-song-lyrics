import { openDB } from 'idb';

export const DB_NAME = 'open_lyrics';
export const DB_VERSION = 1;
export const FILE_TABLE = 'song_json';

export const db = async () => {
	return openDB(DB_NAME, DB_VERSION, {
		// runs if the database is created for the first time
		upgrade(db) {
			const store = db.createObjectStore(FILE_TABLE, {
				keyPath: 'id',
				autoIncrement: true
			});

			store.createIndex('id', 'id');
		}
	});
};
