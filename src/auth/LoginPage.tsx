import { LoginForm } from "wasp/client/auth";
// Wasp's type-safe Link component
import { Link } from "wasp/client/router";
import { appearance } from "./appearance";
import { useAuth } from "./useAuth";

export function LoginPage() {
  const { isLoading, isAuthenticated, navigateAlreadyAuthenticated } =
    useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return navigateAlreadyAuthenticated();
  }

  return (
    <div>
      {/** Wasp has built-in auth forms & flows, which you can customize or opt-out of, if you wish :)
       * https://wasp-lang.dev/docs/guides/auth-ui
       */}
      <LoginForm appearance={appearance} />
      <br />
      <span>
        I don't have an account yet (<Link to="/signup">go to signup</Link>).
      </span>
    </div>
  );
}
