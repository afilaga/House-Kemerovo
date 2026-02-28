# Google Analytics & Search Console API — Полный доступ ✓

**Дата настройки:** 2026-02-04  
**Статус:** ✅ Все доступы настроены и работают

---

## 🎉 Итог настройки

### ✅ Search Console (bistro-central.ru)
- **Service Account:** analytics-api@analytics-486317.iam.gserviceaccount.com
- **Уровень доступа:** Полный доступ (Full)
- **Данные доступны:**
  - Поисковые запросы и позиции
  - Клики, показы, CTR
  - Индексация страниц (14 проиндексировано, 4 ошибки)
  - Sitemap управление
  - URL Inspection API

### ✅ Google Analytics 4 (Property: 492965351)
- **Название:** 1229 - Ресторан паназиатской кухни
- **Account ID:** 358300882
- **Property ID:** 492965351
- **Stream ID:** G-CZY5YSTRM9
- **Service Account:** analytics-api@analytics-486317.iam.gserviceaccount.com
- **Уровень доступа:** Читатель (Reader)
- **Данные доступны:**
  - Сессии, пользователи, просмотры
  - Источники трафика
  - Страницы и события
  - Конверсии

---

## 📁 Файлы и ресурсы

### Ключ доступа
```
Путь: ~/analytics-api-key.json
Тип: Service Account Key (JSON)
```

### Скрипт для API
```
Путь: ~/google_analytics.py
Запуск: python ~/google_analytics.py
```

### Service Account Email
```
analytics-api@analytics-486317.iam.gserviceaccount.com
```

---

## 🚀 Быстрый запуск

### 1. Проверить доступ к Search Console:
```bash
python3 -c "
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.expanduser('~/analytics-api-key.json')

from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'],
    scopes=['https://www.googleapis.com/auth/webmasters.readonly']
)

service = build('webmasters', 'v3', credentials=creds)
sites = service.sites().list().execute()

print('✅ Search Console доступен!')
print(f'Сайты: {[s.get(\"siteUrl\") for s in sites.get(\"siteEntry\", [])]}')
"
```

### 2. Проверить доступ к Analytics:
```bash
export GA_PROPERTY_ID=492965351
export SC_SITE_URL=https://bistro-central.ru/
python ~/google_analytics.py
```

---

## 📊 Что можно делать через API

### Search Console API — как Яндекс.Вебмастер:

| Функция | API Endpoint | Описание |
|---------|--------------|----------|
| **Поисковые запросы** | `searchanalytics().query()` | Топ запросов, позиции, клики |
| **Индексация страниц** | `urlInspection().index()` | Проверить статус URL |
| **Sitemap** | `sitemaps().list()` | Управление sitemap |
| **Ошибки** | `sites().list()` | Список сайтов и ошибки |

**Пример получения поисковых запросов:**
```python
from googleapiclient.discovery import build

service = build('webmasters', 'v3', credentials=creds)

request = {
    'startDate': '2024-01-01',
    'endDate': '2024-01-31',
    'dimensions': ['query'],
    'rowLimit': 100
}

response = service.searchanalytics().query(
    siteUrl='https://bistro-central.ru/',
    body=request
).execute()

for row in response.get('rows', []):
    print(f"{row['keys'][0]}: {row['clicks']} кликов, позиция {row['position']:.1f}")
```

### Google Analytics 4 API — как Яндекс.Метрика:

| Функция | API Endpoint | Описание |
|---------|--------------|----------|
| **Сессии** | `run_report()` | Количество сессий |
| **Источники** | `run_report()` | Откуда пришли пользователи |
| **Страницы** | `run_report()` | Популярные страницы |
| **События** | `run_report()` | Кастомные события |

