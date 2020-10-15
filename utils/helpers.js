// eslint-disable-next-line import/prefer-default-export
export const formatDate = (dateObject, options = { locale: 'en-US' }) => new Intl.DateTimeFormat(options.locale, options.format).format(dateObject);
