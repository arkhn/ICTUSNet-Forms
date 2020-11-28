FROM python:3.9.0-slim-buster as builder
WORKDIR /tmp
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY ./requirements.txt .
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /tmp/wheels -r requirements.txt

FROM python:3.9.0-slim-buster
RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat libpq-dev && \
    apt-get autoremove -y && \
    apt-get clean
RUN groupadd -r api && useradd --create-home --no-log-init -r -g api api
USER api:api
WORKDIR /home/api
ENV PYTHONPATH=/home/api
ENV PATH /home/api/.local/bin:${PATH}
ENV DJANGO_SETTINGS_MODULE=avc_forms.settings
COPY --from=builder --chown=api:api /tmp/wheels wheels
RUN pip install --user --no-cache wheels/*
COPY --chown=api:api . .
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
