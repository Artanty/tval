import { validateUnitTypes } from "./values"

export const isObject = (data: any): boolean => typeof data === 'object' && !Array.isArray(data) && data !== null

export const isArray = (data: any): boolean => Array.isArray(data)

export const concat = (...strings: string[]) => strings.join('')

export const numberToType = (typeNumber: number | number[], noBrackets: boolean = false): string => {
  const wrap = (data: string) => noBrackets ? data : concat('(', data, ')')
  if (Array.isArray(typeNumber)) {
    const appendDelimiter = (i: number): string => ((typeNumber.length > 1) && (typeNumber.length - 1 > i)) ? ' | ' : ''
    const result: string = typeNumber.reduce((acc: string, curr: number, i: number) => acc + numberToType(curr, true) + appendDelimiter(i), '')
    return wrap(result)
  } else {
    return wrap(validateUnitTypes[typeNumber])
  }
}
