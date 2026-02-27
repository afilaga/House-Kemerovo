# 🏡 Kemerovo House — Продающий лендинг недвижимости

**Live:** [kemerovohouse.surma.su](https://kemerovohouse.surma.su)  
**Статус:** ✅ Задеплоено на Vercel · SEO настроено · Аналитика подключена

---

## 📦 О проекте

Полный маркетинговый пакет для продажи частного дома в Кемерово (191 м², Кировский район).  
Сделано за 1 день: от съёмки до запуска в продакшн.

**Что входит в пакет:**
- Профессиональная фотосъёмка объекта
- AI-генерации (летний вид, ретушь, чистые помещения)
- Авито-карточки с проработанным текстом
- Лендинг с фото-слайдерами и Before/After эффектом
- SEO — Яндекс.Вебмастер + Google Search Console
- Яндекс.Метрика для отслеживания трафика

---

## 🗂 Структура проекта

```
House/
├── landing/                    # Сайт (деплоится на Vercel)
│   ├── index.html              # Главная страница
│   ├── css/
│   │   └── style.css           # Стили
│   ├── js/
│   │   └── main.js             # Скрипты (параллакс, анимации)
│   ├── images/                 # Оптимизированные фото (WebP)
│   │   ├── hero/               # Слайдер Hero-секции
│   │   ├── kitchen/            # Кухня
│   │   ├── master/             # Мастер-спальня (день/ночь)
│   │   ├── wardrobe/           # Гардероб
│   │   ├── kids/               # Детская
│   │   ├── cabinet/            # Кабинет-спальня
│   │   ├── cozy/               # Уютная комната
│   │   ├── bath1/ bath2/       # Ванные комнаты
│   │   ├── garage/             # Гараж
│   │   └── terrace/            # Терраса и двор
│   ├── sitemap.xml             # Sitemap для SEO
│   ├── robots.txt              # Инструкции для ботов
│   └── yandex_*.html           # Верификация Яндекс.Вебмастера
│
├── Photos/                     # Исходные фото (RAW / JPG)
├── avito_posters/              # Постеры для Авито
├── image_scripts/              # Node.js скрипты конвертации
│   └── convert_to_webp.js      # Конвертация JPG → WebP
│
├── vercel.json                 # Конфиг деплоя Vercel
├── Google_API_Setup.md         # Настройка Google API
├── yandex_api_access_report.md # Токены Яндекс API
└── SEO_DESCRIPTIONS.md         # Тексты для SEO и Авито
```

---

## 🚀 Запуск локально

```bash
# Запуск локального сервера
npx serve landing -p 4321

# Открыть в браузере
open http://localhost:4321
```

---

## 📡 Деплой

Проект задеплоен на **Vercel** через GitHub.  
Каждый `git push` → автоматический деплой.

```bash
git add .
git commit -m "описание"
git push
```

**Роутинг** (`vercel.json`) — все запросы смотрят в папку `landing/`.

---

## 🔍 SEO

### Яндекс
- **Вебмастер:** сайт добавлен и подтверждён через API
- **Метрика:** счётчик `107041482` установлен на сайте
- **Запрос переобхода:** отправлен через Яндекс.Вебмастер API

API токены → `yandex_api_access_report.md`

```bash
# Запросить ускоренный обход страницы
curl -X POST \
  -H "Authorization: OAuth <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://kemerovohouse.surma.su/"}' \
  "https://api.webmaster.yandex.net/v4/user/126474932/hosts/https:kemerovohouse.surma.su:443/recrawl/queue"
```

### Google
- **Search Console:** подтверждён через метатег, sitemap засабмичен
- **Service Account:** `analytics-api@analytics-486317.iam.gserviceaccount.com`
- **Ключ:** `~/analytics-api-key.json`

```bash
# Проверить статус индексации
python3 -c "
import os, requests
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.expanduser('~/analytics-api-key.json')
from google.oauth2 import service_account
import google.auth.transport.requests

creds = service_account.Credentials.from_service_account_file(
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'],
    scopes=['https://www.googleapis.com/auth/webmasters']
)
creds.refresh(google.auth.transport.requests.Request())
resp = requests.post(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    headers={'Authorization': f'Bearer {creds.token}'},
    json={'inspectionUrl': 'https://kemerovohouse.surma.su/', 'siteUrl': 'https://kemerovohouse.surma.su/'}
)
r = resp.json().get('inspectionResult', {}).get('indexStatusResult', {})
print(r.get('verdict'), '|', r.get('coverageState'))
"
```

---

## 🖼 Конвертация изображений

```bash
# Конвертация всех JPG в WebP
node image_scripts/convert_to_webp.js
```

---

## 📊 Кейс

| Параметр | До | После |
|---|---|---|
| Фото | Телефон | Проф. съёмка + AI |
| Авито карточка | Стандарт | Продающий текст + AI-фото |
| Сайт | Нет | Лендинг с слайдерами |
| SEO | Нет | Яндекс + Google |
| Срок на рынке | 2,5 года | — |
| Стоимость пакета | 100к (хоум-стейджинг) | 20к (фото) + бонус |

> Объект снят и запущен за 1 день. Фотограф — **Андрей Филатьев** ([it.filatiev.pro](https://it.filatiev.pro))

---

## 📞 Контакты собственника

- **Telegram:** [@ersergei21](https://t.me/ersergei21)
- **Телефон:** +7 (905) 906-00-26
