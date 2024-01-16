import React, { useState, ChangeEvent } from 'react'
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
import { ScoringStudentList, Option, TeacherNotes } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';

type ModalAddEditTeacherNoteType = {
  isEdit: Boolean
  initialData?: TeacherNotes
  setTeacherNote: React.Dispatch<React.SetStateAction<TeacherNotes[]>>
}

const ModalAddEditTeacherNote: React.FC<ModalAddEditTeacherNoteType> = ({ 
  initialData, setTeacherNote, isEdit
}) => {
  const router = useRouter();
  const { studentId, classId } = router.query;
  const { axiosJWT } = useSessionUser()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(initialData ? initialData.title : "")
  const [body, setBody] = useState<string>(initialData ? initialData.body : "")
  const [msgError, setMsgError] = useState<string>("");

  const submitReminder = async () => {
    try {
      if (!title || !body) return setMsgError("Semua field wajib diisi!")

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/teacher-note`,
        {
          ...(isEdit && { id: initialData?.id }),
          title,
          body,
          studentId,
          classId
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        }
      );
      if (response?.data?.statusCode === "000") {
        toast({
          title: `Berhasil menambahkan / mengubah notes"`,
          // description: "Silahkan cek data kurikulum pada kolom yang tersedia. Perhatikan kembali tahun ajaran mana yang ingin diaktifkan",
          className: "bg-white"
        })
  
        // setReminderCourses()
      } else {
        toast({
          title: "Gagal menambahkan / mengubah notes.",
          description: response?.data?.message,
          className: "bg-red-200"
        })
      }

      if (isEdit && initialData) {
        setTeacherNote && setTeacherNote(prevState => {
          // Map over the previous state and update the target object
          return prevState.map(obj => {
            if (obj.id === initialData.id) {
              // Return a new object with the updated value
              return { ...obj, title, body};
            }
            // Return other objects as is
            return obj;
          });
        });
      } else {
        setTimeout(() => {
          window.location.reload(); // You can use other methods to refresh the page if needed
        }, 2000);
      }

      setIsModalOpen(!isModalOpen)
    } catch (error: any) {
      console.error(error.response.data.message);
      toast({
        title: "Gagal menambahkan / mengubah notes",
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
          // isEdit && "mt-5"
        )}>
          <Icon icon={!isEdit ? "charm:plus" : "mingcute:edit-line"} /> {isEdit ? " Edit" : " Tambah Notes"}
        </Button>
        {/* <Button variant={'outline'} className="flex items-center px-4 py-2 font-medium rounded-xl hover:opacity-95">
          <Icon icon="mingcute:edit-line" />
        </Button> */}
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] lg:w-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl">{isEdit ? "Edit " : "Tambah"} Notes</DialogTitle>
          {/* <DialogDescription>Masukkan judul, deskripsi dan tanggal yang anda inginkan.</DialogDescription> */}
          <hr className="h-[2px] bg-[#AFAFAF]" />
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Judul
            </label>
            <input id="title" placeholder="Masukkan Notes" className="border broder-slate-400 p-2 rounded-[6px]" 
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Deskripsi
            </label>
            <textarea id="title" placeholder="Masukkan Deskripsi" className="border broder-slate-400 p-2 rounded-[6px]" 
              onChange={(e) => setBody(e.target.value)}
              defaultValue={body}
            />
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

export default ModalAddEditTeacherNote
