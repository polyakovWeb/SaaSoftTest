import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { AccountTypeEnum, type AccountI } from "@/types/Account.types";
import { ElMessage } from "element-plus";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<AccountI[]>([]);

  // загружаем данные при инициализации стора
  getFromLocalStorage();

  function addNewEmptyAccount() {
    accounts.value.push({
      id: new Date().getTime(),
      tags: null,
      accountType: null,
      login: null,
      password: null,
    });
  }

  function deleteAccount(account: AccountI) {
    const index = accounts.value.indexOf(account);
    if (index === -1) {
      ElMessage.error({
        message: "Ошибка удаления: аккаунт не найден",
        duration: 2000,
      });
      return;
    }
    accounts.value.splice(index, 1);
    saveToLocalStorage();
    ElMessage.success({
      message: "Аккаунт успешно удалён!",
      duration: 2000,
    });
  }

  function saveAccount(oldAccount: AccountI, updatedAccount: AccountI) {
    const index = accounts.value.indexOf(oldAccount);
    if (index === -1) {
      ElMessage.error({
        message: "Ошибка сохранения: аккаунт не найден",
        duration: 2000,
      });
      return;
    }
    accounts.value[index] = { ...updatedAccount };
    ElMessage.success({
      message: "Данные успешно сохранены!",
      duration: 2000,
    });
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  }

  function getFromLocalStorage() {
    const savedAccountsString = localStorage.getItem("accounts");
    if (savedAccountsString) {
      const accountsData = JSON.parse(savedAccountsString);
      accounts.value = accountsData;
    }
  }

  return {
    accounts,
    addNewEmptyAccount,
    deleteAccount,
    saveAccount,
  };
});
