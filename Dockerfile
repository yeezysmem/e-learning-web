FROM hlohaus789/g4f:latest-slim

# Створення необхідних директорій і встановлення бібліотек
RUN mkdir -p /app/har_and_cookies /app/generated_images \
    && rm -r -f /app/g4f/ \
    && pip install -U g4f[slim]

# Змінна середовища для порту
ENV PORT 1337

# Відкриття порту (додатково, хоча Render автоматично відкриває порт)
EXPOSE 1337

# Запуск з використанням змінної PORT
CMD ["bash", "-c", "python -m g4f.cli api --gui --debug --host 0.0.0.0 --port ${PORT}"]