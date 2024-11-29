FROM hlohaus789/g4f:latest-slim

# Створення необхідних директорій і встановлення бібліотек
RUN mkdir -p /app/har_and_cookies /app/generated_images \
    && rm -r -f /app/g4f/ \
    && pip install -U g4f[slim]

# Відкриття порту
EXPOSE 10000

# Встановлюємо порт з змінної середовища PORT
ENV PORT 10000

# Запуск сервера з використанням PORT
CMD ["bash", "-c", "python -m g4f.cli api --gui --debug --host 0.0.0.0 --port ${PORT}"]
