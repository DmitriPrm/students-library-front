<template>
  <el-form
      :disabled="loading"
      :model="formValues"
      :rules="rules"
      @submit.stop.prevent="handleSave"
  >
    <el-form-item prop="author">
      <label for="books_id">Книга</label>
      <el-input v-model="formValues.books_id" id="books_id" class="field"/>
    </el-form-item>

    <el-form-item prop="readers_id_stud">
      <label for="readers_id_stud">Студент-читатель</label>
      <el-input v-model="formValues.readers_id_stud" id="readers_id_stud" class="field" />
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
const loading = ref(false);
const emit = defineEmits(["save"]);

const currentYear = computed(() => dayjs().get("year"));

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
    console.error(e);
  }
  finally {
    loading.value = false;
  }
}

</script>