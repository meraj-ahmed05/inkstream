export const FullBlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="flex justify-center">
        <div className="p-6 border-b border-slate-200 pb-6 w-full max-w-screen-xl cursor-pointer">
          <div className="grid grid-cols-12 gap-6 px-4">
            <div className="col-span-9">
              <div className="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
              <div className="h-48 w-full bg-gray-200 rounded mb-6"></div>
            </div>
            <div className="col-span-3">
              <div className="h-8 w-1/4 bg-gray-200 rounded mb-6"></div>
              <div className="flex items-center">
                <div className="pr-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-8 w-full bg-gray-200 rounded mb-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
