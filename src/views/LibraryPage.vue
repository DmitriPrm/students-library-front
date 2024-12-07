<template>
  <div class="page-layout">
    <div class="header">
      <div class="header__buttons">
        <el-button>
          <router-link :to="appRoutes.MAIN.path">Назад</router-link>
        </el-button>
        <el-button>
          <router-link :to="appRoutes.BOOKS_LOAN.path">Выдача книг</router-link>
        </el-button>
      </div>
      <h1 class="header__title">Библиотека</h1>
    </div>
    <el-skeleton v-if="loading" :loading="loading"/>
    <div v-else class="page-wrap">
      <el-card>
        <div class="page-wrap__create-btn-wrap">
          <el-button class="page-wrap__create-btn" @click="handleAddBook">
            + Добавить книгу
          </el-button>
        </div>
        <el-table :data="studentsData">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="author" label="Автор" />
          <el-table-column prop="name_book" label="Название книги" />
          <el-table-column prop="town" label="Город издания" />
          <el-table-column prop="publisher" label="Издатель" />
          <el-table-column prop="pYear" label="Год издания" />
        </el-table>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="isCreateModalOpen" title="Добавить книгу" destroy-on-close>
    <create-book-form @save="handleSave" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {appRoutes} from "@/shared/lib/navigation/routes.ts";
import {api} from "@/shared/api";
import CreateBookForm from "@/components/ui/CreateBookForm.vue";
const studentsData = ref();
const loading = ref(true);
const isCreateModalOpen = ref(false);

async function getUserData() {
  try {
    loading.value = true;
    const res = await api.books.getAll();
    studentsData.value = res.data.data;
  } catch(e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function handleAddBook() {
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