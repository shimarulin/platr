# Структура проекта

## Типы проектов и пакетов

Пакеты можно разделить по назначению:

- корневые пакеты монорепозиториев
- пакеты библиотек без сборки модулей
- пакеты библиотек со сборкой модулей
- пакеты приложений

Проекты можно разделить по уровню зависимости на проекты и подпроекты. Проекту соответствует _самостоятельный_ пакет,
либо _корневой_ пакет монорепозитория. Подпроекту соответствует пакет, являющийся отдельным _дочерним_ пакетом в составе
монорепозитория.

Таким образом получаем:

- _самостоятельный_ пакет
  - исходный код
  - конфигурационные файлы
  - дополнительные файлы
  - документация
- _корневой_ пакет
  - конфигурационные файлы
  - дополнительные файлы
  - документация
- _дочерний_ пакет
  - исходный код
  - конфигурационные файлы (необязательно)
  - дополнительные файлы
  - документация

## Общие файлы пакетов

Каждый пакет будет содержать следующие файлы:

```bash
.
├── LICENSE
├── README.md
├── package.json
└── ---
```

Рассмотрим их подробнее.

### LICENSE

Лицензия пакета. Можно выбирать из списка. В соответствии с выбором файл `LICENSE` формируется по предопределенному
шаблону. Информация о лицензии записывается в `package.json`. Для самостоятельных пакетов и корневых пакетов
монорепозиториев лицензия по умолчанию - _MIT_. Для дочерних пакетов выбор по умолчанию определяется корневым пакетом.

Поддерживаемые лицензии:

- [Apache 2 License](http://choosealicense.com/licenses/apache/)
- [MIT License](http://choosealicense.com/licenses/mit/)
- [Mozilla Public License 2.0](http://choosealicense.com/licenses/mpl-2.0/)
- [BSD 2-Clause (FreeBSD) License](http://choosealicense.com/licenses/bsd/)
- [BSD 3-Clause (NewBSD) License](http://choosealicense.com/licenses/bsd-3-clause/)
- [Internet Systems Consortium (ISC) License](http://en.wikipedia.org/wiki/ISC_license)
- [GNU AGPL 3.0 License](http://choosealicense.com/licenses/agpl-3.0/)
- [GNU GPL 3.0 License](http://choosealicense.com/licenses/gpl-3.0/)
- [Unlicense](http://unlicense.org/)
- [No License](http://choosealicense.com/licenses/no-license/)

Файлы конфигурации самостоятельных и корневых пакетов:

```bash
.
├── .editorconfig
├── .eslintrc.js
├── .gitignore
└── ---
```