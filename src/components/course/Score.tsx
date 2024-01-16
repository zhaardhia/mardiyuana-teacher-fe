import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { scoreCourseType, scoreCourses } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { ScoreCourseTypeConstant, ScoreCourseList, InitialCourseData, ScoringList } from "@/types"
import { useSessionUser } from "@/contexts/SessionUserContexts"
import moment from 'moment';
import { Button } from '../ui/button';
import ModalAddEditScoreCourse from './ModalAddEditScoreCourse';

type ScoreType = {
  initialCourseData: InitialCourseData | undefined
}

const Score: React.FC<ScoreType> = ({ initialCourseData }) => {
  const router = useRouter();
  const { courseId, enrollmentId } = router.query;
  const { axiosJWT } = useSessionUser()
  const [type, setType] = useState<string>(scoreCourseType[0])
  const [scoreCoursesData, setScoreCoursesData] = useState<ScoringList[]>([])

  React.useEffect(() => {
    if (courseId && enrollmentId) fetchData()
  }, [courseId, enrollmentId, type])

  const fetchData = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/score-course?courseId=${courseId}&id=${enrollmentId}&type=${type}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
      },
    })
    console.log({response})
    if (response?.status === 200) {
      setScoreCoursesData(response?.data?.data || [])
      console.log("ganti")
    }
  }

  return (
    <Tabs defaultValue={`wkwk 0`} className="w-full overflow-x-hidden">
      <TabsList className="w-full flex items-center gap-4 justify-start pl-0 min-w-[500px] overflow-y-hidden overflow-x-scroll md:pr-0 sm:pr-10 pr-52">
        {scoreCourseType.map((_, idx) => (
          <TabsTrigger
            value={`wkwk ${idx}`}
            className="text-base font-normal bg-gray-300 rounded-xl border-none data-[state=active]:bg-[#2F9757] data-[state=active]:text-white data-[state=active]:font-medium px-5"
            onClick={() => setType(_)}
          >
            {scoreCourses[_ as keyof ScoreCourseTypeConstant]}
          </TabsTrigger>
        ))}
      </TabsList>
      {scoreCourseType.map((_, idx) => (
        <TabsContent value={`wkwk ${idx}`} className="mt-10">
          <ModalAddEditScoreCourse
            isEdit={false}
            type={_}
            initialCourseData={initialCourseData} 
            setScoreCoursesData={setScoreCoursesData}
          />
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            {scoreCoursesData?.map((score: ScoringList, idx) => {
              console.log({score})
              return (
                  <div className="py-5 px-6 bg-white hover:bg-slate-50 rounded-[6px] flex flex-col gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                    onClick={() => router.push(`/scoring/${score.id}`)}
                  >
                    <h3 className="font-medium text-[22px] mb-1">{scoreCourses[_ as keyof ScoreCourseTypeConstant]} {idx + 1}</h3>
                    <h5 className="text-base">{score.title}</h5>
                    <p className="text-sm">{_ ==="ASSIGNMENT" ? "due" : "started at"}, {moment(score.scoreDue).format("LLL")}</p>
                  </div>
              )
            })}
          </section>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Score
