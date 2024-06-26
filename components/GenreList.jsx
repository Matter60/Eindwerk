import Link from "next/link";
import Image from "next/image";

export async function getGenres() {
  const response = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
  );

  if (response.ok) {
    const data = await response.json();
    return data.results;
  }

  return getGenres();
}

export async function GenreList() {
  const genres = await getGenres();
  return (
    <div className="w-56">
      <h2 className="text-xl font-bold my-4">Genres</h2>
      {genres.map((genre) => (
        <Link
          href={`/genre/${genre.id}`}
          key={genre.id}
          className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-primary-foreground p-2 rounded-lg"
        >
          <Image
            key={genre.id}
            className="w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300"
            src={genre.image_background}
            alt={genre.name}
            width={40}
            height={40}
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
