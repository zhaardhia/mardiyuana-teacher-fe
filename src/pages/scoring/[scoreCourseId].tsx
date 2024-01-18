import Layout from "@/components/Layout";
import { Icon } from "@iconify/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSessionUser } from "@/contexts/SessionUserContexts"
import { ScoreCourseById, ScoringStudentList } from "@/types"
import moment from "moment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ModalAddEditScoreStudent from "@/components/course/ModalAddEditScoreStudent";
import ModalAddEditScoreCourse from "@/components/course/ModalAddEditScoreCourse";

const gparam = {
  page: 1,
  pageSize: 10,
}

const statusAssignment = {
  DONE: "Completed ✅",
  NOT_DONE: "Not Done ❌"
}

type StatusType = {
  DONE: string
  NOT_DONE: string
}

const ScoreCourseDetailPage = () => {
  const router = useRouter();
  const { scoreCourseId } = router.query;
  const { axiosJWT } = useSessionUser()
  const [scoreCourseDetail, setScoreCourseDetail] = useState<ScoreCourseById | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [studentData, setStudentData] = useState<ScoringStudentList[]>([]);
  const [totalData, setTotalData] = useState<number | null>();
  const [totalPages, setTotalPages] = useState<number>(10);
  const [nextPage, setNextPage] = useState<number | null>();

  useEffect(() => {
    if (scoreCourseId) fetchData()
  }, [scoreCourseId])

  useEffect(() => {
    if (scoreCourseId) fetchDataStudent()
  }, [scoreCourseId, currentPage])

  const fetchData = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/score-course/detail?id=${scoreCourseId}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
      },
    })
    console.log({response})
    if (response?.status === 200) {
      setScoreCourseDetail(response?.data?.data)
    }
  }

  const fetchDataStudent = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/score-course/score-course-student?scoreCourseId=${scoreCourseId}&page=${gparam.page}&pageSize=${gparam.pageSize}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
      },
    })
    console.log({response})
    if (response?.data?.statusCode === "000") {
      setStudentData(response?.data?.data?.listStudentScore);
      setTotalData(response?.data?.data?.totalData);
      setTotalPages(response?.data?.data?.totalPages);
      setNextPage(response?.data?.data?.nextPage);
    } else {
      throw Error("Fetch data error.")
    }
  }

  console.log({studentData})
  const renderPaginationItems = () => {
    const paginationItems = [];

    paginationItems.push(
      <PaginationItem key="previous">
        <PaginationPrevious
          // href="#"
          className="rounded-xl hover:border-[1px] border-gray-400 cursor-pointer hover:bg-slate-300"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1)
              gparam.page = currentPage - 1
            }
          }}
          isActive={currentPage !== 1}
        />
      </PaginationItem>
    );

    paginationItems.push(
      <PaginationItem key={currentPage}>
        <PaginationLink className="rounded-xl hover:border-[1px] border-gray-400 cursor-pointer hover:bg-slate-300" isActive onClick={() => {
          setCurrentPage(currentPage)
          gparam.page = currentPage
        }}>
          {currentPage}
        </PaginationLink>
      </PaginationItem>
    );

    for (let page = currentPage + 1; page <= currentPage + 2 && page <= totalPages; page++) {
      paginationItems.push(
        <PaginationItem key={page}>
          <PaginationLink className="rounded-xl hover:border-[1px] border-gray-400 cursor-pointer hover:bg-slate-300" href="#" onClick={() => {
            setCurrentPage(page)
            gparam.page = page
          }}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    paginationItems.push(
      <PaginationItem key="next">
        <PaginationNext
          // href="#"
          className="rounded-xl hover:border-[1px] border-gray-400 cursor-pointer hover:bg-slate-300"
          onClick={() => {
            if (totalPages > currentPage) {
              setCurrentPage(currentPage + 1)
              gparam.page = currentPage + 1
            }
          }}
          isActive={currentPage !== totalPages}
        />
      </PaginationItem>
    );

    return paginationItems;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <Icon icon="formkit:arrowleft" className="cursor-pointer h-full w-10" onClick={() => router.back()} />
        <h1 className="text-2xl font-semibold">{scoreCourseDetail?.course?.name}</h1>
      </div>

      <hr className="h-[2px] border-dotted w-[90%] mx-auto border-slate-300" />

      <div className="my-4 w-[90%] mx-auto flex flex-col max-w-[1400px]">
        <h2 className="mb-7 font-semibold text-2xl">{scoreCourseDetail?.type}: {scoreCourseDetail?.title}</h2>

        <div className="p-4 border border-opacity-60 border-slate-400 rounded-xl bg-white ">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="font-normal text-xl">
                {scoreCourseDetail?.class.name} | <span className="ml-4">{scoreCourseDetail?.type === "ASSIGNMENT" ? "Due " : "Started At "}{moment(scoreCourseDetail?.scoreDue).format("LL")}</span>
              </p>
            </div>
          </div>

          <h4 className="font-medium text-xl underline mt-4">{scoreCourseDetail?.title}</h4>

          <p className="text-justify mt-2">
            {scoreCourseDetail?.body}
          </p>
          <ModalAddEditScoreCourse isEdit={true} initialScoreCourseDetail={scoreCourseDetail} setScoreCourseDetail={setScoreCourseDetail} />
        </div>

        <Table className="bg-white rounded-xl mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg py-3 text-left">Nama</TableHead>
              <TableHead className="text-lg py-3 text-left">Status</TableHead>
              <TableHead className="text-lg py-3 text-left">Score</TableHead>
              <TableHead className="text-lg py-3 text-left">Last Modified</TableHead>
              <TableHead className="text-lg py-3 text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData?.map((_: ScoringStudentList, idx) => {
              return (
                <TableRow className="group">
                  <TableCell className=" py-3 text-left">{_.student.fullname}</TableCell>
                  <TableCell className={cn("py-3 text-left", 
                    _.status === "DONE" && "text-green-500",
                    _.status === "NOT_DONE" && "text-red-500"
                  )}>{statusAssignment[_.status as keyof StatusType]}</TableCell>
                  <TableCell className="py-3 text-left">{_.score}</TableCell>
                  <TableCell className="py-3 text-left">{moment(_.updatedDate).format("lll")}</TableCell>
                  <TableCell className="py-3 text-left">
                    <ModalAddEditScoreStudent initialData={_} setStudentData={setStudentData} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center mt-5">
          {totalData && (
            <Pagination>
              <PaginationContent>{renderPaginationItems()}</PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScoreCourseDetailPage;
