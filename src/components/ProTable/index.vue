<template>
  <div>
    <SearchForm @search="paging" @reset="handleReset" />
    <el-card shadow="never" body-class="px-6! py-4!">
      <div v-if="$slots.header" class="flex justify-end pb-4">
        <slot name="header"></slot>
      </div>
      <el-table ref="_ref" v-loading="loading" :data="data" v-bind="$attrs">
        <template v-for="(_, name) in lodash.omit($slots, 'header')" #[name]="slotData">
          <slot :name="name" v-bind="slotData || {}"></slot>
        </template>
      </el-table>
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          :total="total"
          layout="total, sizes, prev, pager, next"
          v-bind="paginationProps"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import usePagination from '@/hooks/usePagination'
import type { ElTable } from 'element-plus'
import SearchForm from './SearchForm.vue'
import { proTableProps, ProTableProps } from './props'
import { SearchFormContext, searchFormContextKey, SearchFormItemContext } from './context'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(proTableProps as ProTableProps)

const { data, loading, currentPage, pageSize, total, paging, changePage } = usePagination(
  props.request,
  props.requestOptions
)

const handleReset = (values: Record<string, any>) => {
  changePage(1, values)
}

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

export type Exposed = {
  getInstance: () => InstanceType<typeof ElTable>
}

const _expose: Exposed = {
  getInstance: () => _ref.value
}

defineExpose(_expose)
</script>
