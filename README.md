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

```
npm run test
```