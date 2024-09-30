// main.js o main.ts
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import App from './App.vue'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'

const app = createApp(App)
app.use(Quasar, {
  plugins: {}, 
})
app.mount('#app')
