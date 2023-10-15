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
  console.log(genres);
  return (
    <div>
      {genres.map((genre) => (
        <div className="flex gap-2 items-center"key={genre.id}>
          <img className="w-[40px] h-[25px]" src={genre.image_background} alt={genre.name} />
          <h2>{genre.name}</h2>
          
        </div>
      ))}
    </div>
  );
}

export default GenreList;
