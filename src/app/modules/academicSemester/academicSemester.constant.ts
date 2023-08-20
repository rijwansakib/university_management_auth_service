import { Code, Month, Title } from './academicSemester.interface'

export const academicSemesterTitle: Title[] = ['Autumn', 'Summer', 'Fall']
export const academicSemesterCode: Code[] = ['01', '02', '03']
export const academicSemesterMonths: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitleCodeMaper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterSeacrchableFields = ['title', 'code', 'year']

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
