import React from "react";
import Layout from "@/components/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/router";

const ScorePage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Score</h1>
        <p>Jumat, 3 Desember 1945</p>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="w-[90%] mx-auto flex gap-14 items-center max-w-[1400px]">
        <Table className="bg-white rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl py-3 text-center">No</TableHead>
              <TableHead className="text-xl py-3 text-center">Mata Pelajaran</TableHead>
              <TableHead className="text-xl py-3 text-center">Guru</TableHead>
              <TableHead className="text-xl py-3 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, idx) => {
              return (
                <TableRow className="group" onClick={() => router.push(`/course/detail/${idx + 1}`)}>
                  <TableCell className="text-lg py-3 text-center">{idx + 1}</TableCell>
                  <TableCell className="text-lg py-3 text-center">Fisika</TableCell>
                  <TableCell className="text-lg py-3 text-center">Novaria Kemmel S.Pd.</TableCell>
                  <TableCell className="text-lg py-2 flex justify-center">
                    <div className="w-24 flex justify-center">
                      <button className="py-1 px-5 w-full rounded-[6px] text-white bg-green-600 font-medium relative hover:bg-green-700 hidden group-hover:block">
                        Detail
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default ScorePage;
