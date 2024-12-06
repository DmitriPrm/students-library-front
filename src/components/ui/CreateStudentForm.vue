<template>
  <el-form
      :disabled="loading"
      :model="formValues"
      :rules="rules"
      @submit.stop.prevent="handleSave"
  >
    <el-form-item prop="name">
      <label for="name">Имя</label>
      <el-input v-model="formValues.name" id="name" class="field"/>
    </el-form-item>

    <el-form-item prop="surname">
      <label for="surname">Фамилия</label>
      <el-input v-model="formValues.surname" id="surname" class="field" />
    </el-form-item>

    <el-form-item prop="sex">
      <label for="sex">Пол</label>
      <el-select v-model="formValues.sex" id="sex" placeholder="Выберите пол" class="field" >
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="group">
      <label for="group">Группа</label>
      <el-input v-model="formValues.group" id="group" class="field" />
    </el-form-item>
    <el-button native-type="submit" class="field">
      Сохранить
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import type { FormRules } from "element-plus";
import axios from "axios";
import {api} from "@/shared/api";
const loading = ref(false);
const emit = defineEmits(["save"]);

interface IStudentForm {
  name: string,
  surname: string;
  sex: string;
  group: string;
}

const requiredFieldMessage = "Поле обязательно";

const rules = reactive<FormRules<IStudentForm>>({
  name: [ { required: true, message: requiredFieldMessage } ],
  surname: [ { required: true, message: requiredFieldMessage } ],
  sex: [ { required: true, message: requiredFieldMessage } ],
  group: [ { required: true, message: requiredFieldMessage } ],
});

const formValues = reactive<IStudentForm>({
  name: "",
  surname: "",
  sex: "",
  group: "",
})


const options = [
  {
    value: "male",
    label: "Мужской"
  },
  {
    value: "female",
    label: "Женский"
  },
  {
    value: "other",
    label: "Другой"
  },
];

async function handleSave() {
  try {
    loading.value = true;
    const dto = {};
    for(let prop in formValues) {
      dto[prop] = formValues[prop];
    }
    await api.students.save(dto);
    emit("save");
  } catch (e) {
    console.error(e);
  }
  finally {
    loading.value = false;
  }
}

</script>

<style lang="scss" scoped>

</style>