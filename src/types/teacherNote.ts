export type TeacherNotes = {
  id: string
  title: string
  body: string
  teacherId: string
  teacherName: string
  studentId: string
  parentId: string
  academicYearId: string
  classId: string
  createdDate: Date
  school_class: {
    id: string
    name: string
  }
}
