<script setup lang="ts"></script>

<template>
  <div class="page">
    <div class="content">
      <div :class="$style.root">
        <router-view v-slot="{ Component }">
          <transition mode="out-in">
            <component :is="Component" class="transition-basic" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style module lang="stylus">
.root {
  margin-bottom 32px
}
</style>
