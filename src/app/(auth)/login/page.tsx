import LoginForm from "@/components/ui/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="mt-5 text-center text-xs text-[var(--color-text)]/50">
        <Link href="/signup">계정생성</Link>
      </div>
    </>
  );
}
