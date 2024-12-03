import { User as UserIcon, LogOut, ChevronDown } from "lucide-react";

import React, { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ userName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 z-10" ref={menuRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
        >
          <div className="p-1 bg-blue-50 rounded-lg">
            <UserIcon className="w-4 h-4 text-blue-500" />
          </div>
          <span className="font-medium">{userName}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 min-w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="text-sm font-medium text-gray-700">{userName}</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
