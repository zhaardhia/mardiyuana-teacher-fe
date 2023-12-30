import React from "react";
import Layout from "@/components/Layout";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseDetail = () => {
  const router = useRouter();
  const { courseId } = router.query;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <Icon icon="formkit:arrowleft" className="cursor-pointer h-full w-10" onClick={() => router.back()} />
        <h1 className="text-2xl font-semibold">Fisika</h1>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-4 w-[90%] mx-auto flex gap-14 items-center max-w-[1400px]">
        <div className="flex items-center gap-4">
          <img src="/photo_teacher.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">Novaria Kemmel S.Pd, M.Pd</h3>
            <p>Teacher | IPA - 1</p>
          </div>
        </div>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-4 w-[90%] mx-auto flex gap-14 items-center max-w-[1400px]">
        <Tabs defaultValue="session" className="w-full">
          <TabsList className="w-full flex items-center gap-4 justify-start pl-0 mb-3">
            <TabsTrigger value="session" className="text-lg font-normal">
              Session
            </TabsTrigger>
            <TabsTrigger value="discussion" className="text-lg font-normal">
              Discussion
            </TabsTrigger>
            <TabsTrigger value="scoring" className="text-lg font-normal">
              Scoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="session">
            <Tabs defaultValue="bab 1" className="w-full">
              <TabsList className="w-full flex items-center gap-4 justify-start pl-0">
                {[...Array(8)].map((_, idx) => (
                  <TabsTrigger
                    value={`bab ${idx + 1}`}
                    className="text-base font-normal bg-gray-300 rounded-xl border-none data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:font-medium px-5"
                  >
                    Bab {idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {[...Array(8)].map((_, idx) => (
                <TabsContent value={`bab ${idx + 1}`} className="mt-10">
                  <h2 className="font-semibold text-3xl mb-2">Fotosintesis</h2>
                  <h4 className="font-normal text-lg mb-1">Mengenal foto sintesis</h4>
                  <ol className="text-normal">
                    <li>1. Mempelajari Bab {idx + 1}</li>
                    <li>2. Visualisasi fotosintesis</li>
                    <li>3. Fakta unik mengenai fotosintesis</li>
                  </ol>

                  <h2 className="font-semibold text-2xl italic mt-5">Supported Material</h2>
                  <button className="text-blue-800 hover:underline text-lg">Click</button>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="discussion">
            <Tabs defaultValue="bab 1" className="w-full">
              <TabsList className="w-full flex items-center gap-4 justify-start pl-0">
                {[...Array(8)].map((_, idx) => (
                  <TabsTrigger
                    value={`bab ${idx + 1}`}
                    className="text-base font-normal bg-gray-300 rounded-xl border-none data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:font-medium px-5"
                  >
                    Bab {idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {[...Array(8)].map((_, idx) => (
                <TabsContent value={`bab ${idx + 1}`}>{idx + 1}</TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="scoring">
            <Tabs defaultValue="bab 1" className="w-full">
              <TabsList className="w-full flex items-center gap-4 justify-start pl-0">
                {[...Array(8)].map((_, idx) => (
                  <TabsTrigger
                    value={`bab ${idx + 1}`}
                    className="text-base font-normal bg-gray-300 rounded-xl border-none data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:font-medium px-5"
                  >
                    Bab {idx + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {[...Array(8)].map((_, idx) => (
                <TabsContent value={`bab ${idx + 1}`}>{idx + 1}</TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetail;
