export interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  primaryGenreName: string;
  trackTimeMillis: number;
}

export interface SearchResponse {
  resultCount: number;
  results: Track[];
}
