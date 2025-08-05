import { PulseLoader, RingLoader, ScaleLoader, HashLoader } from 'react-spinners';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'pulse' | 'ring' | 'scale' | 'hash';
  color?: string;
}

export default function Loading({ 
  message = "Loading...", 
  size = 'md',
  className = "",
  type = 'ring',
  color = '#3B82F6' // blue-500
}: LoadingProps) {
  const sizeMap = {
    sm: { scale: 0.5, ringSize: 35 },
    md: { scale: 0.75, ringSize: 50 },
    lg: { scale: 1, ringSize: 80 }
  };

  const currentSize = sizeMap[size];

  const renderSpinner = () => {
    switch (type) {
      case 'pulse':
        return (
          <PulseLoader
            color={color}
            size={15 * currentSize.scale}
            margin={2}
            speedMultiplier={0.8}
          />
        );
      case 'ring':
        return (
          <RingLoader
            color={color}
            size={currentSize.ringSize}
            speedMultiplier={0.8}
          />
        );
      case 'scale':
        return (
          <ScaleLoader
            color={color}
            height={35 * currentSize.scale}
            width={4 * currentSize.scale}
            margin={2}
            speedMultiplier={0.8}
          />
        );
      case 'hash':
        return (
          <HashLoader
            color={color}
            size={currentSize.ringSize}
            speedMultiplier={0.8}
          />
        );
      default:
        return (
          <RingLoader
            color={color}
            size={currentSize.ringSize}
            speedMultiplier={0.8}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Cool Spinner */}
      <div className="mb-4">
        {renderSpinner()}
      </div>
      
      {/* Loading Message */}
      <p className="text-gray-600 dark:text-gray-300 text-center font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
}
