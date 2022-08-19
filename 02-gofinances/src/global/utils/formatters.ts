export const formatNumberToCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format

export const formatDateToLocaleDate = Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).format

export const formatDateToLongDate = Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long'
}).format