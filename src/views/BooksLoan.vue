<template>
  <div class="page-layout">
    <div class="header">
      <div class="header__buttons">
        <el-button>
          <router-link :to="appRoutes.LIBRARY.path">Назад</router-link>
        </el-button>
      </div>
      <h1 class="header__title">Список выдачи книг</h1>
    </div>
    <el-skeleton v-if="loading" :loading="loading"/>
    <div v-else class="page-wrap">
      <el-card>
        <div class="page-wrap__create-btn-wrap">
          <el-button class="page-wrap__create-btn" @click="handleAddTenure">
            Уменьшить срок на 1 день
          </el-button>
          <el-button class="page-wrap__create-btn" @click="handleAddBook">
            + Добавить выдачу книги
          </el-button>
        </div>
        <el-table :data="studentsData" :row-class-name="tableRowClassName" class="books-table">
          <el-table-column prop="books_id" label="Книга" />
          <el-table-column prop="readers_id_stud" label="Читатель" />
          <el-table-column prop="date_loan" label="Дата взятия" />
          <el-table-column prop="date_return" label="Дата возврата" />
          <el-table-column prop="tenure" label="Срок владения" />
          <el-table-column prop="current_tenure" label="Осталось до возврата" />
        </el-table>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="isCreateModalOpen" title="Добавить выдачу книги" destroy-on-close>
    <create-book-loan-form @save="handleSave" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {appRoutes} from "@/shared/lib/navigation/routes.ts";
import {api} from "@/shared/api";
import CreateBookForm from "@/components/ui/CreateBookForm.vue";
import CreateBookLoanForm from "@/components/ui/CreateBookLoanForm.vue";
import {handleBackendError} from "@/shared/lib/helpers/handleBackendError.ts";
const studentsData = ref();
const loading = ref(true);
const isCreateModalOpen = ref(false);

const tableRowClassName = ({
   row,
   rowIndex,
 }: {
  row: any,
  rowIndex: number
}) => {
  if (row?.current_tenure < 0) {
    return 'danger-row';
  } else if (row?.current_tenure < 4) {
    return 'warning-row';
  }
  return ''
}

async function getUserData() {
  try {
    loading.value = true;
    const res = await api.booksLoan.getAll();
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

async function handleAddTenure() {
  try {
    loading.value = true;
    const res = await api.booksLoan.addTenure();
    studentsData.value = res.data.data;
  } catch(e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

getUserData();
</script>

<style lang="scss" scoped>
.page-layout {
  max-width: 1200px;
  margin: 1rem auto 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.books-table {
  :deep(.warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-7);
  }
  :deep(.danger-row) {
    --el-table-tr-bg-color: var(--el-color-danger-light-7);
  }
}
</style>