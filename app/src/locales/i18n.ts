import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//Translations imports
import translationEN from "./en/translation.json";
import translationFR from "./fr/translation.json";
import translationES from "./es/translation.json";
import translationCA from "./ca/translation.json";
import translationPT from "./pt/translation.json";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  "fr-FR": {
    translation: translationFR,
  },
  "en-EN": {
    translation: translationEN,
  },
  "es-ES": {
    translation: translationES,
  },
  "ca-CA": {
    translation: translationCA,
  },
  "pt-PT": {
    translation: translationPT,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en-EN",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
