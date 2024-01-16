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
import { ScoringStudentList, Option } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Select, { ActionMeta } from "react-select"

type ModalAddEditScoreStudentType = {
  initialData: ScoringStudentList
  setStudentData?: React.Dispatch<React.SetStateAction<ScoringStudentList[]>>
}

const statusOption = [
  { label: "Completed ✅", value: "DONE" },
  { label: "Not Done ❌", value: "NOT_DONE" }
]

const ModalAddEditScoreStudent: React.FC<ModalAddEditScoreStudentType> = ({ initialData, setStudentData }) => {
  const { axiosJWT } = useSessionUser()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [score, setScore] = useState<number>(initialData.score)
  const [selectedStatus, setSelectedStatus] = useState<Option>(
    statusOption.find((option: Option) => option.value === initialData.status) || statusOption[0]
  )
  const [msgError, setMsgError] = useState<string>("");

  const submitReminder = async () => {
    try {
      if (!selectedStatus || !score) return setMsgError("Semua field wajib diisi!")
      if (isNaN(score)) return setMsgError("Score harus berupa angka")

      const response = await axiosJWT.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mardiyuana-teacher/score-course/score-course-student`,
        {
          // id,
          scoreCourseStudentId: initialData.id,
          score,
          status: selectedStatus.value,
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        }
      );
      if (response?.data?.statusCode === "000") {
        toast({
          title: `Berhasil mengubah nilai & status"`,
          // description: "Silahkan cek data kurikulum pada kolom yang tersedia. Perhatikan kembali tahun ajaran mana yang ingin diaktifkan",
          className: "bg-white"
        })
  
        // setReminderCourses()
      } else {
        toast({
          title: "Gagal mengubah nilai dan status.",
          description: response?.data?.message,
          className: "bg-red-200"
        })
      }

      setStudentData && setStudentData(prevState => {
        // Map over the previous state and update the target object
        return prevState.map(obj => {
          if (obj.id === initialData.id) {
            // Return a new object with the updated value
            return { ...obj, status: selectedStatus.value, score };
          }
          // Return other objects as is
          return obj;
        });
      });

      // setTimeout(() => {
      //   window.location.reload(); // You can use other methods to refresh the page if needed
      // }, 2000);
      setIsModalOpen(!isModalOpen)
    } catch (error: any) {
      console.error(error.response.data.message);
      toast({
        title: "Gagal mengubah nilai dan status.",
        description: error.response.data.message,
        className: "bg-red-200"
      })
    }
  }

  const handleSelectStatus = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    option && setSelectedStatus(option);
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the input is a valid number between 0 and 100
    if (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 100) {
      setScore(Number(value))
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(val) => {
        setIsModalOpen(val)
      }}
    >
      <DialogTrigger asChild>
        <Button variant={'outline'} className="flex items-center px-4 py-2 font-medium rounded-xl hover:opacity-95">
          <Icon icon="mingcute:edit-line" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] lg:w-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Student Score</DialogTitle>
          {/* <DialogDescription>Masukkan judul, deskripsi dan tanggal yang anda inginkan.</DialogDescription> */}
          <hr className="h-[2px] bg-[#AFAFAF]" />
        </DialogHeader>
        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Status
            </label>
            <Select
              name="class"
              className="basic-single w-full min-w-28 rounded-xl"
              value={selectedStatus}
              classNamePrefix="select"
              isClearable={false}
              isSearchable={false}
              defaultValue={selectedStatus}
              options={statusOption}
              placeholder="Pilih Status"
              onChange={handleSelectStatus}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Score (Nilai)
            </label>
            <input id="title" placeholder="Masukkan Nilai" className="border broder-slate-400 p-2 rounded-[6px]" 
              onChange={handleScoreChange}
              defaultValue={initialData?.score}
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

export default ModalAddEditScoreStudent
