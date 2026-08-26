import Link from "next/link";
import { DASHBOARD_MENU } from "../constants";
import { LogoutButton } from "./logout-button";

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r p-6">
      <p className="mb-6 font-semibold">Kaasa Admin</p>
      <nav className="flex flex-col gap-1">
        {DASHBOARD_MENU.map((item) => (
          <Link key={item.href} href={item.href} className="rounded px-3 py-2 text-sm hover:bg-muted">
            {item.label}
          </Link>
        ))}
      </nav>
      <LogoutButton />
    </aside>
  );
}