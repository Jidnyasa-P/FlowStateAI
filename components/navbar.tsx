'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { session, isGuest, logout } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 text-xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">
              FS
            </div>
            FlowState
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>

            {isGuest ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">{session?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="space-y-4 border-t border-gray-200 px-0 py-4 md:hidden">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            {isGuest ? (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="block px-4 py-2 text-sm text-gray-600">
                  {session?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
