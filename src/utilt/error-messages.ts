// eslint-disable-next-line no-shadow
enum ERROR_MESSAGES {
  SERVER = 'Ошибка на стороне сервера',
  CARD_404 = 'Карточка с таким id не существует',
  USER_404 = 'Пользователь с таким id не найден',
  SOURCE_404 = 'Ресурс не найден',
  USER_EXISTS = 'Пользователь с таким email уже существует',
  INVALID_DATA = 'Переданы невалидные данные',
  INVALID_TOKET = 'Передан невалидный токен ',
  AUTHORIZATION_BAD_DATA = 'Неправильный email или пароль',
  AUTHORIZATION_NEED = 'Необходима авторизация',
  FORBIDDEN = 'У Вас нет прав для совершения данного действия',
}

export default ERROR_MESSAGES;
