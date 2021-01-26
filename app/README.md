# AVC Forms App

This project allows user to set patients AVC related data via a form. It allows CSV import/export and implements Snowmed terminology

## Launch Project

After cloning this repository, proceed as follows :

`yarn install`

`yarn start`

## Translation

The application uses I18n package to handle translations. In order to add different languages, please follow the next few steps : 

- Add new translations files

    First step is to add translation files in which we will type the translations. To do so, go to `src/locales` and add a folder matching the new language to add. For example, to add Italian language support, do as follow :
  
  - Add an `it` folder within `src/locales`
  - Copy and paste the file `src/locales/en/translation.json` in it
  - Replace the `src/locales/it/translation.json` values by their italian translation values.

- Edit `src/locales/i18n.ts` file
  
    For now, there is only 3 languages available : French, English and Spanish. In the file header we can see their translation files are imported as follow :

    ```typescript
    import translationEN from "./en/translation.json";
    import translationFR from "./fr/translation.json";
    import translationES from "./es/translation.json";
    ```

    Following our example, we need to import our italian translation file like so :

    ```typescript
    import translationIT from "./it/translation.json";
    ```

    Then we need to add italian language support in the i18n package config like so :

  ```typescript 
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
    "it-IT": {
        translation: translationIT
    }
  };
  ```

- The last step is to add an Italian flag in the language selector component, in order for the user to be able to change languages.
  
  To do so, go to the file located at `src/components/LanguageSelect.tsx` and edit as follows :

  ```jsx
  <Select value={i18n.language} onChange={handleLanguageChange}>
    <MenuItem value={"en-EN"}>
        <ReactCountryFlag svg countryCode="GB" />
    </MenuItem>
    <MenuItem value={"fr-FR"}>
        <ReactCountryFlag svg countryCode="FR" />
    </MenuItem>
    <MenuItem value={"es-ES"}>
        <ReactCountryFlag svg countryCode="ES" />
    </MenuItem>

    // NEW ITALIAN VALUE IS ADDED HERE
    <MenuItem value={"it-IT"}>
        <ReactCountryFlag svg countryCode="IT" />
    </MenuItem>
  </Select>
  ```

    What is important to understand :
    - The MenuItem value prop value has to be the key set in the resource object in `src/locales/i18n.ts`, so in our example it is `it-IT`
    - The ReactCountryFlag countryCode value has to be the ISO 3166-1 Alpha-2 code matching the country. In our example, it is `IT`
