import { Lock } from 'lucide-react';
import Link from 'next/link';

interface LockedFeatureCardProps {
  title?: string;
  description?: string;
  height?: string;
  showButton?: boolean;
}

export function LockedFeatureCard({
  title = 'Feature',
  description = 'Sign in to access this feature',
  height = 'h-64',
  showButton = true,
}: LockedFeatureCardProps) {
  return (
    <div
      className={`${height} flex items-center justify-center rounded-2xl border border-gray-200 bg-white relative overflow-hidden`}
    >
      <div className="absolute inset-0 blur-sm bg-gradient-to-br from-gray-100 to-gray-50" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <Lock className="h-8 w-8 text-gray-400" />
        <div>
          <p className="font-semibold text-gray-900">
            {title}
          </p>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        {showButton && (
          <Link
            href="/signup"
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Unlock Full Experience
          </Link>
        )}
      </div>
    </div>
  );
}
