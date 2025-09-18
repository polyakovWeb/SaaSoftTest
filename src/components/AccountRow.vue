<script setup lang="ts">
import { useAccountsStore } from "@/stores/Accounts";
import { AccountTypeEnum, type AccountI } from "@/types/Account.types";
import { Delete } from "@element-plus/icons-vue";
import { ElInput } from "element-plus";
import { computed, reactive, ref, watch } from "vue";

const { accountData } = defineProps<{
  accountData: AccountI;
}>();

const { accounts, deleteAccount } = useAccountsStore();
const errors = ref({});

// В каждом экземпляре "учётной записи" для преобразования в массив меток передавать через пропсы
const tagsString = ref<string>(
  accountData.tags?.map((tag) => tag.text).join("; ") || ""
);
// Импорт данных из стора AccountI[] с сохранением в localStore
// Если в локальном сторе сохранены данные - рендер учёток по ним
// const account: AccountI = reactive({
//   tags: null,
//   accountType: null,
//   login: null,
//   password: null,
// });

const isLocalAccount = computed(() => {
  // Скрывает пароль при LDAP и показывать при local || null
  if (accountData.accountType === AccountTypeEnum.ldap) {
    accountData.password = null;
    return false;
  }
  return true;
});

// при @blur - для el-input, @change - для el-select: валидация обязательных полей
// если валидно - запись сохраняется/обновляется в сторе + уведомление об успешном сохранении
// если не валидно - уведомление об ошибках "затронутых полей"

watch(
  tagsString,
  (newTagsString) =>
    (accountData.tags = newTagsString.split(";").map((str) => {
      return {
        text: str.trim(),
      };
    }))
);
</script>

<template>
  <form class="form__row" :class="{ bigger: !isLocalAccount }">
    <el-input
      class="form__input form__input--tags"
      placeholder="Метка 1; Метка 2; ..."
      v-model="tagsString"
      clearable
    />
    <el-select
      class="form__input form__input--type"
      placeholder="Выберите тип"
      v-model="accountData.accountType"
    >
      <el-option
        v-for="([_, value], index) in Object.entries(AccountTypeEnum)"
        :key="index"
        :label="value"
        :value="value"
      />
    </el-select>
    <el-input
      class="form__input form__input--login"
      :class="{ bigger: !isLocalAccount }"
      placeholder="Введите логин..."
      v-model="accountData.login"
      clearable
    />
    <el-input
      class="form__input form__input--password"
      placeholder="Введите пароль..."
      v-model="accountData.password"
      v-if="isLocalAccount"
      type="password"
      clearable
      show-password
    />
    <el-button
      class="form__input form__input--delete"
      type="primary"
      :icon="Delete"
      @click="deleteAccount(accounts.indexOf(accountData))"
    />
  </form>
</template>

<style scoped>
.form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 25%)) 1fr 1fr 40px;
  gap: 10px;
}
.form__row.bigger {
  grid-template-columns: repeat(2, minmax(0, 25%)) 1fr 40px;
}
</style>
