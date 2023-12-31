import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Select, { ActionMeta } from "react-select";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ModalCumScore from "@/components/score/ModalCumScore";

type Option = { value: string; label: string };

const options = [
  { value: "X - Semester 1", label: "X - Semester 1" },
  { value: "X - Semester 2", label: "X - Semester 2" },
  { value: "XI - Semester 1", label: "XI - Semester 1" },
  { value: "XI - Semester 2", label: "XI - Semester 2" },
  { value: "XII - Semester 1", label: "XII - Semester 1" },
  { value: "XII - Semester 2", label: "XII - Semester 2" },
];

const ScorePage = () => {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<Option>(options[0]);
  const handleSelectClass = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    option && setSelectedClass(option);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Score</h1>
        <p>Jumat, 3 Desember 1945</p>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-5 w-[90%] mx-auto py-3 flex gap-14 items-center max-w-[1400px]">
        <Select
          name="class"
          className="basic-single w-[18%] rounded-xl"
          value={selectedClass}
          classNamePrefix="select"
          isClearable={false}
          isSearchable={false}
          defaultValue={selectedClass}
          options={options}
          placeholder="Pilih Kelas"
          onChange={handleSelectClass}
        />
      </div>

      <div className="w-[90%] mx-auto flex gap-14 rounded-xl shadow-xl items-center max-w-[1400px]">
        <Table className="bg-white rounded-xl ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl py-3 text-center">Mata Pelajaran</TableHead>
              <TableHead className="text-xl py-3 text-center">Cum. Assignment</TableHead>
              <TableHead className="text-xl py-3 text-center">Cum. Quiz</TableHead>
              <TableHead className="text-xl py-3 text-center">Mid Exam</TableHead>
              <TableHead className="text-xl py-3 text-center">KKM</TableHead>
              <TableHead className="text-xl py-3 text-center">Final Exam</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, idx) => {
              return (
                <TableRow className="group">
                  <TableCell className="text-lg py-3 text-center">Seni Budaya</TableCell>
                  <TableCell className="text-lg py-3 text-center">
                    <div className="flex justify-center items-start">
                      <p>90</p>
                      <ModalCumScore type="Assignment" subject="Fisika" />
                    </div>
                  </TableCell>
                  <TableCell className="text-lg py-3 text-center">
                    <div className="flex justify-center items-start">
                      <p>86</p>
                      <ModalCumScore type="Quiz" subject="Olahraga" />
                    </div>
                  </TableCell>
                  <TableCell className="text-lg py-3 text-center">76</TableCell>
                  <TableCell className="text-lg py-3 text-center">70</TableCell>
                  <TableCell className="text-lg py-3 text-center">80</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="w-[90%] my-5 mx-auto flex justify-end gap-14 items-center max-w-[1400px]">
        <div className="w-1/4 bg-white rounded-[6px] shadow-xl border border-slate-400">
          <section className="flex justify-between p-4">
            <div className="flex flex-col gap-2">
              <p>Sakit</p>
              <p>Izin</p>
              <p>Alpha</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>2</p>
              <p>4</p>
              <p>0</p>
            </div>
          </section>
          <hr className="h-[2px] bg-[#AFAFAF]" />

          <section className="flex justify-between px-4 py-2">
            <p>Mean</p>
            <p>87</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ScorePage;
