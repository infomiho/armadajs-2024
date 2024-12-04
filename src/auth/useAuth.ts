import { useNavigate } from "react-router-dom";
import { useAuth as useWaspAuth } from "wasp/client/auth";

export function useAuth() {
  const { data: user, ...rest } = useWaspAuth();
  const navigate = useNavigate();

  return {
    ...rest,
    isAuthenticated: !!user,
    user,
    navigateAlreadyAuthenticated: () => navigate("/"),
  };
}
