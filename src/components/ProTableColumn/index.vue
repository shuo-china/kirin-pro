<template>
  <el-table-column v-bind="attrs">
    <template v-for="(__, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { searchFormContextKey, SearchFormItemContext } from '../ProTable/context'
import { proTableColumnProps, ProTableColumnProps } from './props'
import _ from 'lodash'

defineOptions({
  inheritAttrs: false
})

const searchFormContext = inject(searchFormContextKey, undefined)

const attrs = useAttrs()

const props = defineProps(proTableColumnProps as ProTableColumnProps)

const id = _.uniqueId()
const context = computed<Nullable<SearchFormItemContext>>(() => {
  const defaultFormItemProps = {
    label: (attrs.label as string) || '',
    prop: props.searchField || (attrs.prop as string) || ''
  }

  const defaultFormFieldsProps: Record<string, any> = {}
  if (props.searchType === 'date-picker') {
    defaultFormFieldsProps.type = 'date'
  }

  const value = {
    id,
    type: props.searchType,
    options: props.searchOptions,
    formItemProps: { ...defaultFormItemProps, ...props.searchItemProps },
    formFieldProps: { ...defaultFormFieldsProps, ...props.searchFieldProps },
    transform: props.searchTransform
  }

  return props.search ? value : null
})

watch(
  context,
  c => {
    if (c) {
      searchFormContext?.addOrUpdateField(c)
    } else {
      searchFormContext?.removeField(id)
    }
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  searchFormContext?.removeField(id)
})
</script>
