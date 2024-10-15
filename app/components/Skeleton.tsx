const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}></div>
  );
};

export default Skeleton;
