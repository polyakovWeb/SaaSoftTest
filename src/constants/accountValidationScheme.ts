import * as yup from "yup";

export const accountValidationScheme = yup.object({
  tags: yup.string().max(50, "Максимальное количество символов - 50"),
  accountType: yup.string().required("Тип аккаунта обязателен для заполнения"),
  login: yup
    .string()
    .required("Логин обязателен для заполнения")
    .max(100, "Максимальное количество символов - 100"),
  password: yup
    .string()
    .required("Пароль обязателен для заполнения")
    .max(100, "Максимальное количество символов - 100"),
});
