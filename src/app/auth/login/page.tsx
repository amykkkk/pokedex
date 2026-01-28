import LoginForm from "@/components/ui/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="text-text mt-5 text-center text-xs">
        <Link
          className="mr-3 inline-block underline-offset-4 hover:underline"
          href="/auth/signup"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/reset-pw"
          className="inline-block underline-offset-4 hover:underline"
        >
          Find PassWord
        </Link>
      </div>
    </>
  );
}
