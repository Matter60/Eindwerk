import GenreList from "@/components/GenreList";
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-4 px-8">
        <div className="hidden md:block">
          <GenreList />
        </div>
        <div className="col-span4 md:col-span-3"></div>
      </div>
    </>
  );
}
