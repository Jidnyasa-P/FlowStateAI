import { Lock } from 'lucide-react';

interface LockedFeatureCardProps {
  title?: string;
  height?: string;
}

export function LockedFeatureCard({
  title = 'Feature',
  height = 'h-64',
}: LockedFeatureCardProps) {
  return (
    <div
      className={`${height} flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Lock className="h-8 w-8 text-gray-400" />
        <div>
          <p className="font-semibold text-gray-700">
            Unlock {title}
          </p>
          <p className="text-sm text-gray-600">Sign in to access this feature</p>
        </div>
      </div>
    </div>
  );
}
