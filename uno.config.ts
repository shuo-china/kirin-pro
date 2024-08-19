import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    // presetAttributify(),
    presetUno()
  ],
  theme: {
    width: {
      sidebar: '200px',
      'sidebar-collapsed': '64px'
    },
    height: {
      navigationbar: '56px'
    }
  }
})
