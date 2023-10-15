export async function getGenres() {
  const response = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
  );

  if (response.ok) {
    const data = await response.json();
    return data.results;
  }

  return [];
}

export async function GenreList() {
  const genres = await getGenres();
  return (
    <div>
      {genres.map((genre) => {
        return <div key={genre.id}>{genre.name}</div>;
      })}
    </div>
  );
}

export default GenreList;
