<template>
  <el-form
      :disabled="loading"
      :model="formValues"
      :rules="rules"
      @submit.stop.prevent="handleSave"
  >
    <el-form-item prop="author">
      <label for="books_id">Книга</label>
      <el-select
          v-model="formValues.books_id"
          id="books_id"
          class="field"
          placeholder="Выберите книгу"
      >
        <el-option
            v-for="book in booksValues"
            :key="book.id"
            :value="book.id"
            :label="book.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="readers_id_stud">
      <label for="readers_id_stud">Студент-читатель</label>
      <el-select
          v-model="formValues.readers_id_stud"
          id="readers_id_stud"
          class="field"
          placeholder="Выберите студента"
      >
        <el-option
          v-for="student in studentsValues"
          :key="student.id"
          :value="student.id"
          :label="student.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="tenure">
      <label for="tenure">Срок</label>
      <el-input v-model="formValues.tenure" id="tenure" class="field" />
    </el-form-item>

    <el-button native-type="submit" class="field">
      Сохранить
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormRules } from "element-plus";
import {api} from "@/shared/api";
import {dayjs} from "element-plus";
import {handleBackendError} from "@/shared/lib/helpers/handleBackendError.ts";
const loading = ref(false);
const emit = defineEmits(["save"]);

const studentsValues = ref();
const booksValues = ref();
interface IBookLoanForm {
  books_id: number;
  readers_id_stud: number;
  tenure: number;
}

const requiredFieldMessage = "Поле обязательно";

const rules = reactive<FormRules<IBookLoanForm>>({
  books_id: [ { required: true, message: requiredFieldMessage } ],
  readers_id_stud: [ { required: true, message: requiredFieldMessage } ],
  tenure: [ { required: true, message: requiredFieldMessage } ],
});

const formValues = reactive<IBookLoanForm>({
  books_id: null,
  readers_id_stud: null,
  tenure: null,
})


async function handleSave() {
  try {
    loading.value = true;
    const dto = {};
    for(let prop in formValues) {
      dto[prop] = formValues[prop];
    }
    await api.booksLoan.save(dto);
    emit("save");
  } catch (e) {
    handleBackendError(e);
    console.error(e);
  }
  finally {
    loading.value = false;
  }
}

async function getFormValues() {
  try {
    loading.value = true;
    const res = await api.booksLoan.getCreateForm();

    studentsValues.value = res.data?.readers_id_stud;
    booksValues.value = res.data?.books_id;
  } catch (e) {
    handleBackendError(e)
  } finally {
    loading.value = false;
  }
}

getFormValues();
</script>