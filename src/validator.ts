import { isObject, concat, isArray } from "./helpers"
import { TvalObject, TvalResult, UnitValidator, UnitValue } from "./types"
import { VAL_TYPE, validateUnitTypes } from "./values"

export class Tval {
  result: TvalObject[] = []
  constructor(data: any, rules: any) {
    this.process(data, rules)
  }

  process (data: any, check: any, key: string = '') {
    let result: any
    if (check === undefined) {
      result = this.wrapResult(data, check, 'NO CHECK', key)
    } else if (data === undefined) {
      result = this.wrapResult(data, check, 'UNDEFINED', key)
    } else if (data === null) {
      result = this.wrapResult(data, check, this.assignValidation(data, check), key)
    } else {
      if (isObject(data)) {
        result = {}
        Object.keys(data).forEach((objKey: any) => {
          if (data.hasOwnProperty(objKey)) {
            result[objKey] = this.process(data[objKey], check[objKey], concat(key, key ? '.' : '', objKey))
          }
        })
      } else if (isArray(data)) {
        result = []
        data.forEach((el: any, i: number) => {
          result.push(this.process(el, check[0], concat(key, '[' + i + ']')))
        })
      } else {
        result = this.wrapResult(data, check, this.assignValidation(data, check), key)
      }
    }
    return result
  }

  assignValidation (data: any, check: any): TvalResult {
    if (check && Array.isArray(check) && check.length) {
      return check.some((el: any) => this.validateUnit(data, el))
    } else {
      return this.validateUnit(data, check)
    }
  }

  validateUnit (value: UnitValue, validator: UnitValidator): TvalResult {
    let result
    if (validator === VAL_TYPE.NULL) {
      return value === null
    } else if (validator === VAL_TYPE.ANY) {
      return true
    } else {
      result = (typeof value === validateUnitTypes[+validator])
    }
    return result
  }

  wrapResult (data: any, check: any, result: TvalResult, key: string) {
    if (isObject(data)) {
      data = JSON.stringify(data)
    }
    this.result.push({ key: key, value: data, validator: check, result: result })
  }
  
}