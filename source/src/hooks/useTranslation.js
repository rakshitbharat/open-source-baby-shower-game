import { useSelector } from "react-redux";
import english from "../locales/english.json";
import gujarati from "../locales/gujarati.json";

const translations = {
  english,
  gujarati,
};

export const useTranslation = () => {
  const { currentLanguage } = useSelector((state) => state.language);

  const t = (key, params = {}) => {
    const keys = key.split(".");
    let value = translations[currentLanguage];

    for (const k of keys) {
      value = value?.[k];
    }

    if (!value) return key;

    return Object.entries(params).reduce(
      (acc, [key, val]) => acc.replace(`{${key}}`, val),
      value
    );
  };

  return { t };
};