**Пример получения сессий:**
```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric

client = BetaAnalyticsDataClient(credentials=creds)

request = RunReportRequest(
    property="properties/492965351",
    dimensions=[Dimension(name="date")],
    metrics=[
        Metric(name="sessions"),
        Metric(name="activeUsers"),
        Metric(name="screenPageViews")
    ],
    date_ranges=[DateRange(start_date="7daysAgo", end_date="today")]
)

response = client.run_report(request)
for row in response.rows:
    print(f"{row.dimension_values[0].value}: {row.metric_values[0].value} сессий")
```

---

## 🔧 Технические данные

### Google Cloud Project
- **Project ID:** analytics-486317
- **Project Number:** 270087763129
- **Service Account:** analytics-api@analytics-486317.iam.gserviceaccount.com

### Включенные API
- ✅ Google Analytics Data API
- ✅ Search Console API

### OAuth Scopes
```
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/webmasters.readonly
```

---

## 📈 Возможности автоматизации

Теперь ты можешь автоматически:

1. **Ежедневно получать отчёты** о поисковых запросах
2. **Мониторить позиции** ключевых слов
3. **Отслеживать индексацию** новых страниц
4. **Сравнивать трафик** по периодам
5. **Экспортировать данные** в Excel/CSV
6. **Строить дашборды** в Data Studio
7. **Интегрировать с Telegram** для уведомлений

---

## 💡 Примеры использования

### Получить топ-10 поисковых запросов:
```python
python3 << 'EOF'
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.expanduser('~/analytics-api-key.json')

from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'],
    scopes=['https://www.googleapis.com/auth/webmasters.readonly']
)

service = build('webmasters', 'v3', credentials=creds)

request = {
    'startDate': '30daysAgo',
    'endDate': 'today',
    'dimensions': ['query'],
    'rowLimit': 10
}

response = service.searchanalytics().query(
    siteUrl='https://bistro-central.ru/',
    body=request
).execute()

print("🔍 Топ-10 поисковых запросов:")
for i, row in enumerate(response.get('rows', []), 1):
    query = row['keys'][0]
    clicks = row['clicks']
    position = row['position']
    print(f"{i}. {query} — {clicks} кликов (поз. {position:.1f})")
EOF
```

### Получить статистику Analytics за неделю:
```python
python3 << 'EOF'
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.expanduser('~/analytics-api-key.json')

from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric

creds = service_account.Credentials.from_service_account_file(
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'],
    scopes=['https://www.googleapis.com/auth/analytics.readonly']
)

client = BetaAnalyticsDataClient(credentials=creds)

request = RunReportRequest(
    property="properties/492965351",
    dimensions=[Dimension(name="date")],
    metrics=[
        Metric(name="sessions"),
        Metric(name="activeUsers"),
        Metric(name="screenPageViews"),
        Metric(name="bounceRate")
    ],
    date_ranges=[DateRange(start_date="7daysAgo", end_date="today")]
)

response = client.run_report(request)

print("📊 Статистика за последние 7 дней:")
print(f"{'Дата':<12} {'Сессии':<10} {'Активные':<10} {'Просмотры':<12} {'Bounce':<8}")
print("-" * 60)
for row in response.rows:
    date = row.dimension_values[0].value
    sessions = row.metric_values[0].value
    users = row.metric_values[1].value
    views = row.metric_values[2].value
    bounce = row.metric_values[3].value
    print(f"{date:<12} {sessions:<10} {users:<10} {views:<12} {bounce:<8}")
EOF
```

---

## 🔐 Безопасность

⚠️ **Важно:** Файл `~/analytics-api-key.json` содержит приватный ключ. Никому не показывай и не коммить в git!

**Рекомендации:**
- Храни ключ в безопасном месте
- Не добавляй в репозитории
- Используй переменные окружения в production

---

## 📞 Поддержка

Если что-то не работает:
1. Проверь что ключ на месте: `ls ~/analytics-api-key.json`
2. Проверь доступы: запусти скрипт `~/google_analytics.py`
3. Проверь что Service Account не удалён из сервисов

---

**✅ Настройка завершена! API полностью функционален.**
