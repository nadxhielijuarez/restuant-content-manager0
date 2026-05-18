import { auth0 } from "@/lib/auth0";
import { UploadThingError } from "uploadthing/server";
const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export type AdminUser = {
  id: string;
  email?: string;
};

function userHasAdminRole(
roles: unknown,
adminRole: string
): boolean {
if (Array.isArray(roles)) {
    console.log("roles is an array");
    console.log("roles: " + roles);
  return roles.includes(adminRole);
}
return roles === adminRole;
}
/** Ensures the current request has an authenticated Auth0 user with the admin role. */
export async function requireAdminUser(): Promise<AdminUser> {
const session = await auth0.getSession();
const user = session?.user;
if (!user?.sub) {
  throw new UploadThingError("You must be logged in to upload files.");
}
const adminRole = process.env.AUTH0_ADMIN_ROLE ?? "Admin";
console.log("adminRole: " + adminRole);
console.log("adminRole: " + adminRole);
const roles = user[ROLE_CLAIM];
console.log("roles: " + roles);
if (!userHasAdminRole(roles, adminRole)) {
  throw new UploadThingError("TEST - You do not have permission to upload files.");
}
return {
  id: user.sub,
  email: typeof user.email === "string" ? user.email : undefined,
};
}
