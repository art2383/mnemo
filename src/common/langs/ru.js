const ru = {
  common: {
    clear: 'Очистить',
    copy: 'Копировать',
    paste: 'Вставить',
  },
  navBar: {
    home: 'Главная',
    valid: 'Валидная Фраза',
    invalid: 'Невалидная Фраза',
    input: 'Ввести Фразу',
    word12: '12-ое Слово',
    theme: 'Переключить тему',
    lang: 'Переключить язык',
    settings: 'Настройки'
  },
  home: {
    h1: 'Главная',
    things: 'Что здесь можно сделать',
    valid: 'Создать валидную по BIP-39 сид фразу',
    invalid: 'Создать альтернативную (невалидную) фразу',
    input: 'Ввести сид фразу и проверить ее',
    differentChains: 'Сгенерировать адреса в разных блокчейнах',
    word12: 'Вычислить 12-ое слово из первых 11-ти'
  },
  seed: {
    h1valid: 'Валидная Фраза',
    h1invalid: 'Невалидная фраза',
    h1input: 'Ввести фразу',
    generate: 'Сгенерировать',
    input: 'Ввести',
    aboutValid: 'Стандарт BIP-39: 11 случайных слов и контрольная сумма',
    aboutInvalid: 'Словарь BIP-39: 12 случайных слов',
    aboutInput: 'Вашу собственную сид фразу',
    validity: 'Валидность',
    aboutValidity: 'Проверка длины, соответствия словарю и контрольной суммы',
    validationLength: 'Допустимая длина',
    validationDictionary: 'Слова из словаря',
    validationBip39: 'Контрольная сумма',
    passphrase: 'Пасс-фраза, опционально',
    passphraseAbout: 'Для усиления безопасности (также BIP-39)',
    passphrasePlaceholder: 'Ваша пасс-фраза',
    wordsTable: 'Таблица Слов',
    wordsTableAbout: 'Индекс в словаре BIP-39, в десятеричной и hex форме',
    word: 'Слово',
    line: 'Строка',
    hex: 'Hex',
    seed: 'Сид',
    seedAbout: 'Все еще BIP-39: бинарный сид в hex представлении',
    rootKeys: 'Корневые Ключи',
    rootKeysAbout: 'BIP-32: корневой приватный и публичный ключи, вычисленные из сида',
    privateKey: 'Приватный Ключ',
    publicKey: 'Публичный Ключ',
    derivationAbout: 'BIP-32 деривация для {title} при помощи BIP-44 пути: {path}=',
    privateKeys: 'Приватные Ключи',
    publicKeys: 'Публичные Ключи',
    addresses: 'Адреса'
  },
  word12: {
    h1: '12-ое Слово',
    comingSoon: 'Скоро...'
  },
  settings: {
    h1: 'Настройки',
    general: 'Общие',
    exposePrivateKeys: 'Показывать приватные ключи',
    qDerivations: 'Количество Дериваций',
    plenty: '9 предостаточно, пожалейте процессор'
  }
}

export default ru