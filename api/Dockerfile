FROM python:3.9.0-slim-buster as builder
WORKDIR /tmp
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY ./requirements.txt .
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /tmp/wheels -r requirements.txt

FROM python:3.9.0-slim-buster
ENV DJANGO_SETTINGS_MODULE=avc_forms.settings
ENV PYTHONPATH=/api
RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat libpq-dev && \
    apt-get autoremove -y && \
    apt-get clean
COPY --from=builder /tmp/wheels /wheels
RUN pip install --no-cache /wheels/*
WORKDIR /api
COPY . .
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
