"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-500">
      <ul className="flex items-center justify-between">
        <li className="">
          <NavLink href="/">Study Tracker</NavLink>
        </li>
        <li className="flex">
          {pathname=="/" || pathname == "/view-sessions" ? (
            <p className="p-4">
              <NavLink href="/create-session">Create Session</NavLink>
            </p>
          ) : undefined}
          {pathname=="/" || pathname == "/create-session" ? (
            <p className="p-4">
              <NavLink href="/view-sessions">View Sessions</NavLink>
            </p>
          ) : undefined}
        </li>
      </ul>
    </nav>
  );
}
