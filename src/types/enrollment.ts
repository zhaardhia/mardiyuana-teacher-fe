export type OptionEnrollmentCourseList = {
  id: string
  studentName?: string
  classId: string
  className: string
  status?: string
  academicYearId: string
  academicYear: string
}

export type EnrollmentStudentOnCourseList = {
  id: string
  classId: string
  className: string
  academicYearId: string
  academicYear: string
}

export type EnrollmentListTeacherClass = {
  id: string
  academicYearId: string
  academicYear: string
  classId: string
  className: string
  status: string
  teacherType: string
  courseId: string
  courseName: string
}
