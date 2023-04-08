import { validateUnitTypes } from "./values"

export const isObject = (data: any): boolean => typeof data === 'object' && !Array.isArray(data) && data !== null

export const isArray = (data: any): boolean => Array.isArray(data)

export const isString = (data: any): boolean => typeof data === 'string'

export const jParse = (data: any) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

export const toString = (data: any): string => {
  let result = String(data)
  if (result === '[object Object]') {
    result = JSON.stringify(data)
  }
  return result
}

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

export const isHTMLElement = function(obj: any): boolean {
  try {
    return !!obj.constructor.__proto__.prototype.constructor.name
  } catch(e) {
    return false
  }
}