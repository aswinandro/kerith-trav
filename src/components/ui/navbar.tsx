import Link from "next/link";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuList,
} from "@/components/ui/menu";

const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/#packages" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Questions", href: "/#faq" },
  { label: "Subscribe", href: "/#subscribe" },
];

export function NavBar() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-md p-2 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4h18M3 12h18M3 20h18" />
          </svg>
        </button>
      </MenuTrigger>
      <MenuContent align="end" side="left">
        <MenuList>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
