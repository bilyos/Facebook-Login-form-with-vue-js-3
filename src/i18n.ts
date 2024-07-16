import { createI18n } from 'vue-i18n'
import messages from './i18n.json'

const getBrowserLanguage = (): string => {
  const locale = navigator.language.split('-')[0]
  if (locale === 'fr') return locale
  return 'en'
}

// Create the i18n instance
const i18n = createI18n({
  locale: getBrowserLanguage(),
  fallbackLocale: 'en',
  legacy: false,
  messages: messages
})

export default i18n
