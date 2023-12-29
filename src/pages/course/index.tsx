import Layout from "@/components/Layout";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/router";

const CoursePage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p>Jumat, 3 Desember 1945</p>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-5 w-[90%] mx-auto py-3 flex gap-14 items-center max-w-[1400px]">
        <Select>
          <SelectTrigger className="w-[220px] bg-white rounded-[6px] text-base">
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-[6px]">
            <SelectGroup>
              <SelectLabel className="text-lg">Kelas</SelectLabel>
              <SelectItem value="X - Semester 1" className="cursor-pointer">
                X - Semester 1
              </SelectItem>
              <SelectItem value="X - Semester 2" className="cursor-pointer">
                X - Semester 2
              </SelectItem>
              <SelectItem value="XI - Semester 1" className="cursor-pointer">
                XI - Semester 1
              </SelectItem>
              <SelectItem value="XI - Semester 2" className="cursor-pointer">
                XI - Semester 2
              </SelectItem>
              <SelectItem value="XII - Semester 1" className="cursor-pointer">
                XII - Semester 1
              </SelectItem>
              <SelectItem value="XII - Semester 2" className="cursor-pointer">
                XII - Semester 2
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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

export default CoursePage;
