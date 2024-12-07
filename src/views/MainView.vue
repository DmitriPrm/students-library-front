<template>
  <div class="main">
    <el-card class="main__card">
      <h1>Компьютерная информационная система МГТУ</h1>
      <div class="main__buttons">
        <el-button>
          <router-link :to="appRoutes.DEANS_OFFICE.path">Деканат</router-link>
        </el-button>
        <el-button>
          <router-link :to="appRoutes.LIBRARY.path">Библиотека</router-link>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import {appRoutes} from "@/shared/lib/navigation/routes.ts";
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &__card {
    max-width: 500px;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>