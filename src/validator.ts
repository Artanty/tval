function v (value: any, validator: any) {
  if (validator === undefined) {
    return 'SKIPPED'
  } else {
    let result
    const validateUnitTypes = ['string', 'number', 'object']
    if (Array.isArray((validator))) {
      console.log('V-validator is array')
      for (let i = 0; i < validator.length; i++) {
        result = typeof value === validateUnitTypes[+validator[i] - 1]
        if (result === true) {
          break;  
        }
      }
      return result
    } else {
      // console.log('V-validator is NOT array')
      // console.log(validateUnitTypes[+validator - 1])
      // console.log(typeof value)
      // console.log('V')
      // console.log(typeof value === validateUnitTypes[+validator - 1])
      result = (typeof value === validateUnitTypes[+validator - 1])
      return result
    }
  }
}


export function preV (obj: any, check: any) {
  console.log('START', obj, check)
  let result: any
  if (check === undefined) {
    result = 'SKIPPED'
  } else if (obj === undefined) {
    result = false
  } else {
    if (Array.isArray(obj)) {
      result = []
      obj.forEach((el, i) => {
        result.push(preV(el, check[0])) //check.length === obj.length ? i : 
      })
    } else if (obj === null) {
      if (Array.isArray(check)) {
        result = check.some(checkOne => v(obj, checkOne))
      } else {
        result = v(obj, check)
      }
    } else if (typeof obj === 'object') {
      result = {}
      let newObj = {} as any
      Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key]
        } 
      })
      if (Array.isArray(check)) {
        let checks: any
        check.forEach(checkOne => {
          const eachCheckResult = preV(obj, checkOne)
          if (!Object.values(eachCheckResult).find(el => el === false || el === 'SKIPPED')) {
            checks = eachCheckResult
          }
        })
        if (!checks) {
          Object.keys(newObj).forEach((key) => {
            if (Array.isArray(check[key as any])) {
              let checks2: any
              check[key as any].forEach((checkOne2: any) => {
                const eachCheckResult2 = preV(newObj[key], checkOne2)
                if (!Object.values(eachCheckResult2).find(el => el === false || el === 'SKIPPED')) {
                  checks2 = eachCheckResult2
                }
              })
              if (checks2) {
                result[key] = checks2 || false 
              }
            } else {
              result[key] = preV(newObj[key], check[key as any])  
            }
          })
        } else {
          result = checks
        }
          
        
      } else {
        Object.keys(obj).forEach((key) => {
          if (obj.hasOwnProperty(key)) {
            result[key] = preV(obj[key], check[key])
          } 
        })
      }
      
    } else {
      if (Array.isArray(check)) {
        result = check.some(checkOne => preV(obj, checkOne))
      } else {
        result = v(obj, check) 
      }
    }
  }
  return result
}
