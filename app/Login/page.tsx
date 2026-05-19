import { auth0 } from "@/lib/auth0";
import "../css/Login.css";

const roleClaim =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  const session = await auth0.getSession();
  const user = session?.user;
  const { error, error_description: errorDescription } = await searchParams;

  if (!user) {
    return (
      <>
        {error && <p>Error: {errorDescription ?? error}</p>}
        <div className="login-page-container">
          <a href="/auth/login?screen_hint=signup">Signup</a>
          <a href="/auth/login">Login</a>
        </div>
      </>
    );
  }

  const roles = user[roleClaim];

  return (
    <>
      <p>Logged in as {user.email}</p>
      <h1>User Profile</h1>
      {roles != null && <p>Roles: {JSON.stringify(roles)}</p>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="login-page-container">
        <a href="/auth/logout">Logout</a>
      </div>
    </>
  );
}
