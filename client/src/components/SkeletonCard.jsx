export default function SkeletonCard() {
    return (
      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden animate-pulse">
        <div className="aspect-square bg-[#1a1a1a]" />
        <div className="p-4 space-y-2">
          <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
          <div className="h-4 bg-[#1a1a1a] rounded w-full" />
          <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
        </div>
      </div>
    );
  }