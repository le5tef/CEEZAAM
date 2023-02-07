<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ROUTES_PATHS } from '@/constants'
import { AuthService } from '@/services'
import { useUserStore } from '@/store/user'
import { ApiError } from '@/client'

const userStore = useUserStore()

const stateDefault = Object.freeze({
  username: '',
  password: '',
})
const state = ref<typeof stateDefault>({ ...stateDefault })
const emailIsValid = computed(() => AuthService.validateLogin(state.value.username))
const passwordIsValid = computed(() => AuthService.validatePassword(state.value.password))
const isValid = computed(() => emailIsValid.value && passwordIsValid.value)
const passwordError = ref<string | null>(null)

const submit = async () => {
  if (!isValid.value) return

  try {
    await userStore.login({
      email: state.value.username,
      password: state.value.password,
    })
  } catch (e) {
    if (e instanceof ApiError) {
      passwordError.value = e.body.error.msg
    }
  }
}
</script>

<template>
  <div>
    <div class="sz-auth__heading">Вход</div>
    <el-form label-position="top" @submit.prevent>
      <el-form-item label="Почта">
        <el-input v-model="state.username" autofocus type="email" @keyup.enter="submit" />
      </el-form-item>
      <el-form-item label="Пароль" :error="passwordError">
        <el-input v-model="state.password" type="password" @keyup.enter="submit" />
      </el-form-item>
      <el-button :disabled="!isValid" type="primary" @click="submit"> Войти</el-button>
    </el-form>
    <div :class="$style.info">
      <router-link class="no-reset" :to="ROUTES_PATHS.AUTH_PASS_RESET">
        Забыли пароль?
      </router-link>
    </div>
    <div :class="$style.info">
      Еще нет профиля?
      <router-link :to="ROUTES_PATHS.AUTH_REGISTER" class="no-reset">Зарегистрируйтесь</router-link>
    </div>
  </div>
</template>

<style lang="stylus" module>
.info
  margin-top 16px
</style>
