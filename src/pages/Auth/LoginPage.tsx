import AuthForm from "../../components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center gap-16 px-2.5 py-16">

      <div className="hidden flex-col items-center md:flex">
        <h1 className="text-8xl font-black tracking-tight text-black">InvestIQ</h1>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
          Smart Finance
        </p>
      </div>

      <AuthForm />
    </div>
  );
}