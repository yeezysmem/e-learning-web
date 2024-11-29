FROM hlohaus789/g4f:latest-slim

RUN mkdir -p /app/har_and_cookies /app/generated_images \
    && rm -r -f /app/g4f/ \
    && pip install -U g4f[slim]

EXPOSE 1337

CMD ["bash", "-c", "python -m g4f.cli api --gui --debug"]
