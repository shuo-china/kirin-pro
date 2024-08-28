import { definePropType } from '@/utils/prop'
import { FormItemProps } from 'element-plus'
import tableColumnProps from 'element-plus/es/components/table/src/table-column/defaults.mjs'
import { SearchTransform } from '../ProTable/context'

const proTableSearchType = ['input', 'select', 'date-picker'] as const

export type ProTableSearchType = (typeof proTableSearchType)[number]

export const proTableColumnProps = {
  search: {
    type: Boolean,
    default: false
  },
  searchField: {
    type: String
  },
  searchType: {
    type: definePropType<ProTableSearchType>(String),
    default: 'input',
    validator: (value: any) => proTableSearchType.includes(value)
  },
  searchItemProps: {
    type: definePropType<Partial<FormItemProps>>(Object)
  },
  searchFieldProps: {
    type: Object
  },
  searchTransform: {
    type: definePropType<SearchTransform>(Function)
  }
} as const

export type ProTableColumnProps = typeof proTableColumnProps & typeof tableColumnProps
