<template>
  <el-table-column v-bind="attrs">
    <template v-for="(__, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { searchFormContextKey } from '../ProTable/context'
import { proTableColumnProps, ProTableColumnProps } from './props'
import _ from 'lodash'

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()

const props = defineProps(proTableColumnProps as ProTableColumnProps)

const searchFormContext = inject(searchFormContextKey, undefined)

const id = _.uniqueId()

watch(
  [props, () => attrs.label, () => attrs.prop],
  () => {
    const context = {
      id,
      search: !!props.search,
      searchType: props.searchType,
      searchFormItemProps: {
        label: (attrs.label as string) || '',
        prop: props.searchField || (attrs.prop as string) || '',
        ...props.searchItemProps
      },
      searchFormFieldProps: props.searchFieldProps || {},
      searchOptions: props.searchOptions,
      searchTransform: props.searchTransform
    }

    if (context.searchFormItemProps.label) {
      context.searchFormItemProps.label += ' :'
    }

    searchFormContext?.addOrUpdateField(context)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  searchFormContext?.removeField(id)
})
</script>
