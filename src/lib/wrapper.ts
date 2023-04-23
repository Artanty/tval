import { Table } from 'console-table-printer'
import { isHTMLElement, numberToType } from '@lib/helpers'
import { TvalObject } from '@lib/types'
import { validHTMLElements } from '@lib/values'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { printTable } = require('console-table-printer')

const createOrReturnHTMLElement = (el: HTMLElement | string): HTMLElement => {
  if (isHTMLElement(el)) {
    return el as HTMLElement
  }
  try {
    if (typeof el !== 'string') {
      throw new Error(`\'${el}\' must be a string, ${typeof el} given`)
    } else if (!validHTMLElements.includes(el)) {
      throw new Error(`\'${el}\' is not a valid tagName, valid names are: ${validHTMLElements.join(', ')}`)
    } else {
      return document.createElement(el)
    }
  } catch (e) {
    throw e
  }
}

const appendChildrenWithTextNodes = (parent: HTMLElement | string, childNodeName: string, childrenData: any[]): HTMLElement => {
  try {
    if (!Array.isArray(childrenData)) {
      throw new Error('Child data is not an array')
    } else if (!childrenData.length) {
      throw new Error('Child data array is empty')
    } else {
      const parentEl = createOrReturnHTMLElement(parent)
      childrenData.forEach((childContent: string) => {
        const newChild = document.createElement(childNodeName)
        const content = String(childContent)
        if (content === '[object Object]') {
          throw new Error(`Can\'t convert ${JSON.stringify(childContent)} to string`)
        }
        const newChildContent = document.createTextNode(content)
        newChild.appendChild(newChildContent)
        parentEl.appendChild(newChild)
      })
      return parentEl
    }
  } catch (e) {
    throw e
  }
}

export const tablize = (wrapperId: string, tvalResult: TvalObject[]): void => {
  try {
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper) {
      throw new Error(`Container element is not found by id ${wrapperId}`)
    }
    const table = document.createElement('table')
    table.classList.add('tvalTable')
    const thead = table.createTHead()
    const theadRow = thead.insertRow()
    appendChildrenWithTextNodes(theadRow, 'th', ['Type', 'isMatched', 'Prop', 'Value'])
    const tbody = table.createTBody()
    tvalResult.forEach((el: TvalObject) => {
      const tr = tbody.insertRow()
      appendChildrenWithTextNodes(tr, 'td', [numberToType(el.validator), el.result, el.key, el.value])     
    })
    table.appendChild(tbody)
    wrapper.appendChild(table)
  } catch (e) {
    throw e
  }
}

export const tvalLog = (tvalResults: TvalObject[], onlyFalsy: boolean = false): void => {
  try {
    if (!tvalResults.length || !tvalResults?.[0]?.key) {
      throw new Error('Некорректный результат Tval')
    }
    if (onlyFalsy) {
      tvalResults = tvalResults.filter((el: TvalObject) => el.result !== true)
    }
    const p = new Table({
      title: 'Tval result',
      columns: [
        { name: 'type', alignment: 'left', color: 'black'},
        { name: 'isMatched', alignment: 'left'},
        { name: 'prop', alignment: 'left', color: 'black'},
        { name: 'value', alignment: 'left', color: 'black' }
      ]
    })
    tvalResults.forEach((tvalResult: TvalObject) => {
      const consoleTvalObject: any = {
        type: numberToType(tvalResult.validator),
        isMatched: tvalResult.result,
        prop: tvalResult.key,
        value: tvalResult.value
      }
      p.addRow(consoleTvalObject, { color: tvalResult.result === true ? 'green' : 'red' })
    })
    p.printTable()
  } catch (e) {
    throw e
  }
}

