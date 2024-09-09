import { createI18n } from "vue-i18n";
import zn from "./zn";
import en from "./en";

const i18n = createI18n({
  locale: "zn",
  messages: {
    zn: zn,
    en: en
  }
});

export default i18n;
