# eslint-plugin-lodash-to-native

## Установка

```
$ npm i eslint --save-dev
```

```
$ npm install -S https://github.com/georgiylityagin/eslint-plugin-lodash-to-native.git

```

## Использование

Надо добавить `lodash-to-native` в секцию плагинов в конфигурационном файле `.eslintrc`.

```json
    "plugins": [
        "lodash-to-native"
    ]

```

Потом надо добавить правило

```json
     "rules": {
      "lodash-to-native/map": "warn"
  },
```

## Тесты

Автотесты `npm run test` почему-то не хотят нормально работь.

Добавил файл `test-rule.js`, который можно использовать для проверки. Там всё правильно подсвечивается и fix работает.

Правило можно также проверить на [astexplorer](https://astexplorer.net/).