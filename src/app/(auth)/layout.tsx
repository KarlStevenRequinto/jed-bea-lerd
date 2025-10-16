const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <main className="flex min-h-[calc(100vh-5rem)] flex-col">{children}</main>;
};

export default AuthLayout;
