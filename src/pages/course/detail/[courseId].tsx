import Layout from "@/components/Layout";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";

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
    </Layout>
  );
};

export default CourseDetail;
