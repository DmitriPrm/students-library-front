<template>
  <div class="page-layout">
    <div class="header">
      <el-button>
        <router-link :to="appRoutes.MAIN.path">Назад</router-link>
      </el-button>
      <h1 class="header__title">Деканат</h1>
    </div>
    <el-skeleton v-if="loading" :loading="loading"/>
    <div v-else class="page-wrap">
      <el-card>
        <div class="page-wrap__create-btn-wrap">
          <el-button class="page-wrap__create-btn" @click="handleAddStudent">
            + Добавить студента
          </el-button>
        </div>
        <el-table :data="studentsData">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="surname" label="Фамилия" />
          <el-table-column prop="name" label="Имя" />
          <el-table-column prop="sex" label="Пол" />
          <el-table-column prop="group" label="Группа" />
        </el-table>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="isCreateModalOpen" title="Добавить студента" destroy-on-close>
    <create-student-form @save="handleSave" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { appRoutes } from "@/shared/lib/navigation/routes.ts";
import CreateStudentForm from "@/components/ui/CreateStudentForm.vue";
import {api} from "@/shared/api";
const studentsData = ref();
const loading = ref(true);
const isCreateModalOpen = ref(false);

async function getUserData() {
  try {
    loading.value = true;
    const res = await api.students.getAll();
    studentsData.value = res.data.data;
  } catch(e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function handleAddStudent() {
  isCreateModalOpen.value = true;
}

function handleSave() {
  isCreateModalOpen.value = false;
  getUserData();
}

getUserData();
</script>

<style lang="scss" scoped>
.page-layout {
  max-width: 1200px;
  margin: 5rem auto 0;
}
.header {
  display: flex;
  justify-content: space-between;
  &__title {
    text-align: center;
  }
}
.page-wrap {
  margin: auto;
  max-width: 1200px;
  &__create-btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
}
</style>