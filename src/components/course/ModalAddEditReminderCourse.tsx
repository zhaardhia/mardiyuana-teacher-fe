import React, { useState } from 'react'
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
import { InitialCourseData, ReminderCourseList } from '@/types';

type ModalAddEditReminderType = {
  isEdit: boolean
  initialData?: InitialCourseData
  setReminderCourses?: React.Dispatch<React.SetStateAction<ReminderCourseList[]>>;
  courseSectionId: string | undefined
  classId?: string
  academicYearId?: string
  id?: string
  editInitialData?: { title: string | undefined, body: string | undefined }
}
const ModalAddEditReminderCourse: React.FC<ModalAddEditReminderType> = ({ isEdit, initialData, setReminderCourses, courseSectionId, academicYearId, classId, id, editInitialData }) => {
  const mainWording = isEdit ? "Edit" : "Tambah"
  const { axiosJWT } = useSessionUser()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(editInitialData?.title || "");
  const [body, setBody] = useState<string>("");
  const [msgError, setMsgError] = useState<string>(editInitialData?.body || "");

  const submitReminder = async () => {
    try {
      // axios.defaults.withCredentials = true
      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/course/reminder-course`,
        {
          ...(isEdit && { id: id }),
          title,
          body,
          classId: initialData?.class.id || classId,
          academicYearId: initialData?.academicYear.id || academicYearId,
          courseSectionId
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        }
      );
      if (response?.data?.statusCode === "000") {
        toast({
          title: `Berhasil ${mainWording} Reminder!"`,
          // description: "Silahkan cek data kurikulum pada kolom yang tersedia. Perhatikan kembali tahun ajaran mana yang ingin diaktifkan",
          className: "bg-white"
        })
  
        // setReminderCourses()
      } else {
        toast({
          title: "Gagal mengubah / menambahkan reminder.",
          description: response?.data?.message,
          className: "bg-red-200"
        })
      }
      setTimeout(() => {
        window.location.reload(); // You can use other methods to refresh the page if needed
      }, 2000);
      setIsModalOpen(!isModalOpen)
    } catch (error: any) {
      console.error(error.response.data.message);
      toast({
        title: "Gagal mengubah / menambahkan reminder.",
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
        <button className="flex items-center px-4 py-2 text-white font-medium rounded-xl bg-[#2F9757] hover:opacity-95">
          <Icon icon="charm:plus" /> {mainWording} Reminder
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] lg:w-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl">{mainWording} Reminder</DialogTitle>
          <DialogDescription>Masukkan judul dan deskripsi yang anda inginkan.</DialogDescription>
          <hr className="h-[2px] bg-[#AFAFAF]" />
        </DialogHeader>
        <div className="flex flex-col gap-3">

          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Judul
            </label>
            <input id="title" placeholder="Masukkan Judul" className="border broder-slate-400 p-2 rounded-[6px]" 
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={editInitialData?.title}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Deskripsi
            </label>
            <textarea id="title" placeholder="Masukkan Deskripsi" className="border broder-slate-400 p-2 rounded-[6px] h-[10rem]" 
              onChange={(e) => setBody(e.target.value)}
              defaultValue={editInitialData?.body}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={submitReminder}
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-white font-medium rounded-xl bg-[#2F9757] hover:opacity-95"
          >
            {mainWording} Reminder
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddEditReminderCourse