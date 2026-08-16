import * as React from "react";
import { Menu, MenuItem, MenuTrigger, MenuContent, MenuList } from "@/components/ui/menu";

export function NavBar() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Open menu">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 4h18M3 12h18M3 20h18" />
          </svg>
        </button>
      </MenuTrigger>
      <MenuContent align="end" side="left">
        <MenuList>
          <li>
            <a href="/" className="py-2 px-3 text-sm font-medium">Home</a>
          </li>
          <li>
            <a href="/destinations" className="py-2 px-3 text-sm font-medium">Destinations</a>
          </li>
          <li>
            <a href="/packages" className="py-2 px-3 text-sm font-medium">Packages</a>
          </li>
          <li>
            <a href="/reviews" className="py-2 px-3 text-sm font-medium">Reviews</a>
          </li>
          <li>
            <a href="/questions" className="py-2 px-3 text-sm font-medium">Questions</a>
          </li>
          <li>
            <a href="/subscribe" className="py-2 px-3 text-sm font-medium">Subscribe</a>
          </li>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}