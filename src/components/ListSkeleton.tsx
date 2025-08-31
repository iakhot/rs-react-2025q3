function ListSkeleton({ rows = 12 }: { rows?: number }) {
  return (
    <>
      <div className="flex flex-col w-full min-w-3/4">
        <div className="grid grid-cols-3 gap-x-2 gap-y-1 animate-pulse">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="rounded p-4 flex h-8  bg-gray-400"></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListSkeleton;
