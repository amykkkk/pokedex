import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] p-6">
      <section className="w-full max-w-md">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-lg">
          <header className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
              <span className="text-2xl">🔥</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--color-accent)]">
              Pokédex 로그인
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text)]/80">
              이메일과 비밀번호로 로그인하거나 새 계정을 만드세요
            </p>
          </header>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
              >
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <button
                formAction={login}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
                // type="submit"
              >
                로그인
              </button>
              <button
                formAction={signup}
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-search)]"
                // type="submit"
              >
                계정 생성
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-[var(--color-text)]/60">
              <p>
                비밀번호를 잊으셨나요?{" "}
                <a
                  className="text-[var(--color-accent)] underline"
                  href="/reset"
                >
                  비밀번호 재설정
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
