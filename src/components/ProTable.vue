<template>
  <div class="bg-white">
    <el-table v-loading="loading" :data="data" v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import usePagination, { Service } from '@/hooks/usePagination'
import { TableProps } from 'element-plus'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<
  Partial<TableProps<T>> & {
    request: Service<T>
  }
>()

const { data, loading, currentPage, pageSize, total } = usePagination(props.request)
</script>

<style lang="scss" scoped></style>
