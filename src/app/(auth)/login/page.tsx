import LoginForm from "@/components/ui/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="mt-5 text-center text-xs text-[var(--color-text)]/50">
        <Link className="pr-4" href="/reset">
          비밀번호 재설정
        </Link>
        <Link href="/signup">계정생성</Link>
      </div>
    </>
  );
}
