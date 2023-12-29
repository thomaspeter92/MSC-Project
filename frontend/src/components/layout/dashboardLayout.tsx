import React from "react";
import { Icons } from "../icons";
import { useLocation, Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import Notification from "../notification";

type Props = {
  children: React.ReactNode;
};

type Menu = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}[];

const MENU: Menu = [
  {
    title: "My Profile",
    href: "/profile",
    icon: "user",
  },
  {
    title: "Messages",
    href: "/messages",
    icon: "messages",
  },
  {
    title: "Connections",
    href: "/connections",
    icon: "heart",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "user",
  },
];

const DashboardLayout = ({ children }: Props) => {
  const SignOutIcon = Icons["signOut"];
  const location = useLocation();
  return (
    <main className="h-full container m-auto flex flex-col">
      {/* TOP BAR */}
      <nav className="w-full p-5 bg-white shadow-main rounded-xl flex items-center">
        <div>
          <Notification />
        </div>
      </nav>
      {/* MAIN AREA */}
      <div className="grid grid-cols-5 gap-10 mt-10 h-full">
        {/* SIDEBAR */}
        <aside className="bg-white p-5 px-5 rounded-xl shadow-main h-full flex flex-col justify-between items-start">
          <ul className="space-y-1 w-full">
            {MENU.map((d) => {
              const Icon = Icons[d.icon];
              return (
                <li
                  className={cn(
                    "flex gap-4 text-lg items-center hover:text-rose-500 px-2 py-3 rounded-lg",
                    location.pathname === d.href
                      ? "bg-rose-100 text-rose-500"
                      : ""
                  )}
                  key={d.href}
                >
                  <Icon size={25} />
                  <Link to={d.href}>{d.title}</Link>
                </li>
              );
            })}
          </ul>
          <button className="mt-auto text-gray-500 flex items-center gap-2 font-medium">
            <SignOutIcon />
            Sign Out
          </button>
        </aside>
        {/* CENTER COLUMN */}
        <section className="bg-white p-5 col-span-3">{children}</section>
        {/* RIGHT COLUMN */}
        <section className="bg-white p-5 "></section>
      </div>
    </main>
  );
};

export default DashboardLayout;
