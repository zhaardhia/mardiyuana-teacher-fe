import Layout from "@/components/Layout";
import React, { useState } from "react";
import Select, { ActionMeta } from "react-select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { CourseList, Option, OptionEnrollmentCourseList, EnrollmentStudentOnCourseList } from "@/types"
import dynamic from "next/dynamic";
import { AcademicYearEnrolled, EnrollmentListTeacherClass } from "@/types"
import { useSessionUser } from "@/contexts/SessionUserContexts"
import moment from "moment";
import 'moment/locale/id';  // Import the Indonesian locale
// import moment from 'moment-timezone';
// moment.tz.setDefault('Asia/Jakarta');
moment.locale('id');

const CoursePage = () => {
  const { axiosJWT } = useSessionUser()
  const [optionAcademicYear, setOptionAcademicYear] = useState<Option[]>()
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<Option>();
  const [enrollmentTeacher, setEnrollmentTeacher] = useState<EnrollmentListTeacherClass[]>();
  const [courses, setCourses] = useState<CourseList[]>()
  const handleSelectClass = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    option && setSelectedAcademicYear(option);
  };

  React.useEffect(() => {
    fetchData()
  }, [selectedAcademicYear])

  const fetchData = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/enrollment/class${selectedAcademicYear ? `?academicYearId=${selectedAcademicYear.value}` : ""}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
      },
    })
    console.log({response})
    if (response?.data?.statusCode === "000") {
      if (!selectedAcademicYear) {
        const findAcademicYear = response?.data?.data?.listAcademicYear?.find((ay: AcademicYearEnrolled) => ay.status === "ACTIVE")
        setSelectedAcademicYear(
          { label: findAcademicYear.academicYear, value: findAcademicYear.id }
        )
      }

      setOptionAcademicYear(response?.data?.data?.listAcademicYear?.map((ay: AcademicYearEnrolled) => { 
        return { label: ay.academicYear, value: ay.id }
      }))
      console.log("list", response?.data?.data?.listAcademicYear?.map((ay: AcademicYearEnrolled) => { 
        return { label: ay.academicYear, value: ay.id }
      }))

      setEnrollmentTeacher(response?.data?.data?.enrollmentTeacherClass)
    }
  }
  console.log({optionAcademicYear, enrollmentTeacher})
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Pelajaran</h1>
        <p>{moment().locale("id").format('llll')}</p>
      </div>

      <hr className="h-[2px] border-dotted w-[90%] mx-auto border-slate-300" />

      <div className="my-5 w-[90%] mx-auto py-3 flex gap-14 items-center max-w-[1400px]">
        <Select
          name="class"
          className="basic-single w-[50%] min-w-28 rounded-xl"
          value={selectedAcademicYear}
          classNamePrefix="select"
          isClearable={false}
          isSearchable={false}
          defaultValue={optionAcademicYear && optionAcademicYear[0]}
          options={optionAcademicYear}
          placeholder="Pilih Kelas"
          onChange={handleSelectClass}
        />
      </div>
      

      <div className="w-[90%] mx-auto flex flex-col gap-4 items-center max-w-[1400px]">
        {enrollmentTeacher?.map((_: EnrollmentListTeacherClass, idx: number) => (
          <div className="border-b border-slate-400 w-full flex justify-between items-center py-3">
            <div>
              <p className="text-lg">{_.className}: {_.courseName}</p>
            </div>
            <Link href={`/course/detail/${_.id}/${_.courseId}`} className="hover:underline text-blue-600">
              Detail
            </Link>
          </div>
        ))}
        {/* <Accordion type="single" collapsible className="w-full">
          {enrollmentTeacher?.map((_: EnrollmentListTeacherClass, idx: number) => (
            <AccordionItem value={`item-${idx}`} className="border-b border-slate-400" key={_.id}>
              <AccordionTrigger className="text-lg py-7">{_.className}: {_.courseName}</AccordionTrigger>
              <AccordionContent>
                
                <Link href={`/course/detail/${_.id}/${_.courseId}`} className="hover:underline text-blue-600">
                  More detail
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion> */}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CoursePage), {
  ssr: false,
});
