import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Palette, Search, LayoutGrid } from 'lucide-react';

export default function Navbar() {
    const { pathname } = useLocation();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/search', label: 'Search', icon: <Search size={15} /> },
        { to: '/browse', label: 'Browse', icon: <LayoutGrid size={15} />},
    ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Palette size={24} className="text-amber-400" />
          <span className="text-xl font-bold text-white tracking-wide">
            Art<span className="text-amber-400">Vault</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${pathname === to
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {icon} {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

