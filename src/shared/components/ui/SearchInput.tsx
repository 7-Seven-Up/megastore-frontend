import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

import { SearchIcon } from "@shared/components/icons/SearchIcon.tsx";
import { useDebounce } from "@shared/hooks/useDebounce.ts";

interface SearchInputProps {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export function SearchInput({ onChange, defaultValue }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(defaultValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === undefined) return;
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  function handleSearch(value: string) {
    setSearchTerm(value);
  }

  return (
    <Input
      classNames={{
        base: "max-w-full w-full",
        mainWrapper: "h-full",
        input: "w-full text-lg !py-2",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="md"
      startContent={<SearchIcon />}
      type="search"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && searchTerm) {
          onChange(searchTerm);
        }
      }}
    />
  );
}
