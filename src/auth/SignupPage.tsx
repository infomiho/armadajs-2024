import { SignupForm } from "wasp/client/auth";
// Wasp's type-safe Link component
import { Link } from "wasp/client/router";
import { appearance } from "./appearance";

export function SignupPage() {
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
