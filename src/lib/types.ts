export type UnitValue = string | number | null

export type UnitValidator = 0 | 1 | 2 | 3 | 4 

export type TvalObject = {
  key: string, 
  value: string | number | null 
  validator: 2, 
  result: TvalResult
}

export type TvalResult = boolean | 'NO CHECK' | 'UNDEFINED'