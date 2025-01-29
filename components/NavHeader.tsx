"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-700 text-slate-50">
      <ul className="flex items-stretch justify-between">
        <li className="hover:bg-slate-50 hover:text-black flex items-center">
          <NavLink href="/">Study Tracker</NavLink>
        </li>
        <li className="flex">
          {pathname == "/" || pathname == "/view-sessions" ? (
            <p className="p-4 hover:bg-slate-50 hover:text-black">
              <NavLink href="/create-session">Create Session</NavLink>
            </p>
          ) : undefined}
          {pathname == "/" || pathname == "/create-session" ? (
            <p className="p-4 hover:bg-slate-50 hover:text-black">
              <NavLink href="/view-sessions">View Sessions</NavLink>
            </p>
          ) : undefined}
        </li>
      </ul>
    </nav>
  );
}
