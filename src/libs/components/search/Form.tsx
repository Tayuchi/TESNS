'use client';

import { Search } from "@mui/icons-material";

export default function SearchForm() {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="search"
      />
      <Search/>
    </div>
  );
}
