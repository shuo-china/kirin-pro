import { definePropType } from '@/utils/prop'
import { uploadProps, UploadUserFile } from 'element-plus'

export type FileItem = UploadUserFile & { id: number }

export const proUploadProps = {
  type: {
    type: definePropType<UploadConfigKey>(String),
    required: true
  },
  modelValue: {
    type: definePropType<number | string>([Number, String])
  },
  fileList: {
    type: definePropType<FileItem[]>(Array)
  },
  config: {
    type: definePropType<UploadConfigItem>(Object)
  },
  transform: {
    type: definePropType<(ids: number[]) => any>(Function)
  }
} as const

export type ProUploadProps = typeof proUploadProps & Omit<typeof uploadProps, 'fileList'>
