# Sử dụng image Python chính thức
FROM python:3.9-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp cần thiết vào container
COPY requirements.txt /app/

# Cài đặt các thư viện từ requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn vào container
COPY . /app/

# Mở cổng 5000 để ứng dụng Flask có thể truy cập
EXPOSE 5000

# Chạy ứng dụng Flask khi container khởi động
CMD ["python", "app.py"]
