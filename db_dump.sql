-- Таблица ролей
CREATE TABLE roles (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(450) NOT NULL
);
-- Сразу добавляем роли в таблицу ролей
INSERT INTO roles (name) VALUES ('admin'), ('manager');

-- Таблица пользователей
CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   role_id BIGINT REFERENCES roles(id),
   first_name VARCHAR(300) NOT NULL,
   last_name VARCHAR(400) NOT NULL,
   email VARCHAR(300) NOT NULL,
   phone VARCHAR(300) NOT NULL,
   avatar TEXT DEFAULT NULL,
   hash_password TEXT NOT NULL,
   is_agree BOOLEAN NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица категорий
CREATE TABLE categories (
   id BIGSERIAL PRIMARY KEY,
   category_name VARCHAR(500) NOT NULL UNIQUE, -- Добавил UNIQUE
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица оптовой закупки
CREATE TABLE wholesale_purchase (
   id BIGSERIAL PRIMARY KEY,
   category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
   product_name VARCHAR(300) NOT NULL,
   product_brand TEXT,
   quantity INTEGER NOT NULL, 
   buy_price_total DECIMAL(10, 2), -- Удобно для отчета: сколько потратили за всю партию
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица товаров
CREATE TABLE products (
   id BIGSERIAL PRIMARY KEY,
   category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
   opt_id BIGINT REFERENCES wholesale_purchase(id) ON DELETE CASCADE,
   product_name VARCHAR(255) NOT NULL,
   image TEXT,
   sku VARCHAR(100) NOT NULL UNIQUE,
   sale_price DECIMAL(10, 2),
   current_quantity INTEGER DEFAULT 0 -- Здесь храним остаток
);

-- Таблица заказов
CREATE TABLE orders (
   id BIGSERIAL PRIMARY KEY,
   user_id BIGINT REFERENCES users(id),
   order_type VARCHAR(20) CHECK (order_type IN ('SALE', 'INTERNAL')), -- SALE для продаж, INTERNAL для выдачи
   customer_or_dept VARCHAR(255), -- Имя клиента ИЛИ название отдела (кому выдали)
   status VARCHAR(100) DEFAULT 'pending',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица значений заказа
CREATE TABLE order_items (
   id BIGSERIAL PRIMARY KEY,
   order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
   product_id BIGINT REFERENCES products(id),
   quantity INTEGER NOT NULL
);