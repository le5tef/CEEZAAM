import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { pinia } from '@/store'
import './styles/element/index.scss'
import '@/init'
import '@/styles/app.styl'
import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import { CeezaamLyrics } from '@/plugins/cz_lyrics'
const app = createApp(App)
import VueApexCharts from 'vue3-apexcharts'

app.config.performance = import.meta.env.DEV

dayjs.locale('ru')
app.use(VueApexCharts)
app.use(pinia)
app.use(router)
app.use(CeezaamLyrics)
app.mount('#app')
