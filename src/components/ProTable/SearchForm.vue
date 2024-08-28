<template>
  <el-card v-if="fields.length" shadow="never" class="mb-4" body-class="p-6! pb-1.5!">
    <el-form ref="formRef" :model="formData" :label-width="110">
      <el-row :gutter="24">
        <el-col
          v-for="(field, index) in fields"
          :key="index"
          :span="span"
          :class="index >= colCount - 1 && isCollapse && index > 0 ? 'hidden!' : ''"
        >
          <el-form-item v-bind="field.searchFormItemProps">
            <el-input
              v-if="field.searchType === 'input'"
              v-model="formData[field.searchFormItemProps.prop as string]"
              v-bind="field.searchFormFieldProps"
              clearable
            />
            <el-select
              v-if="field.searchType === 'select'"
              v-model="formData[field.searchFormItemProps.prop as string]"
              class="w-full!"
              v-bind="field.searchFormFieldProps"
              clearable
            >
              <el-option
                v-for="item in field.searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-if="field.searchType === 'date-picker'"
              v-model="formData[field.searchFormItemProps.prop as string]"
              class="w-full!"
              :type="field.searchFormFieldProps.type ?? 'date'"
              v-bind="field.searchFormFieldProps"
            />
          </el-form-item>
        </el-col>
        <div class="flex flex-1 justify-end px-3">
          <el-form-item class="search-btns">
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSubmit">查询</el-button>
            <div
              v-if="showCollapseBtn"
              class="ml-4 flex cursor-pointer items-center gap-x-1.5 text-[var(--el-color-primary)]"
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
  </el-card>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { searchFormContextKey, SearchTransform } from './context'
import _ from 'lodash'
import { useToggle } from '@vueuse/core'
import useScreenSize from '@/hooks/useScreenSize'

const emit = defineEmits(['search', 'reset'])

const { size } = useScreenSize()
const span = computed(() => {
  switch (size.value) {
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

const fields = computed(() => searchFormContext?.fields.value.filter(f => f.search) || [])

const showCollapseBtn = computed(() => fields.value.length >= colCount.value)

const formData = ref<Record<string, any>>({})

const handleSubmit = () => {
  const data = toRaw(formData.value)

  const transforms = _.fromPairs<SearchTransform>(
    fields.value
      .filter(f => f.searchTransform)
      .map(f => [f.searchFormItemProps.prop + '', f.searchTransform!])
  )

  for (const k in data) {
    if (k in transforms) {
      const val = transforms[k](data[k], k)
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
