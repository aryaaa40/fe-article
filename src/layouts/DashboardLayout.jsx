import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusSquare,
  Eye,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
        : 'text-slate-500 hover-indigo'}
    `}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    <ChevronRight size={16} className="ml-auto opacity-50" />
  </NavLink>
);

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-sidebar bg-white border-r p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 leading-tight">SV Articles</h2>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem to="/posts" icon={LayoutDashboard} label="All Posts" end={true} />
          <SidebarItem to="/posts/add" icon={PlusSquare} label="Add New" />
          <SidebarItem to="/preview" icon={Eye} label="Preview Site" />
        </nav>
      </aside>

      <main className="main-content flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Article Management</h1>
          <p className="text-slate-500 mt-1">Manage your content publishing workflow efficiently.</p>
        </header>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-600">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
