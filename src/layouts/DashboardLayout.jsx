import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Eye, 
  LogOut, 
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
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">CMS Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem to="/posts" icon={LayoutDashboard} label="All Posts" end={true} />
          <SidebarItem to="/posts/add" icon={PlusSquare} label="Add New" />
          <SidebarItem to="/preview" icon={Eye} label="Preview Site" />
        </nav>

        <div className="absolute-bottom">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase">Logged In As</p>
            <p className="text-sm font-bold text-slate-700">Administrator</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover-danger rounded-xl transition-all border-none bg-transparent">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Article Management</h1>
            <p className="text-slate-500 mt-1">Manage your content publishing workflow efficiently.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
              AD
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-600">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
