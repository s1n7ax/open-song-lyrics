export interface Song {
	track_id: string;
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

type SongState =
	| {
			isLoadingSongs: true;
			songs: null;
	  }
	| {
			isLoadingSongs: false;
			songs: Song[];
	  };

export const songState = $state<SongState>({
	isLoadingSongs: true,
	songs: null
});
