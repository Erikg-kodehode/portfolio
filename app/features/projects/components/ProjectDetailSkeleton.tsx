export default function ProjectDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl animate-pulse">
      <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-8" />

      <article className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        <div className="relative w-full h-[400px] bg-slate-200 dark:bg-slate-700" />

        <div className="p-6 md:p-8 lg:p-10 space-y-8">
          {/* Title skeleton */}
          <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />

          {/* Description section skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>

          {/* Features section skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
              ))}
            </div>
          </div>

          {/* Technologies section skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              ))}
            </div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </article>
    </div>
  );
}

