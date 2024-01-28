import React from 'react';
import { Icons } from '../icons';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Notification from '../notification';
import Button from '../button';
import TextInput from '../textInput';
import RecentChats from '../recentChats';
import RecentConnections from '../recentConnections';
import { useUserStore } from '../../stores/userStore';

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
    title: 'My Profile',
    href: '/profile',
    icon: 'user',
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: 'messages',
  },
  {
    title: 'Connections',
    href: '/connections',
    icon: 'heart',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'user',
  },
];

const DashboardLayout = ({ children }: Props) => {
  const [signOut] = useUserStore((state) => [state.signOut]);
  const SignOutIcon = Icons['signOut'];
  const location = useLocation();
  return (
    <div className="flex flex-col m-auto p-5 px-20 h-screen max-w-[1800px]">
      {/* TOP BAR */}
      <nav className="w-full p-5 bg-white shadow-main rounded-xl flex items-center justify-between">
        <h4>Logo</h4>
        <div className="flex items-center gap-5">
          <Button icon="verify">Get Verified</Button>
          <Notification />
        </div>
      </nav>
      {/* MAIN AREA */}
      <main className="flex flex-grow overflow-auto gap-10 mt-10">
        {/* SIDEBAR */}
        <aside className="w-[250px] sticky top-0 h-full">
          <div className="h-full bg-white shrink-0 p-5 rounded-xl shadow-main flex flex-col justify-between items-start">
            <ul className="space-y-1 w-full">
              {MENU.map((d) => {
                const Icon = Icons[d.icon];
                return (
                  <li
                    className={cn(
                      'flex gap-4 items-center hover:text-rose-500 px-2 py-2 rounded-lg font-medium overflow-auto',
                      location.pathname === d.href
                        ? 'bg-rose-100 text-rose-500'
                        : ''
                    )}
                    key={d.href}
                  >
                    <Icon size={20} className="shrink-0" />
                    <Link to={d.href}>{d.title}</Link>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={signOut}
              className=" text-gray-500 flex items-center gap-2 font-medium"
            >
              <SignOutIcon />
              Sign Out
            </button>
          </div>
        </aside>
        {/* CENTER COLUMN */}
        <section className="flex-1 rounded-lg">{children}</section>
        {/* RIGHT COLUMN */}
        <section className="space-y-5 w-[250px] sticky top-0">
          <RecentChats />
          <RecentConnections />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
