import React from "react";
import { useTranslation } from "react-i18next";
// import ReactCountryFlag from "react-country-flag";
import { Select, MenuItem } from "@material-ui/core";

type LanguageSelectProps = {};

const LanguageSelect: React.FC<LanguageSelectProps> = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    i18n.changeLanguage(event.target.value as string);
  };
  return (
    <Select value={i18n.language} onChange={handleLanguageChange}>
      <MenuItem value={"en-EN"}>EN</MenuItem>
      <MenuItem value={"fr-FR"}>FR</MenuItem>
      <MenuItem value={"es-ES"}>ES</MenuItem>
      <MenuItem value={"ca-CA"}>CA</MenuItem>
    </Select>
  );
};

export default LanguageSelect;
