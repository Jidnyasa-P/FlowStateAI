import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            FS
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join FlowState and start optimizing your productivity
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <SignupForm />

          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-xs text-gray-500">
              Demo mode: Any email and password (6+ chars) will work
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
