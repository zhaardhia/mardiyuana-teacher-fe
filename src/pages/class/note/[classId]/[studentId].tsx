import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useSessionUser } from "@/contexts/SessionUserContexts"
import { ScoreCourseStudentAllScore, ScoreCourseStudentDetailAllScore, ClassStudentList, TeacherNotes } from "@/types"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import moment from "moment";
import { useRouter } from "next/router";
import ModalAddEditTeacherNote from "@/components/teacherNote/ModalAddEditTeacherNote";
import ModalDeleteTeacherNote from "@/components/teacherNote/ModalDeleteTeacherNote";

const ClassPage = () => {
  const router = useRouter();
  const { studentId, classId } = router.query;
  const { state, axiosJWT } = useSessionUser()
  const [teacherNote, setTeacherNote] = useState<TeacherNotes[]>([]);
  

  useEffect(() => {
    if (studentId && classId) fetchTeacherNote()
  }, [studentId, classId])

  const fetchTeacherNote = async () => {
    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/teacher-note?studentId=${studentId}&classId=${classId}`)
      console.log({response})
      if (response?.data?.statusCode === "000") {
        setTeacherNote(response?.data?.data);
      } else {
        throw Error("Fetch data error.")
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log({teacherNote})
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Teacher Notes</h1>
        <h1 className="text-2xl font-semibold">{teacherNote && teacherNote[0]?.school_class?.name}</h1>
      </div>

      <hr className="h-[2px] border-dotted w-[90%] mx-auto border-slate-300" />
      <div className="w-[90%] mx-auto mt-5 flex flex-col gap-5">
        <ModalAddEditTeacherNote setTeacherNote={setTeacherNote} isEdit={false} />
        {teacherNote?.map((note: TeacherNotes) => (
          <div className="rounded-xl bg-white py-4 shadow-lg">
            <div className="flex items-center gap-4 px-4 ">
              <img src="/photo_teacher.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
              <div className="flex flex-col">
                <h3 className="font-semibold text-xl">{note.teacherName}.</h3>
                <p className="font-normal">
                  Teacher | {note.school_class.name} <span className="ml-4">{moment(note.createdDate).format("LLL")}</span>
                </p>
              </div>
            </div>

            <h4 className="font-medium text-xl mt-4 px-4 py-2">{note.title}</h4>
            <hr className="h-[2px] border-dotted w-[100%] mx-auto border-slate-300" />
            <p className="text-justify mt-2 px-4 py-2">
              {note.body}
            </p>
            <div className="flex gap-2 px-4 my-2">
              <ModalAddEditTeacherNote setTeacherNote={setTeacherNote} isEdit={true} initialData={note} />
              {/* <Button variant={"destructive"}>Delete</Button> */}
              <ModalDeleteTeacherNote
                id={note.id}
                title={note.title} 
                allNotes={teacherNote}
                setTeacherNote={setTeacherNote}
              />
            </div>
          </div>
        ))}

        {teacherNote.length < 1 && (
          <p>Belum ada notes untuk orang tua murid ini.</p>
        )}
      </div>
      
    </Layout>
  );
};

export default ClassPage;
