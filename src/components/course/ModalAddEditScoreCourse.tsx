import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { useSessionUser } from "@/contexts/SessionUserContexts";
import { useToast } from "../ui/use-toast";
import { InitialCourseData, ReminderCourseList, ScoreCourseList, ScoringList, ScoreCourseById } from '@/types';
import { DatePicker } from '../DatePicker';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type ListScoreCourse = {
  id: string
  scoreDue: Date
  title: string
  updatedDate: Date
}

type ModalAddEditReminderType = {
  isEdit: boolean
  initialData?: ReminderCourseList
  initialCourseData?: InitialCourseData | undefined
  setScoreCoursesData?: React.Dispatch<React.SetStateAction<ScoringList[]>>
  setScoreCourseDetail?: React.Dispatch<React.SetStateAction<ScoreCourseById | null>>
  initialScoreCourseDetail?: ScoreCourseById | null
  type?: string
}

const objTypeScore = {
  ASSIGNMENT: "Assignment (Tugas)",
  DAILY_EXAM: "Daily Exam (Ulangan Harian)",
  MID_EXAM: "Mid Exam (Ujian Tengah Semester)",
  FINAL_EXAM: "Final Exam (Ujian Akhir Semester)"
}

type TypeScoreType = {
  ASSIGNMENT: string
  DAILY_EXAM: string
  MID_EXAM: string
  FINAL_EXAM: string
}

const ModalAddEditScoreCourse: React.FC<ModalAddEditReminderType> = ({ 
  isEdit, initialData, type, initialCourseData, setScoreCoursesData, initialScoreCourseDetail, setScoreCourseDetail
}) => {
  console.log({initialScoreCourseDetail})
  const mainWording = isEdit ? " Edit" : " Tambah"
  const { axiosJWT } = useSessionUser()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(initialScoreCourseDetail?.title || "");
  const [body, setBody] = useState<string>(initialScoreCourseDetail?.body || "");
  const [date, setDate] = useState<Date>(
    initialScoreCourseDetail?.scoreDue
    ? new Date(initialScoreCourseDetail.scoreDue)
    : new Date()
  )
  const [msgError, setMsgError] = useState<string>("");
  console.log({initialCourseData, body, title})

  useEffect(() => {
    if (initialScoreCourseDetail) {
      setBody(initialScoreCourseDetail?.body)
      setTitle(initialScoreCourseDetail?.title)
    }
  }, [initialScoreCourseDetail])

  const submitReminder = async () => {
    try {
      console.log({title, body, date})
      if (!title || !body || !date) return setMsgError("Semua field wajib diisi!")

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/score-course`,
        {
          ...(isEdit && { id: initialScoreCourseDetail?.id }),
          title,
          body,
          type: type || initialScoreCourseDetail?.type,
          scoreDue: date,
          classId: initialCourseData?.class.id || initialScoreCourseDetail?.class.id,
          courseId: initialCourseData?.course.id || initialScoreCourseDetail?.course.id
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        }
      );
      if (response?.data?.statusCode === "000") {
        toast({
          title: `Berhasil ${mainWording} tugas / ujian!`,
          // description: "Silahkan cek data kurikulum pada kolom yang tersedia. Perhatikan kembali tahun ajaran mana yang ingin diaktifkan",
          className: "bg-white"
        })
  
        // setReminderCourses()
      } else {
        toast({
          title: "Gagal mengubah / menambahkan tugas atau ujian.",
          description: response?.data?.message,
          className: "bg-red-200"
        })
      }

      if (!isEdit) {
        const newId: string = response.data.data.id

        setScoreCoursesData && setScoreCoursesData((prevScoreCourses: ScoringList[]) => [...prevScoreCourses, { title, scoreDue: date, updatedDate: new Date(), id: newId }]);
      } else if (isEdit) {
        setTimeout(() => {
          window.location.reload(); // You can use other methods to refresh the page if needed
        }, 2000);
      }

      // setTimeout(() => {
      //   window.location.reload(); // You can use other methods to refresh the page if needed
      // }, 2000);
      setIsModalOpen(!isModalOpen)
    } catch (error: any) {
      console.error(error.response.data.message);
      toast({
        title: "Gagal mengubah / menambahkan tugas atau ujian.",
        description: error.response.data.message,
        className: "bg-red-200"
      })
    }
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(val) => {
        setIsModalOpen(val)
      }}
    >
      <DialogTrigger asChild>
        <Button variant={'outline'} className={cn("flex items-center px-4 py-2  font-medium rounded-xl hover:opacity-95",
          isEdit && "mt-5"
        )}>
          <Icon icon={!isEdit ? "charm:plus" : "mingcute:edit-line"} /> {mainWording} {objTypeScore[type as keyof TypeScoreType]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] lg:w-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl">{mainWording} {objTypeScore[type as keyof TypeScoreType]}</DialogTitle>
          <DialogDescription>Masukkan judul, deskripsi dan tanggal yang anda inginkan.</DialogDescription>
          <hr className="h-[2px] bg-[#AFAFAF]" />
        </DialogHeader>
        <div className="flex flex-col gap-3">

          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Judul
            </label>
            <input id="title" placeholder="Masukkan Judul" className="border broder-slate-400 p-2 rounded-[6px]" 
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={initialScoreCourseDetail?.title}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Deskripsi
            </label>
            <textarea id="title" placeholder="Masukkan Deskripsi" className="border broder-slate-400 p-2 rounded-[6px] h-[10rem]" 
              onChange={(e) => setBody(e.target.value)}
              defaultValue={initialScoreCourseDetail?.body}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Tanggal
            </label>
            <DatePicker setState={setDate} state={date} />
          </div>
        </div>
        <p className={cn("text-red-500", msgError.length > 0 ? "block" : "hidden")}>{msgError}</p>
        <DialogFooter>
          <button
            onClick={submitReminder}
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-white font-medium rounded-xl bg-[#2F9757] hover:opacity-95"
          >
            Simpan
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddEditScoreCourse
