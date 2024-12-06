<template>
  <el-form
      :disabled="loading"
      :model="formValues"
      :rules="rules"
      @submit.stop.prevent="handleSave"
  >
    <el-form-item prop="author">
      <label for="author">Автор</label>
      <el-input v-model="formValues.author" id="author" class="field"/>
    </el-form-item>

    <el-form-item prop="name_book">
      <label for="name_book">Название книги</label>
      <el-input v-model="formValues.name_book" id="name_book" class="field" />
    </el-form-item>

    <el-form-item prop="town">
      <label for="town">Город издательства</label>
      <el-input v-model="formValues.town" id="town" class="field" />
    </el-form-item>

    <el-form-item prop="publisher">
      <label for="publisher">Издатель</label>
      <el-input v-model="formValues.publisher" id="publisher" class="field" />
    </el-form-item>

    <el-form-item prop="pYear">
      <label for="pYear">Год издательства</label>
      <el-input v-model="formValues.pYear" id="pYear" class="field" type="number" min="0" />
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

interface IBookForm {
  author: string,
  name_book: string,
  town: string,
  publisher: string,
  pYear: number;
}

const requiredFieldMessage = "Поле обязательно";

const rules = reactive<FormRules<IBookForm>>({
  author: [ { required: true, message: requiredFieldMessage } ],
  name_book: [ { required: true, message: requiredFieldMessage } ],
  town: [ { required: true, message: requiredFieldMessage } ],
  publisher: [ { required: true, message: requiredFieldMessage } ],
  pYear: [ { required: true, message: requiredFieldMessage } ],
});

const formValues = reactive<IBookForm>({
  author: "",
  name_book: "",
  town: "",
  publisher: "",
  pYear: currentYear.value,
})


async function handleSave() {
  try {
    loading.value = true;
    const dto = {};
    for(let prop in formValues) {
      dto[prop] = formValues[prop];
    }
    await api.books.save(dto);
    emit("save");
  } catch (e) {
    console.error(e);
  }
  finally {
    loading.value = false;
  }
}

</script>