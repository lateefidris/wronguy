import { getLatestTracks } from 'lib/spotify';

// Metadata for the page
export const metadata = {
  title: 'Music - Artist Name',
};

// TypeScript type for a Spotify track
type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  external_urls: { spotify: string };
  preview_url: string | null;
};

// Spotify Artist ID
const artistId = '4LkVkP0pZewHBpBsgHMr9O'; // Replace with the artist's ID

const MusicPage = async () => {
  let tracks: Track[] = [];

  try {
    tracks = await getLatestTracks(artistId);
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }

  return (
    <div className="music-page">
      <div className="bg-black text-custom-1 text-center py-4 sm:py-10 ">
        <h1 className="uppercase text-3xl sm:text-6xl">Music</h1>
        <p className="text-sm sm:text-base mx-auto px-8 sm:max-w-[50%] my-10">
          I’m a paragraph. I’m a great space to write about what makes the
          products special and explain how customers can benefit from these
          items.
        </p>
      </div>
      {tracks.length ? (
        <ul className="track-list space-y-6 mt-6 flex flex-col items-center w-full">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="track-item flex flex-col space-y-2 w-2/3 max-w-5xl"
            >
              <h2 className="text-xl font-medium">{track.name}</h2>
              <p className="text-gray-600">
                {track.artists.map((artist) => artist.name).join(', ')}
              </p>
              <div className="mt-4 w-full">
                {/* Spotify Embed Player */}
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  width="100%"
                  height="80"
                  allow="encrypted-media"
                  className="rounded"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500 text-center">
          No tracks available. Please check back later.
        </p>
      )}
    </div>
  );
};

export default MusicPage;
