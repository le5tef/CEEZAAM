<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useReportsStore } from '@/store/reports'
import { useCompanyStore } from '@/store'

const companyStore = useCompanyStore()
const reportsStore = useReportsStore()
const accent = computed(() => companyStore.currentCompany?.accent_color)
const primary = computed(() => companyStore.currentCompany?.primary_color)
const accentOpposite = computed(() => {
  return (
    '#' +
    (Number(`0x1${accent.value?.split('#')[1]}`) ^ 0xffffff).toString(16).substr(1).toUpperCase()
  )
})

const primaryOpposite = computed(() => {
  return (
    '#' +
    (Number(`0x1${primary.value?.split('#')[1]}`) ^ 0xffffff).toString(16).substr(1).toUpperCase()
  )
})

const dateRangeOptions = computed(() => [
  {
    label: 'Текущая неделя',
    value: false,
  },
  {
    label: 'Произвольная неделя',
    value: true,
  },
])

const options1 = {
  series: [
    {
      name: 'Факт',
      data: [
        {
          x: 'Янв',
          y: 12000,
          name: 'Факт',
          goals: [
            {
              name: 'План',
              value: 54000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
        {
          name: 'Факт',
          x: 'Февр',
          y: 44000,
          goals: [
            {
              name: 'План',
              value: 54000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
        {
          name: 'Факт',
          x: 'март',
          y: 54000,
          goals: [
            {
              name: 'План',
              value: 52000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
        {
          name: 'Факт',
          x: 'апр',
          y: 66000,
          goals: [
            {
              name: 'План',
              value: 61000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
        {
          name: 'Факт',
          x: 'май',
          y: 81000,
          goals: [
            {
              name: 'План',
              value: 66000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
        {
          name: 'Факт',
          x: 'июнь',
          y: 67000,
          goals: [
            {
              name: 'План',
              value: 70000,
              strokeWidth: 8,
              strokeHeight: 2,
              strokeColor: accent.value,
            },
          ],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 20,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Source Sans Pro, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'text-muted',
      },
      formatter: (v: number) => {
        let prettyValue = ''
        if (v > 1000000) prettyValue = Math.round(v / 1000000) + ' млн ₽'
        else if (v > 1000) prettyValue = Math.round(v / 1000) + ' тыс ₽'
        else prettyValue = v + ' ₽'
        return prettyValue

        // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
      },
    },
  },
  colors: [primary.value],
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Факт', 'План'],
    markers: {
      fillColors: [primary.value, accent.value],
    },
  },
}

const options2 = {
  series: [44, 55, 13, 43],
  chartOptions: {
    colors: [accent.value, primary.value, accentOpposite.value, primaryOpposite.value],
    chart: {
      type: 'pie',
    },
    labels: ['Визиты', 'Абонементы', 'Сертификаты', 'Товары'],
  },
}

const options3 = {
  series: [
    {
      data: [400, 430, 448, 470, 540],
    },
  ],
  chartOptions: {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ['Товары', 'Сертификаты', 'Продажи', 'Абонементы', 'Визиты'],
    colors: [primary.value],
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
        formatter: (v: number) => {
          let prettyValue = ''
          if (v > 1000000) prettyValue = Math.round(v / 1000000) + ' млн ₽'
          else if (v > 1000) prettyValue = Math.round(v / 1000) + ' тыс ₽'
          else prettyValue = v + ' ₽'
          return prettyValue

          // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
      },
    },
  },
}

const options4 = {
  series: [44, 55],
  chartOptions: {
    colors: [primary.value, accent.value],
    chart: {
      type: 'pie',
    },
    labels: ['Запись администратором', 'Запись онлайн'],
  },
}

const options5 = {
  series: [
    {
      data: [40, 22, 15, 42, 54],
    },
  ],
  chartOptions: {
    chart: {
      type: 'bar',

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ['Анастасия', 'Елена', 'Оксана', 'Евангелина', 'Марина'],
    colors: [primary.value],
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
        formatter: (v: number) => {
          let prettyValue = ''
          if (v > 1000000) prettyValue = Math.round(v / 1000000) + ' млн ч'
          else if (v > 1000) prettyValue = Math.round(v / 1000) + ' тыс ч'
          else prettyValue = v + ' ч'
          return prettyValue

          // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
      },
    },
  },
}

const options6 = {
  series: [44, 55],
  chartOptions: {
    colors: [primary.value, accent.value],
    chart: {
      type: 'pie',
    },
    labels: ['Запись администратором', 'Запись онлайн'],
  },
}

const options7 = {
  series: [
    {
      data: [40, 22, 15, 42, 54],
    },
  ],
  chartOptions: {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ['Анастасия', 'Елена', 'Оксана', 'Евангелина', 'Марина'],
    colors: [primary.value],
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
        formatter: (v: number) => {
          let prettyValue = ''
          if (v > 1000000) prettyValue = Math.round(v / 1000000) + ' млн ч'
          else if (v > 1000) prettyValue = Math.round(v / 1000) + ' тыс ч'
          else prettyValue = v + ' ч'
          return prettyValue

          // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
      },
    },
  },
}

const options8 = {
  series: [
    {
      name: 'Загруженность',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 34],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    colors: [primary.value],
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
        formatter: (v: number) => {
          return v + ' %'

          // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
        },
      },
    },
    xaxis: {
      categories: ['янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент'],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
      },
    },
  },
}

const options9 = {
  series: [
    {
      name: 'Визиты',
      data: [44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000],
    },
    {
      name: 'Продажи',
      data: [76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000],
    },
  ],
  chartOptions: {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [primary.value, accent.value],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
        formatter: (v: number) => {
          let prettyValue = ''
          if (v > 1000000) prettyValue = Math.round(v / 1000000) + ' млн ₽'
          else if (v > 1000) prettyValue = Math.round(v / 1000) + ' тыс ₽'
          else prettyValue = v + ' ₽'
          return prettyValue

          // v.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
        },
      },
    },
    xaxis: {
      categories: ['янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт'],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Source Sans Pro, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'text-muted',
        },
      },
    },
    fill: {
      opacity: 1,
    },
  },
}

const dateFormat = 'DD.MM.YYYY'
const editableDateRange = ref(false)
</script>

<template>
  <div>
    <div class="heading font-26 mb-6">Комплексный отчёт</div>
    <div class="d-flex mb-6">
      <el-select v-model="editableDateRange" class="mr-2">
        <el-option
          v-for="option in dateRangeOptions"
          :key="option.label"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="editableDateRange"
        v-model="reportsStore.dateRange"
        :format="dateFormat"
        style="max-width: 300px"
        type="daterange"
      />
    </div>
    <div class="d-flex" style="gap: 16px">
      <div class="d-flex flex-column" style="gap: 16px">
        <div v-for="i in 1" :key="i" :class="$style.chart">
          <div class="heading font-18">Выполнение плана</div>
          <apexchart
            :options="options1"
            :series="options1.series"
            type="bar"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Распределение выручки</div>
          <apexchart
            :options="options2.chartOptions"
            :series="options2.series"
            type="pie"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Средний чек в салоне</div>
          <apexchart
            :options="options3.chartOptions"
            :series="options3.series"
            type="bar"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Источник визитов</div>
          <apexchart
            :options="options4.chartOptions"
            :series="options4.series"
            type="pie"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Часы нагрузки мастеров</div>
          <apexchart
            :options="options5.chartOptions"
            :series="options5.series"
            type="bar"
            width="562"
          ></apexchart>
        </div>
      </div>
      <div class="d-flex flex-column" style="gap: 16px">
        <div :class="$style.chart">
          <div class="heading font-18">Скидки</div>
          <apexchart
            :options="options6.chartOptions"
            :series="options6.series"
            type="pie"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Продажи администраторов</div>
          <apexchart
            :options="options7.chartOptions"
            :series="options7.series"
            type="bar"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Загруженность салона</div>
          <apexchart
            :options="options8.chartOptions"
            :series="options8.series"
            type="line"
            width="562"
          ></apexchart>
        </div>
        <div :class="$style.chart">
          <div class="heading font-18">Выручка</div>
          <apexchart
            :options="options9.chartOptions"
            :series="options9.series"
            type="bar"
            width="562"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.chart
  padding 16px
  background #FFFFFF
  border-radius 8px
  box-shadow 0 0 8px 0 rgba(34, 60, 80, 0.2)
  min-width 300px
  min-height 200px
</style>