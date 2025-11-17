export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {children}
        </div>
      </section>
    </main>
  );
}
