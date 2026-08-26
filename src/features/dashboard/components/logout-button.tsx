import { signOut } from "@/shared/lib/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
      className="mt-8"
    >
      <button type="submit" className="text-sm text-muted-foreground hover:text-foreground">
        Sign out
      </button>
    </form>
  );
}