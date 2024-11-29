FROM hlohaus789/g4f:latest-slim

# Створення необхідних директорій і встановлення бібліотек
RUN mkdir -p /app/har_and_cookies /app/generated_images \
    && rm -r -f /app/g4f/ \
    && pip install -U g4f[slim]

# Змінна середовища для порту
EXPOSE 10000

# Відкриття порту
ENV PORT 10000

# Запуск сервера без додаткових аргументів
CMD ["bash", "-c", "python -m g4f.cli api --gui --debug"]
