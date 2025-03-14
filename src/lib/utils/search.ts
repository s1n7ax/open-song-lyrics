import type { Song } from '../../state/songs.svelte';

// const sinhalaLetterMap = {
// 	ක: ['ka'],
// 	ඛ: ['kha'],
// 	ග: ['ga'],
// 	ඝ: ['ga', 'gha'],
// 	ඞ: [],
// 	ඟ: ['ga', 'nga'],
// 	ච: ['cha'],
// 	ඡ: ['cha'],
// 	ජ: ['ja'],
// 	ඣ: ['ja'],
// 	ඤ: ['ja'],
// 	ඦ: ['ja'],
// 	ඥ: ['ja'],
// 	ට: ['ta'],
// 	ඨ: ['ta'],
// 	ඩ: ['da'],
// 	ඪ: ['da'],
// 	ණ: ['na'],
// 	ඬ: ['da', 'nda'],
// 	ත: ['tha', 'ta'],
// 	ථ: ['tha', 'ta'],
// 	ද: ['da'],
// 	ධ: ['dha', 'da'],
// 	න: ['na'],
// 	ඳ: ['nda', 'da'],
// 	ප: ['pa'],
// 	ඵ: ['pha', 'pa'],
// 	බ: ['ba'],
// 	භ: ['bha', 'ba'],
// 	ම: ['ma'],
// 	ඹ: ['mba', 'ba'],
// 	ය: ['ya'],
// 	ර: ['ra'],
// 	ල: ['la'],
// 	ව: ['wa'],
// 	ශ: ['sha', 'sa'],
// 	ෂ: ['sha', 'sa'],
// 	ස: ['sa'],
// 	හ: ['ha'],
// 	ළ: ['la'],
// 	ෆ: ['fa'],
// 	අං: [],
// 	අඃ: []
// } as const;

export const searchSongs = (query: string, songs: Song[]) => {
	if (query.trim() === '') {
		return songs.slice(0, 10);
	}

	return songs.filter((s) => {
		return s.track_name_en?.toLowerCase()?.includes(query.toLowerCase());
	});
};
