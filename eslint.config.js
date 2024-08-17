import js from '@eslint/js'
import ts from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import unocss from '@unocss/eslint-config/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  unocss,
  eslintPluginPrettierRecommended,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  {
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
)
