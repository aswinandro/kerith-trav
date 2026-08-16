import * as React from "react";
import * as Menu from "@radix-ui/react-menu";

export function NavMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button className="p-2 rounded hover:bg-accent">
          <span>Open</span>
        </button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content side="left" align="end">
          <Menu.List>
            <Menu.Item>Option 1</Menu.Item>
            <Menu.Item>Option 2</Menu.Item>
            <Menu.Item>Option 3</Menu.Item>
          </Menu.List>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}