// TypeScript types for Spotify responses
type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { id: string; name: string };
  external_urls: { spotify: string };
  preview_url: string | null;
  releaseDate?: string; // Added releaseDate for sorting
};

type SpotifyTopTracksResponse = {
  tracks: SpotifyTrack[];
};

// Spotify API credentials from environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

// Fetch Spotify access token
const getSpotifyAccessToken = async (): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify access token.');
  }

  const data: SpotifyAccessTokenResponse = await response.json();
  return data.access_token;
};

// Fetch album details to get the release date
const getAlbumDetails = async (albumId: string, accessToken: string): Promise<string> => {
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch album details for albumId: ${albumId}`);
  }

  const albumData = await response.json();
  return albumData.release_date; // Return the release date
};

// Fetch artist's top tracks and include release dates
export const getLatestTracks = async (artistId: string): Promise<SpotifyTrack[]> => {
  const accessToken = await getSpotifyAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tracks from Spotify.');
  }

  const data: SpotifyTopTracksResponse = await response.json();

  // Fetch release dates for each track's album
  const tracksWithReleaseDates = await Promise.all(
    data.tracks.map(async (track) => {
      const releaseDate = await getAlbumDetails(track.album.id, accessToken);
      return { ...track, releaseDate }; // Add release date to each track
    })
  );

  // Sort tracks by release date (most recent first)
  return tracksWithReleaseDates.sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1));
};
