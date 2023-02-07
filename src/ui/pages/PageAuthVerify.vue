<template>
  <div>
    <div v-if="state === 'checking'">Активация аккаунта...</div>
    <div v-if="state === 'activated'">Аккаунт активирован</div>
    <div v-if="state === 'error'">Ошибка активации</div>
  </div>
</template>

<script lang="ts" setup>
import { activate } from '@/services/AuthService'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { ROUTES_PATHS } from '@/constants'

const state = ref('init')

async function activateToken(token: string) {
  try {
    await activate(token)
    return true
  } catch (err) {
    return false
  }
}

onMounted(async () => {
  const token = router.currentRoute.value.params.token
  state.value = 'checking'
  if (typeof token === 'string') {
    const activated = await activateToken(token)
    if (activated) {
      state.value = 'activated'
      setTimeout(() => {
        router.push(ROUTES_PATHS.AUTH_LOGIN)
      }, 1500)
    } else {
      state.value = 'error'
    }
  } else {
    state.value = 'error'
  }
})
</script>
