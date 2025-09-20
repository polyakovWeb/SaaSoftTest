<script setup lang="ts">
import { useAccountsStore } from "@/stores/Accounts";
import { AccountTypeEnum, type AccountI } from "@/types/Account.types";
import { computed, onMounted, ref, watch } from "vue";
import { Form, useForm } from "vee-validate";
import { ElSelect } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { accountValidationScheme } from "@/constants/accountValidationScheme.ts";
import InputError from "./InputError.vue";

const { accountData } = defineProps<{
  accountData: AccountI;
}>();

const { deleteAccount, saveAccount } = useAccountsStore();

const initialTagsString =
  accountData.tags?.map((tag) => tag.text).join(";") || "";

const { values, errors, meta, defineField, resetForm, validate } = useForm({
  initialValues: { ...accountData, tags: initialTagsString },
  validationSchema: accountValidationScheme,
});

const [tags, tagsAttrs] = defineField("tags", {
  validateOnModelUpdate: false,
  validateOnBlur: true,
});
const [login, loginAttrs] = defineField("login", {
  validateOnModelUpdate: false,
});
const [password, passwordAttrs] = defineField("password", {
  validateOnModelUpdate: false,
});
const initPasswordCopy = password.value;
// Валидация на change для селекта
const [accountType, accountTypeAttrs] = defineField("accountType", {
  validateOnModelUpdate: false,
});

const isLocalAccount = computed(() => {
  // Скрывает пароль при LDAP и показывать при local || null
  if (accountType.value === AccountTypeEnum.ldap) {
    password.value = "null";
    return false;
  }
  password.value = initPasswordCopy;
  return true;
});

const changeHandler = async () => {
  // валидация полей
  if (meta.value.dirty) {
    const { valid } = await validate();
    if (valid) {
      // преобразование объекта с данными
      const updatedAccount: AccountI = {
        ...accountData,
        tags: tags.value
          ? tags.value.split(";").map((tag) => ({ text: tag.trim() }))
          : null,
        accountType: accountType.value as AccountTypeEnum,
        login: login.value,
        password: isLocalAccount.value ? password.value : null,
      };
      console.log("Валидация успешна, можно сохранять", updatedAccount);
      saveAccount(accountData, updatedAccount);
      // сброс meta.dirty
      resetForm({ values }, { force: true });
    }
  }
};

// сбросить dirty после установления initialValues
onMounted(() => resetForm({ values: values }, { force: true }));
</script>

<template>
  <Form class="form__row" :class="{ bigger: !isLocalAccount }">
    <!-- tags -->
    <div class="input-wrapper">
      <el-input
        class="form__input form__input--tags"
        v-model="tags"
        v-bind="tagsAttrs"
        placeholder="Метка 1; Метка 2; ..."
        clearable
        @blur="changeHandler()"
      />
      <InputError :errors="errors.tags" />
    </div>
    <!-- accountType -->
    <div class="input-wrapper">
      <el-select
        class="form__input form__input--type"
        placeholder="Выберите тип"
        v-model="accountType"
        v-bind="accountTypeAttrs"
        @change="changeHandler()"
      >
        <el-option
          v-for="([_, value], index) in Object.entries(AccountTypeEnum)"
          :key="index"
          :label="value"
          :value="value"
        />
      </el-select>
      <InputError :errors="errors.accountType" />
    </div>
    <!-- login -->
    <div class="input-wrapper">
      <el-input
        class="form__input form__input--login"
        :class="{ bigger: !isLocalAccount }"
        placeholder="Введите логин..."
        clearable
        v-model="login"
        v-bind="loginAttrs"
        @blur="changeHandler()"
      />
      <InputError :errors="errors.login" />
    </div>
    <!-- password -->
    <div class="input-wrapper" v-if="isLocalAccount">
      <el-input
        class="form__input form__input--password"
        placeholder="Введите пароль..."
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        clearable
        show-password
        @blur="changeHandler()"
      />
      <InputError :errors="errors.password" />
    </div>
    <el-button
      class="form__input form__input--delete"
      type="primary"
      :icon="Delete"
      @click="deleteAccount(accountData)"
    />
  </Form>
</template>

<style scoped>
.form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 25%)) 1fr 1fr 40px;
  gap: 16px;
  align-items: start;
}

.form__row.bigger {
  grid-template-columns: repeat(2, minmax(0, 25%)) 1fr 40px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}
</style>
