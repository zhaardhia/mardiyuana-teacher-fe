import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p>Jumat, 3 Desember 1945</p>
      </div>
      <hr className="h-[2px] bg-[#AFAFAF]" />
      <div className="my-5 w-[90%] mx-auto py-3 flex gap-10 items-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">School Event</h2>
          <div>
            <img src="/school_event.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">Notification</h2>
          <div className="bg-white min-h-[247px] rounded-[10px] px-5 flex flex-col justify-center gap-3 w-[380px]">
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Libur Nasional</p>
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Ujian Semester</p>
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Quiz</p>
          </div>
        </div>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-5 w-[90%] mx-auto py-3 flex gap-10 items-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">Discussion</h2>
          <div className="bg-white min-h-[247px] rounded-[10px] px-5 flex flex-col justify-center gap-3 w-[380px]">
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Libur Nasional</p>
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Ujian Semester</p>
            <p className="bg-[#E4EBF7] px-5 py-4 rounded-[15px]">Quiz</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="my-5">
        <div>HEHE</div>
      </div>
    </Layout>
  );
}
