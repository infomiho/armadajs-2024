import { Outlet } from "react-router-dom";
import { logout, useAuth } from "wasp/client/auth";
import { UserMenu } from "./components/UserMenu";
import { CheckSquare } from "lucide-react";

export function Layout() {
  const { data: user } = useAuth();
  const username = user?.getFirstProviderUserId();
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {username && <UserMenu userName={username} onLogout={logout} />}
        <header>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckSquare className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">Taskich</h1>
            </div>
            <p className="text-gray-600">Stay organized and get things done</p>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
