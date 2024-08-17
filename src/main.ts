import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@/plugins'
import 'virtual:uno.css'
import 'normalize.css'
import '@/styles/index.scss'

async function setupApp() {
  const app = createApp(App)
  await registerPlugins(app)
  app.mount('#app')
}

setupApp()
