export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-center p-6">
      <section className="w-full max-w-md">
        <div className="border-border rounded-3xl border p-8 shadow-lg ring-1">
          <div className="text-text mb-6 text-center">
            <span className="block p-4 text-2xl">🔥</span>
            <h1 className="text-foreground font-semibold">Pokédex 로그인</h1>
            <p className="mt-1 text-sm">
              이메일과 비밀번호로 로그인하거나 새 계정을 만드세요
            </p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
