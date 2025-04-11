# Sử dụng image Node.js chính thức
FROM node:16

# Tạo thư mục trong container để chứa ứng dụng
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng vào container
COPY . .

# Mở cổng 3005 để ứng dụng có thể truy cập
EXPOSE 3005

# Chạy ứng dụng Node.js
CMD ["node", "app.js"]
