export interface Song {
	track_id: number;
	track_name_en: string;
	track_name_si: string;
	track_rating: number;
	album_name_en: string;
	album_name_si: string;
	artist_name_en: string;
	artist_name_si: string;
	artist_rating: string;
	lyrics: string[][];
}

export interface SongState {
	songs: Song[] | null;
}

export const songState = $state<SongState>({
	songs: null
});
