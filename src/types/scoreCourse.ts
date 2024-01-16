export type ScoreCourseTypeConstant = {
  ASSIGNMENT: string
  DAILY_EXAM: string
  MID_EXAM: string
  FINAL_EXAM: string
}

export type ScoreCourseList = {
  id: string
  title: string
  scoreDue: string
  updatedDate: string
  scoreCourseId: string
  score: 0
  status: string
  type: string
}

export type ScoreCourseStudentAllScore = {
  id: string
  name: string
  courseidentifier: string
  grade: number
  curriculumId: string
  scoreCourseStudentDetail: ScoreCourseStudentDetailAllScore[]
}

export type ScoreCourseStudentDetailAllScore = {
  scoreMean: number
  scoreCourseType: string
  scoreCourseDetail: ScoreCourseDetailAllScore[] | []
}

export type ScoreCourseDetailAllScore = {
  id: string
  scoreCourseId: string
  score: number
  status: string
  type: string
  studentId: string
  courseId: string
  classId: string
  academicYearId: string
  createdDate: Date
}

export type ScoreCourseById = {
  id: string
  title: string
  body: string
  type: string
  scoreDue: Date
  classId: string
  courseId: string
  createdDate: Date | string
  course: {
    id: string
    name: string
  }
  class: {
    id: string
    name: string
  }
}

export type ScoringList = {
  id: string
  scoreDue: Date
  title: string
  updatedDate: Date
}

export type ScoringStudentList = {
  id: string
  scoreCourseId: string
  score: number
  status: string
  type: string
  studentId: string
  courseId: string
  classId: string
  academicYearId: string
  createdDate: Date
  updatedDate: Date
  student: {
    id: string
    fullname: string
  }
  school_class: {
    id: string
    name: string
  }
}

// "id": "_e-aJHFlrLQnLV_HpynFycS_DFy4tssXmB4s",
// "scoreCourseId": "IXuBWuCmb9uSqoJXm7TWXoE8OBRaFU6jSoOg",
// "score": 80,
// "status": "DONE",
// "type": "ASSIGNMENT",
// "studentId": "uQkT4XsysINtqcIz-T9hqXMlvyW0CubqO8f2",
// "courseId": "mUjMkrE6m6mk1yp4zuY2YMSTITzyZGrL6k59",
// "classId": "TsRoG7UiNv1BdfR5PN6nBLFMMEzrTuAid0MR",
// "academicYearId": "fGjWruIC6TJaagyEtdCnuWw5QHASEFG8xhse",
// "createdDate": "2024-01-07T10:15:56.000Z",
// "updatedDate": "2024-01-07T10:15:56.000Z",
// "student": {
//     "id": "uQkT4XsysINtqcIz-T9hqXMlvyW0CubqO8f2",
//     "fullname": "Student 4 Testing"
// },
// "school_class": {
//     "id": "TsRoG7UiNv1BdfR5PN6nBLFMMEzrTuAid0MR",
//     "name": "7A"
// }