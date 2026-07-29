import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RoomSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <div>
            <Skeleton
              width={130}
              height={35}
              baseColor="#1e293b"
              highlightColor="#334155"
            />

            <div className="mt-2">
              <Skeleton
                width={160}
                height={16}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton
              width={110}
              height={40}
              borderRadius={8}
              baseColor="#1e293b"
              highlightColor="#334155"
            />

            <Skeleton
              width={90}
              height={40}
              borderRadius={8}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* Video */}
          <div className="aspect-video rounded-xl border border-slate-800 bg-black p-5">
            <Skeleton
              height="100%"
              containerClassName="h-full"
              baseColor="#020617"
              highlightColor="#1e293b"
            />
          </div>

          {/* Chat */}
          <div className="flex h-[500px] flex-col rounded-xl border border-slate-800 bg-slate-900">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 p-3 gap-3">
              <Skeleton
                width="50%"
                height={30}
                baseColor="#1e293b"
                highlightColor="#334155"
              />

              <Skeleton
                width="50%"
                height={30}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 p-5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <Skeleton
                    width={100}
                    height={15}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                  />

                  <Skeleton
                    width={200}
                    height={15}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                  />
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-slate-800 p-4">
              <Skeleton
                height={40}
                borderRadius={8}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomSkeleton;
