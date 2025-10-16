export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col gap-8 px-6 py-10">
            {children}
        </main>
    );
}

