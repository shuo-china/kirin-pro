<template>
  <SearchForm :card-border="searchCardBorder" @search="search" @reset="reset" />
  <div
    :class="
      tableCardBorder ? 'border border-[--el-border-color-light] rounded border-solid p-4' : ''
    "
  >
    <template v-if="$slots.toolbar">
      <div class="flex justify-end pb-4">
        <slot name="toolbar"></slot>
      </div>
    </template>
    <el-table ref="_ref" v-loading="loading" :data="data" v-bind="$attrs">
      <template v-for="(_, name) in omit($slots, 'toolbar')" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        v-bind="paginationProps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { omit } from 'lodash'
import usePagination from '@/hooks/usePagination'
import type { ElTable, PaginationProps, TableInstance } from 'element-plus'
import { proTableProps, ProTableProps } from './props'
import { SearchFormContext, searchFormContextKey, SearchFormItemContext } from './context'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(proTableProps as ProTableProps)

const defaultPaginationProps: Partial<PaginationProps> = {
  layout: 'prev, pager, next, sizes, total',
  background: true
}

const paginationProps = computed(() =>
  Object.assign({}, defaultPaginationProps, props.paginationProps)
)

const { data, loading, currentPage, pageSize, total, search, reset, paging, changePage, refresh } =
  usePagination(props.request, props.requestOptions)

// provide
const fields = ref<SearchFormItemContext[]>([])

const addOrUpdateField: SearchFormContext['addOrUpdateField'] = field => {
  const findIndex = fields.value.findIndex(f => f.id === field.id)
  if (findIndex !== -1) {
    fields.value[findIndex] = field
  } else {
    fields.value.push(field)
  }
}

const removeField: SearchFormContext['removeField'] = id => {
  const findIndex = fields.value.findIndex(f => f.id === id)
  if (findIndex !== -1) {
    fields.value.splice(findIndex, 1)
  }
}

const context: SearchFormContext = {
  fields,
  addOrUpdateField,
  removeField
}

provide(searchFormContextKey, context)

// expose
const _ref = ref()

const _expose = {
  paging,
  search,
  refresh,
  changePage,
  getInstance: () => _ref.value as TableInstance
}

defineExpose(_expose)
</script>
