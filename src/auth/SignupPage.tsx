import { SignupForm } from "wasp/client/auth";
// Wasp's type-safe Link component
import { Link } from "wasp/client/router";
import { appearance } from "./appearance";
import { useAuth } from "./useAuth";

export function SignupPage() {
  const { isAuthenticated, navigateAlreadyAuthenticated } = useAuth();

  if (isAuthenticated) {
    return navigateAlreadyAuthenticated();
  }

  return (
    <div>
      {/** Wasp has built-in auth forms & flows, which you can customize or opt-out of, if you wish :)
       * https://wasp-lang.dev/docs/guides/auth-ui
       */}
      <SignupForm appearance={appearance} />
      <br />
      <span>
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
    </div>
  );
}
