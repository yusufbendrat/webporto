# Gunakan base image Python yang ringan
FROM python:3.12-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file requirements dan install dependencies terlebih dahulu
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Salin seluruh isi project ke dalam container
COPY . /app

# Jalankan collectstatic untuk mengumpulkan static files
RUN python manage.py collectstatic --noinput

# Expose port Gunicorn
EXPOSE 8000

# Jalankan server Gunicorn untuk production
CMD ["gunicorn", "webporto.wsgi:application", "--bind", "0.0.0.0:8000"]
