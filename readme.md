# Взаимодействие с api Visiconect

Класс на node.js написанный для взаимодействия с Visionect Joan 6.
Для работы создайте в раздели USER ключи c помощью кнопки "Add new API key"

![Картинка](https://raw.githubusercontent.com/gavorilka/test_api_signs/b155cc410e3e3d0a22b6f093267e19b6564d66dd/img.jpg)


## Документация

[DocumentationVisionect Server Management API](https://api.visionect.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/gavorilka/test_api_signs.git
```

Go to the project directory

```bash
  cd test_api_signs
```

Install dependencies

```bash
  npm install
```

Замените на реальные значения "Yor_Server:Your_port_if_you_nead", "Username / API key", "Password / API secret" и  "uuid_device" в index файле. И запускайтесь

Start the script

```bash
  npm run dev
```
Планируется когда-нибудь хоть переменные в .env вынести