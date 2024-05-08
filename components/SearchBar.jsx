import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  const types = [
    {
      value: "released",
      label: "Released",
    },
    {
      value: "metacritic",
      label: "Metacritic",
    },
    {
      value: "rating",
      label: "Rating",
    },
    {
      value: "added",
      label: "Added",
    },
    {
      value: "created",
      label: "Created",
    },
    {
      value: "updated",
      label: "Updated",
    },
  ];

  return (
    <>
      <form
        action="/search"
        method="get"
        className="flex items-center space-x-2 flex-row-reverse"
      >
        <Button type="submit" className="px-3 py-2 rounded-lg">
          Search
        </Button>
        <Input
          type="text"
          name="q"
          className="px-3 py-2 w-80"
          placeholder="Search..."
        />

        <Select name="sort">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
    </>
  );
}
