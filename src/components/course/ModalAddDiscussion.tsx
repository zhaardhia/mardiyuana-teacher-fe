import React from "react";
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

const ModalAddDiscussion = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 text-white font-medium rounded-xl bg-[#2F9757] hover:opacity-95">
          <Icon icon="material-symbols:add" /> Add Discussion
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Discussion</DialogTitle>
          <DialogDescription>Create new discussion with others</DialogDescription>
          <hr className="h-[2px] bg-[#AFAFAF]" />
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 w-1/2 border border-slate-400 rounded-[6px] p-3">
            <div className="flex flex-col gap-2 col-span-2">
              <p>Class</p>
              <p>Choose chapter</p>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <p>IPA-1</p>
              <p className="flex items-center gap-2">
                {"<"} 4 {">"}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="title" className="text-slate-800 font-medium">
              Judul
            </label>
            <input id="title" placeholder="Masukkan Judul" className="border broder-slate-400 p-2 rounded-[6px]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-slate-800 font-medium">
              Deskripsi
            </label>
            <textarea
              id="description"
              placeholder="Masukkan Deskripsi"
              rows={5}
              className="border broder-slate-400 p-2 rounded-[6px]"
            ></textarea>
          </div>
        </div>
        <DialogFooter>
          <button
            type="submit"
            className="flex items-center px-4 py-2 text-white font-medium rounded-xl bg-[#2F9757] hover:opacity-95"
          >
            <Icon icon="material-symbols:add" /> Add Discussion
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddDiscussion;
