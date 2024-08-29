import { FormItemProps } from 'element-plus'
import type { InjectionKey } from 'vue'
import { ProTableSearchType, SearchOption } from '../ProTableColumn/props'

export type SearchTransform = (
  value: any,
  key: string
) => string | number | Record<string, string | number>

export type SearchFormItemContext = {
  id: string
  type: ProTableSearchType
  formItemProps: Partial<FormItemProps>
  formFieldProps: Record<string, any>
  transform?: SearchTransform
  options?: SearchOption[]
}

export type SearchFormContext = {
  fields: Ref<SearchFormItemContext[]>
  addOrUpdateField: (field: SearchFormItemContext) => void
  removeField: (id: string) => void
}

export const searchFormContextKey: InjectionKey<SearchFormContext> = Symbol('searchFormContextKey')
