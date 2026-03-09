import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Search, LayoutGrid, Home } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <Home size={14} /> },
    { to: '/search', label: 'Search', icon: <Search size={14} /> },
    { to: '/browse', label: 'Browse', icon: <LayoutGrid size={14} /> },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(10,10,10,0.95)',
      borderBottom: '1px solid #1f1f1f',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Palette size={22} style={{ color: '#c9a84c' }} />
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>
            Art<span style={{ color: '#c9a84c' }}>Vault</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {links.map(({ to, label, icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',           
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? '#c9a84c' : 'transparent',
                  color: isActive ? '#000000' : '#9ca3af',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}