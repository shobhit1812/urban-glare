import React from "react";
import useOnline from "@/helpers/hooks/useOnline";
import Sidebar from "@/components/browse/Sidebar";
import MainContainer from "@/components/browse/MainContainer";
import SecondaryContainer from "@/components/browse/SecondaryContainer";

const Browse: React.FC = () => {
  const isOnline = useOnline();

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row min-h-screen px-6 py-4">
      <aside className="w-full sm:w-1/4 lg:w-1/6 xl:w-1/8 bg-gray-100 p-4 mr-4 rounded-md shadow-lg">
        <Sidebar />
      </aside>

      {!isOnline ? (
        <p className="m-5 p-4 text-center text-red-600 font-semibold">
          🔴 Offline, Please check your internet.
        </p>
      ) : (
        <main className="flex-1 space-y-4 mt-4 lg:mt-0">
          <section className="mb-4">
            <SecondaryContainer />
          </section>

          <section>
            <MainContainer />
          </section>
        </main>
      )}
    </div>
  );
};

export default Browse;
