<template>
  <div
    v-if="fields.length"
    :class="[
      'mb-4',
      cardBorder
        ? 'border border-[--el-border-color-light] rounded border-solid px-4 pt-4.5 pb-0'
        : ''
    ]"
  >
    <el-form ref="formRef" :model="formData" :label-width="85">
      <el-row :gutter="24">
        <el-col
          v-for="(field, index) in fields"
          :key="index"
          :span="span"
          :class="index >= colCount - 1 && isCollapse && index > 0 ? 'hidden!' : ''"
        >
          <el-form-item v-bind="field.formItemProps">
            <el-input
              v-if="field.type === 'input'"
              v-model="formData[field.formItemProps.prop as string]"
              v-bind="field.formFieldProps"
              clearable
            />
            <el-select
              v-if="field.type === 'select'"
              v-model="formData[field.formItemProps.prop as string]"
              class="w-full!"
              v-bind="field.formFieldProps"
              clearable
            >
              <el-option
                v-for="item in field.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-if="field.type === 'date-picker'"
              v-model="formData[field.formItemProps.prop as string]"
              class="w-full!"
              v-bind="field.formFieldProps"
            />
          </el-form-item>
        </el-col>
        <div class="flex flex-1 justify-end px-3">
          <el-form-item class="search-btns">
            <el-button icon="refresh" @click="handleReset">重置</el-button>
            <el-button type="primary" icon="search" @click="handleSubmit">查询</el-button>
            <div
              v-if="showCollapseBtn"
              class="ml-4 flex cursor-pointer items-center gap-x-1 text-[var(--el-color-primary)]"
              @click="toggleCollapse()"
            >
              <template v-if="isCollapse">
                展开
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </template>
              <template v-else>
                收起
                <el-icon>
                  <ArrowUp />
                </el-icon>
              </template>
            </div>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { searchFormContextKey, SearchTransform } from './context'
import { cloneDeep, fromPairs } from 'lodash'
import { useToggle } from '@vueuse/core'
import useBreakpoints from '@/hooks/useBreakpoints'

const emit = defineEmits(['search', 'reset'])

defineProps<{
  cardBorder: boolean
}>()

const { active } = useBreakpoints()
const span = computed(() => {
  switch (active.value) {
    case 'xl':
    case 'lg':
      return 6
    case 'md':
      return 8
    case 'sm':
      return 12
    case 'xs':
      return 24
  }
})
const colCount = computed(() => 24 / span.value)

const [isCollapse, toggleCollapse] = useToggle(true)

const searchFormContext = inject(searchFormContextKey, undefined)

const formRef = ref<FormInstance>()

const fields = computed(() => searchFormContext?.fields.value || [])

const showCollapseBtn = computed(() => fields.value.length >= colCount.value)

const formData = ref<Record<string, any>>({})

const handleSubmit = () => {
  const data = cloneDeep(formData.value)

  const transforms = fromPairs<SearchTransform>(
    fields.value.filter(f => f.transform).map(f => [f.formItemProps.prop + '', f.transform!])
  )

  for (const k in data) {
    if (k in transforms) {
      const transform = transforms[k]
      const val = transform(data[k], k)
      if (typeof val === 'string') {
        data[k] = val
      } else {
        Reflect.deleteProperty(data, k)
        Object.assign(data, val)
      }
    }
  }

  emit('search', data)
}

const handleReset = () => {
  formRef.value?.resetFields()
  emit('reset', formData.value)
}
</script>

<style lang="scss" scoped>
.search-btns {
  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>
