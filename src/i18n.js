import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

// دالة لتحديث اتجاه الصفحة والكلاسات
const setDirectionAndClasses = (lng) => {
  const html = document.querySelector('html');
  const isRtl = lng === 'ar';
  
  // تعيين اتجاه HTML
  html.dir = isRtl ? 'rtl' : 'ltr';
  html.lang = lng;
  
  // إضافة/إزالة كلاسات
  if (isRtl) {
    document.body.classList.add('rtl-layout');
    document.body.classList.remove('ltr-layout');
  } else {
    document.body.classList.add('ltr-layout');
    document.body.classList.remove('rtl-layout');
  }
};


const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "navigator"], // ترتيب البحث عن اللغة
      caches: ["localStorage", "cookie"], // تخزين اللغة المختارة
    },

    debug: true,
    interpolation: { escapeValue: false }
  });

  setDirectionAndClasses(i18n.language);
  i18n.on('languageChanged', (lng) => {
    setDirectionAndClasses(lng);
  });
export default i18n;