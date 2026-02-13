import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            FS
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your FlowState dashboard
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <LoginForm />

          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-xs text-gray-500">
              Demo credentials: Use any email and password (6+ chars)
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
