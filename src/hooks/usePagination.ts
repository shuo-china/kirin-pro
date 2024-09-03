import { pagination as paginationConfig } from '@/config'
import useRequest from './useRequest'
import { merge } from 'lodash'
import { Options, Service } from './useRequest/type'

interface PaginationType {
  pageKey: string
  pageSizeKey: string
  totalKey: string
  dataKey: string
}

export interface PaginationExtendsOption {
  pagination?: Partial<PaginationType>
}

export interface PaginationOptions<R = any, P extends unknown[] = any>
  extends Options<R, P>,
    PaginationExtendsOption {}

const defaultPaginationOptions: PaginationType = {
  // reuqest keys
  pageKey: paginationConfig.requestPageKey,
  pageSizeKey: paginationConfig.requestPageSizeKey,
  // response keys
  totalKey: paginationConfig.responseTotalKey,
  dataKey: paginationConfig.responseDataKey
}

function usePagination<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: PaginationOptions<R, P> = {}
) {
  const { pagination, ...restOptions } = options

  const { pageKey, pageSizeKey, totalKey, dataKey } = Object.assign(
    {},
    defaultPaginationOptions,
    pagination
  )

  const defaultParams = [
    {
      [pageKey]: 1,
      [pageSizeKey]: paginationConfig.defaultPageSize
    }
  ]

  const finallyOptions = merge(
    {
      defaultParams
    },
    restOptions
  ) as Options<R, P>

  const {
    data: responseData,
    loading,
    params,
    run,
    refresh
  } = useRequest<R, P>(service, finallyOptions, { params: defaultParams as P })

  const paging = (paginationParams?: Record<string, any>) => {
    const [oldPaginationParams, ...restParams] = (params.value as P[]) || []
    const newPaginationParams = { ...oldPaginationParams, ...paginationParams }
    const mergerParams = [newPaginationParams, ...restParams] as P
    run(...mergerParams)
  }

  const changePage = (page: number, otherParams?: Record<string, any>) => {
    paging({ [pageKey]: page, ...otherParams })
  }

  const changePageSize = (pageSize: number, otherParams?: Record<string, any>) => {
    paging({ [pageSizeKey]: pageSize, ...otherParams })
  }

  const total = computed(
    () => responseData.value?.[totalKey as PaginationConfig['responseTotalKey']] || 0
  )

  const data = computed(
    () => responseData.value?.[dataKey as PaginationConfig['responseDataKey']] || []
  )

  const currentPage = computed({
    get: () => (params.value?.[0] as any)?.[pageKey] ?? defaultParams[0][pageKey],
    set(val: number) {
      changePage(val)
    }
  })

  const pageSize = computed({
    get: () => (params.value?.[0] as any)?.[pageSizeKey] ?? defaultParams[0][pageSizeKey],
    set(val: number) {
      changePageSize(val)
    }
  })

  return {
    loading,
    data,
    currentPage,
    pageSize,
    total,
    paging,
    refresh,
    changePage
  }
}

export default usePagination
