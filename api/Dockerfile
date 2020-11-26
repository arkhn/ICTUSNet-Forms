FROM python:3.9
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_SETTINGS_MODULE=avc_forms.settings
ENV PYTHONPATH=/api
RUN apt-get update && apt-get install -y netcat
WORKDIR /api
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
