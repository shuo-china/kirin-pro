<template>
  <el-card v-if="fields.length" shadow="never" class="mb-4" body-class="p-6! pb-2.5!">
    <el-form :inline="true">
      <el-form-item
        v-for="(field, index) in fields"
        :key="index"
        :model="formData"
        v-bind="field.searchFormItemProps"
      >
        <el-input
          v-if="field.searchType === 'input'"
          v-model="formData[field.searchField]"
          v-bind="field.searchFormFieldProps"
        />
        <el-select
          v-if="field.searchType === 'select'"
          v-model="formData[field.searchField]"
          v-bind="field.searchFormFieldProps"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { searchFormContextKey } from './context'

const emit = defineEmits(['search'])

const searchFormContext = inject(searchFormContextKey, undefined)

const fields = computed(() => searchFormContext?.fields.value.filter(f => f.search) || [])

const formData = ref<Record<string, any>>({})

const handleSubmit = () => {
  emit('search', formData.value)
}
</script>

<style lang="scss" scoped></style>
