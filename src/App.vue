<script setup lang="ts">
import { RouterView } from 'vue-router'
import {appRoutes} from "@/shared/lib/navigation/routes.ts";
</script>

<template>
  <div class="app-layout">
    <header class="header">
      <router-link class="header__wrap" :to="appRoutes.MAIN.path">
        <img class="header__logo" src="./assets/mgtu.png">
        <h1>КИС МГТУ</h1>
      </router-link>
    </header>
    <div class="app">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: 80px 1fr;
  background-color: #f8f9fa;
}
.app {
  margin-bottom: 2rem;
}
.header {
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
  background-color: white;
  &__wrap {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin: 0 2.5rem;
    cursor: pointer;
    width: fit-content;
  }
  &__logo {
    width: 35px;
    height: 50px;
  }
}
</style>
