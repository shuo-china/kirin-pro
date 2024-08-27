import { FormItemProps } from 'element-plus'
import type { InjectionKey } from 'vue'
import { ProTableSearchType } from '../ProTableColumn/props'

export type SearchFormItemContext = {
  id: string
  search: boolean
  searchType: ProTableSearchType
  searchField: string
  searchFormItemProps: Partial<FormItemProps>
  searchFormFieldProps: object
}

export type SearchFormContext = {
  fields: Ref<SearchFormItemContext[]>
  addOrUpdateField: (field: SearchFormItemContext) => void
  removeField: (id: string) => void
}

export const searchFormContextKey: InjectionKey<SearchFormContext> = Symbol('searchFormContextKey')
