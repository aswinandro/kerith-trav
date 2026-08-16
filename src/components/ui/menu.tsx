"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const Menu = DropdownMenu.Root;
export const MenuTrigger = DropdownMenu.Trigger;
export const MenuContent = DropdownMenu.Content;
export const MenuItem = DropdownMenu.Item;

export function MenuList({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function NavMenu() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <button className="p-2 rounded hover:bg-accent">
          <span>Open</span>
        </button>
      </MenuTrigger>
      <DropdownMenu.Portal>
        <MenuContent side="left" align="end">
          <MenuList>
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </MenuList>
        </MenuContent>
      </DropdownMenu.Portal>
    </Menu>
  );
}