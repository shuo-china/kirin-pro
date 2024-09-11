<template>
  <el-upload
    ref="uploadRef"
    :multiple="multiple"
    :file-list="fileList"
    :action="finallyConfig.apiURL"
    :before-upload="handleBeforeUpload"
    v-bind="finallyAttrs"
    @update:file-list="handleUpdateFileList"
    @success="handleUploadSuccess"
    @error="handleUploadError"
    @exceed="handleExceed"
    @remove="handleRemove"
    @preview="handlePicPreview"
  >
    <template v-for="(_, name) in omit($slots, ['default', 'tip'])" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
    <template #default>
      <slot name="default">
        <el-button type="primary">上传</el-button>
      </slot>
    </template>
    <template #tip>
      <slot name="tip">
        <div v-if="limitExtTip" class="mt-1.5 text-xs text-black/70">{{ limitExtTip }}</div>
        <div v-if="limitSizeTip" class="mt-1.5 text-xs text-black/70">{{ limitSizeTip }}</div>
      </slot>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img class="w-full" :src="dialogImageUrl" />
  </el-dialog>
</template>

<script setup lang="ts">
import config from '@/config'
import { FileItem, proUploadProps, ProUploadProps } from './props'
import { UPDATE_FILE_LIST_EVENT, UPDATE_MODEL_EVENT } from '@/utils/constants'
import { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { isArray, omit } from 'lodash'
import { byteTransform } from '@/utils/transform'

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits([UPDATE_MODEL_EVENT, UPDATE_FILE_LIST_EVENT])

const props = defineProps(proUploadProps as ProUploadProps)

const attrs = useAttrs()

const defaultFileAttrs: Partial<UploadProps> = {
  limit: 1
}

const defaultImageAttrs: Partial<UploadProps> = {
  limit: 1,
  listType: 'picture-card'
}

const finallyAttrs = computed<Partial<UploadProps>>(() => {
  return props.type === 'file'
    ? {
        ...defaultFileAttrs,
        ...attrs
      }
    : {
        ...defaultImageAttrs,
        ...attrs
      }
})

const uploadRef = ref<UploadInstance>()

const fileList = ref<FileItem[]>(props.fileList || [])

const multiple = computed(() => (finallyAttrs.value.limit === 1 ? false : true))

const finallyConfig = computed(() => ({ ...config.upload[props.type], ...props.config }))

const limitExt = computed(() => {
  let ext = finallyConfig.value.limitExt
  if (typeof ext === 'string') {
    ext = ext ? ext.split(',').map(e => e.toLowerCase()) : []
  }
  return ext
})

const limitExtTip = computed(() => {
  if (limitExt.value.length) {
    return `支持${limitExt.value.join('、')}格式的文件`
  }
  return ''
})

const limitSizeTip = computed(() => {
  if (finallyConfig.value.limitSize) {
    return `最大上传文件大小：${byteTransform(finallyConfig.value.limitSize)}`
  }
  return ''
})

const getCurrentValue = (files: FileItem[]) => {
  const limit = finallyAttrs.value.limit
  const ids = files.filter(f => f.status === 'success').map(f => f.id)
  return props.transform ? props.transform(ids) : limit === 1 ? ids[0] : ids.join(',')
}

const handleUpdateFileList = (newVal: FileItem[]) => {
  fileList.value = newVal
  emit(UPDATE_FILE_LIST_EVENT, newVal)
}

const handleBeforeUpload = (rawFile: UploadRawFile) => {
  const limitExtArr = limitExt.value
  if (isArray(limitExtArr) && limitExtArr.length) {
    const suffix = rawFile.name.substring(rawFile.name.lastIndexOf('.') + 1).toLowerCase()
    if (!limitExtArr.includes(suffix)) {
      ElMessage.error(`文件格式不正确，当前支持格式：${limitExtArr.join(',')}`)
      return false
    }
  }

  const limitSize = finallyConfig.value.limitSize
  if (limitSize) {
    if (rawFile.size / 1024 > limitSize) {
      ElMessage.error(`文件大小不能超过${byteTransform(limitSize)}`)
      return false
    }
  }

  return true
}

const handleUploadSuccess = (
  response: UploadResult,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  const { id } = response
  ;(uploadFile as FileItem).id = id

  emit(UPDATE_MODEL_EVENT, getCurrentValue(uploadFiles as FileItem[]))
}

const handleUploadError = (error: Error) => {
  const defaultErrorMsg = '文件上传错误'
  try {
    const response = JSON.parse(error.message)
    ElMessage.error(response?.message || defaultErrorMsg)
  } catch {
    ElMessage.error(defaultErrorMsg)
  }
}

const handleRemove = (_: UploadFile, uploadFiles: UploadFiles) => {
  emit(UPDATE_MODEL_EVENT, getCurrentValue(uploadFiles as FileItem[]))
}

const handleExceed = (files: File[]) => {
  if (finallyAttrs.value.limit === 1 && uploadRef.value) {
    uploadRef.value.clearFiles()
    uploadRef.value.handleStart(files[0] as UploadRawFile)
    uploadRef.value.submit()
  } else {
    ElMessage.error(`文件上传数量最多 ${finallyAttrs.value.limit} 个`)
  }
}

watch(
  () => props.fileList,
  newValue => {
    fileList.value = newValue || []
  }
)

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePicPreview = (uploadFile: UploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const _expose = {
  getInstance: () => uploadRef.value as UploadInstance
}

defineExpose(_expose)
</script>
