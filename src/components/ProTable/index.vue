<template>
  <div>
    <SearchForm @search="paging" />
    <div class="bg-white px-6 py-4">
      <slot name="header"></slot>
      <el-table ref="_ref" v-loading="loading" :data="data" v-bind="$attrs">
        <template v-for="(_, name) in _.omit($slots, 'header')" #[name]="slotData">
          <slot :name="name" v-bind="slotData || {}"></slot>
        </template>
      </el-table>
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          v-bind="paginationProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import usePagination from '@/hooks/usePagination'
import type { ElTable } from 'element-plus'
import SearchForm from './SearchForm.vue'
import { proTableProps, ProTableProps } from './props'
import { SearchFormContext, searchFormContextKey, SearchFormItemContext } from './context'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(proTableProps as ProTableProps)

const { data, loading, currentPage, pageSize, total, paging } = usePagination(props.request)

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
