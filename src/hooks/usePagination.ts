import { AxiosRequestConfig } from 'axios'
import { pagination as paginationConfig } from '@/config'

interface PaginationType {
  pageKey: string
  pageSizeKey: string
  totalKey: string
}

export type Service<T> = (options?: AxiosRequestConfig) => Promise<Pagination<T>>

export type Options = AxiosRequestConfig & {
  pagination?: PaginationType
}

const defaultPaginationOptions: PaginationType = {
  // reuqest keys
  pageKey: paginationConfig.requestPageKey,
  pageSizeKey: paginationConfig.requestPageSizeKey,
  // response keys
  totalKey: paginationConfig.responseTotalKey
}

function usePagination<T = any>(service: Service<T>, options: Options = {}) {
  const responseData = ref<Pagination<T>>()

  const { pagination, params: paramsOptions, ...restOptions } = options

  const { pageKey, pageSizeKey, totalKey } = Object.assign({}, defaultPaginationOptions, pagination)

  const params = ref({
    [pageKey]: 1,
    [pageSizeKey]: paginationConfig.defaultPageSize,
    ...paramsOptions
  })

  const paging = (paginationParams: Record<string, any>) => {
    params.value = Object.assign({}, params.value, paginationParams)
    const axiosRequestConfig = Object.assign({ params: params.value }, restOptions)
    service(axiosRequestConfig).then(res => (responseData.value = res))
  }

  const changePage = (page: number) => {
    paging({ [pageKey]: page })
  }

  const changePageSize = (pageSize: number) => {
    paging({ [pageKey]: pageSize })
  }

  const total = computed(
    () => responseData.value?.[totalKey as (typeof paginationConfig)['responseTotalKey']] || 0
  )

  const currentPage = computed({
    get: () => params.value[pageKey],
    set(val: number) {
      changePage(val)
    }
  })

  const pageSize = computed({
    get: () => params.value[pageSizeKey],
    set(val: number) {
      changePageSize(val)
    }
  })

  return {
    currentPage,
    pageSize,
    total
  }
}

export default usePagination
