import { TFunction } from "i18next";

export const dateIsValid = (t: TFunction) => (value?: Date | null) =>
  (value && !isNaN(value.getTime())) || !value || (t("invalidDate") as string);

export const dateNotInFuture = (t: TFunction) => (value?: Date | null) =>
  (value && value.getTime() < Date.now()) ||
  !value ||
  (t("dateNotInFuture") as string);

export const conditionalRequiredDate = (t: TFunction, condition: boolean) => (
  value?: Date | null
) => {
  return value !== null || condition || (t("requiredField") as string);
};
