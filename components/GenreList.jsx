import Link from "next/link";

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
      <h2 className="text-[30px] font-bold">Genres</h2>
      {genres.map((genre) => (
        <Link
          href={`/genre/${genre.id}`}
          key={genre.id}
          className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg"
        >
          <img
            key={genre.id}
            className="w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300"
            src={genre.image_background}
            alt={genre.name}
          />
          <h3 className="group-hover:font-bold group-hover:scale-105 transition-all ease-out duration-300">
            {genre.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}

export default GenreList;
