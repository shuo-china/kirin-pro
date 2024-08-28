import { Options, Service } from '@/hooks/usePagination'
import { definePropType } from '@/utils/prop'
import { PaginationProps } from 'element-plus'
import tableProps from 'element-plus/es/components/table/src/table/defaults.mjs'

export const proTableProps = {
  request: {
    type: definePropType<Service>(Function),
    required: true
  },
  requestOptions: {
    type: definePropType<Options>(Object)
  },
  paginationProps: {
    type: definePropType<Partial<PaginationProps>>(Object)
  }
} as const

export type ProTableProps = typeof proTableProps & typeof tableProps
