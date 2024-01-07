import Layout from "@/components/Layout";
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClassPage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Your Class</h1>
        <h1 className="text-2xl font-semibold">VII-A</h1>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <Tabs defaultValue="classmate">
        <div className="my-2 w-[90%] mx-auto flex gap-14 items-center max-w-[1400px]">
          <TabsList className="w-full flex items-center gap-4 justify-start pl-0 min-w-[250px] overflow-y-hidden overflow-x-scroll">
            <TabsTrigger value="classmate" className="text-lg font-normal">
              View Classmate
            </TabsTrigger>
            <TabsTrigger value="teacherNote" className="text-lg font-normal">
              Teacher Note
            </TabsTrigger>
          </TabsList>
        </div>

        <hr className="h-[2px] bg-[#AFAFAF]" />

        <div className="my-5 w-[90%] mx-auto rounded-xl flex gap-14 items-center max-w-[1400px]">
          <TabsContent value="classmate" className="w-full">
            <Table className="bg-white rounded-xl min-w-[350px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-7 text-xl py-3">Nama</TableHead>
                  <TableHead className="pl-7 text-xl py-3">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(10)].map(() => {
                  return (
                    <TableRow>
                      <TableCell className="pl-7 py-3">
                        <div className="flex items-center gap-2 sm:gap-6">
                          <img src="/photo_profile.jpg" alt="" className="w-16 h-16 rounded-full object-cover" />
                          <div className="flex flex-col w-fit">
                            <h4 className="text-center text-lg ">Martin Garrix Ramadhan</h4>
                            <h5 className="text-center">VII-A</h5>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="pl-7 text-lg py-3">fadli@mail.com</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="teacherNote">
            <h2 className="font-semibold text-3xl mb-5">Teacher's Note</h2>
            <div className="border border-slate-400 rounded-xl bg-white py-4 shadow-lg">
              <div className="flex items-center gap-4 px-4 ">
                <img src="/photo_teacher.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <div className="flex flex-col xl:w-1/5">
                  <h3 className="font-semibold text-xl">Novaria Kemmel S.Pd.</h3>
                  <p className="font-normal">
                    Teacher | IPA - 1 <span className="ml-4">Sat, 11 Nov 2023</span>
                  </p>
                </div>
              </div>

              <h4 className="font-medium text-xl border-y border-slate-400 mt-4 px-4 py-2">Felecia Bolos Kelas</h4>

              <p className="text-justify mt-2 px-4 py-2">
                et veritatis quod hic sequi architecto aperiam quae doloremque facere nisi dolorum labore iste, ipsum
                enim cumque eos facilis eaque quasi! Doloremque repellendus ratione, beatae ab iure quaerat temporibus
                vitae molestias, odit iste sit!
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Layout>
  );
};

export default ClassPage;
