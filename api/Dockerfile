FROM python:3.9
ENV PYTHONUNBUFFERED=1
WORKDIR /api
ENV PYTHONPATH=/api
ENV DJANGO_SETTINGS_MODULE=avc_forms.settings
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["sh", "docker-entrypoint.sh"]
