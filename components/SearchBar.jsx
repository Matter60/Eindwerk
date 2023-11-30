import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Combobox from "./Combobox";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form action="/search" method="get" className="flex items-center space-x-2">
      <Combobox />
      <Input
        type="text"
        name="q"
        className="px-3 py-2 w-80"
        placeholder="Search..."
      />
      <Button type="submit" className="px-3 py-2">
        Search
      </Button>
    </form>
  );
}
