# backend-project-lvl2
<a href="https://codeclimate.com/github/KirilDz/backend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/96076a8e248fa718f62f/maintainability" /></a>
<a href="https://codeclimate.com/github/KirilDz/backend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/96076a8e248fa718f62f/test_coverage" /></a>
<a href="https://github.com/KirilDz/backend-project-lvl2/actions?query=workflow%3A%22Lint" target="_blank">![Node CI](https://github.com/KirilDz/backend-project-lvl2/workflows/Lint/badge.svg)</a>

<b>"Вычислитель отличий"</b> - программа, определяющая разницу между двумя структурами данных.<br> Вывод различий доступен в двух видах <b>plain</b> и <b>stylish</b>, а также вывод в json формат. 
Программа поддерживает работу с файлами <b>json</b> и <b>yml</b>.<br>

<b>Установка:</b>
  <ul>
    <li>Скачиваем Вычислитель отличий</li>
    <li>С корня проекта вводим комманду в консоль <b>npm link</b></li>
  </ul>
Приложение готово для использования!
<br>
Для начала поиска различий в двух файлах и вывода результата в ввиде форматтера <b>stylish</b> вводим в консоль следующую комманду:<br>
gendiff filepath/file1.json filepath/file2.json<br>

Так же можно указать форматтер явно:<br>
gendiff --format stylish filepath/file1.json filepath/file2.json<br>

Длы вывода результатов в ввиде форматтера plain вводим в консоль следующую комманду:<br>
gendiff --format plain filepath/file1.json filepath/file2.json<br>

Длы вывода результатов в формате .json:<br>
gendiff --format json filepath/file1.json filepath/file2.json<br>

<b>Демонстрация работы вычислителя отличий:</b>
<ul>
  <li>Stylish: <a href="https://asciinema.org/a/D3TkN067lnXBvD1xIvnOAclbc" target="_blank"><img src="https://asciinema.org/a/D3TkN067lnXBvD1xIvnOAclbc.svg" /></a></li>
  <li>Plain: <a href="https://asciinema.org/a/ilu2WA5nqIErY4paXENW3voKp" target="_blank"><img src="https://asciinema.org/a/ilu2WA5nqIErY4paXENW3voKp.svg" /></a></li>
  <li>JSON: <a href="https://asciinema.org/a/PuoTcfukimP9tNuZPCOl3EE3D"><img src="https://asciinema.org/a/PuoTcfukimP9tNuZPCOl3EE3D.svg" /></a></li>
</ul>