from sqlalchemy import Column, BigInteger, String, Text, Boolean, DateTime, ForeignKey, Integer, DECIMAL, func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Role(Base):
    __tablename__ = 'roles'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(450), nullable=False)

class User(Base):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    role_id = Column(BigInteger, ForeignKey('roles.id'))
    first_name = Column(String(300), nullable=False)
    last_name = Column(String(400), nullable=False)
    email = Column(String(300), nullable=False)
    phone = Column(String(300), nullable=False)
    avatar = Column(Text, nullable=True)
    hash_password = Column(Text, nullable=False)
    is_agree = Column(Boolean, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Category(Base):
    __tablename__ = 'categories'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    category_name = Column(String(500), nullable=False, unique=True)
    created_at = Column(DateTime, server_default=func.now())

class WholesalePurchase(Base):
    __tablename__ = 'wholesale_purchase'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    category_id = Column(BigInteger, ForeignKey('categories.id', ondelete='SET NULL'))
    product_name = Column(String(300), nullable=False)
    product_brand = Column(Text, nullable=True)
    quantity = Column(Integer, nullable=False)
    buy_price_total = Column(DECIMAL(10, 2))
    created_at = Column(DateTime, server_default=func.now())

class Product(Base):
    __tablename__ = 'products'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    category_id = Column(BigInteger, ForeignKey('categories.id', ondelete='SET NULL'))
    opt_id = Column(BigInteger, ForeignKey('wholesale_purchase.id', ondelete='CASCADE'))
    product_name = Column(String(255), nullable=False)
    image = Column(Text, nullable=True)
    sku = Column(String(100), nullable=False, unique=True)
    sale_price = Column(DECIMAL(10, 2))
    current_quantity = Column(Integer, default=0)

class Order(Base):
    __tablename__ = 'orders'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey('users.id'))
    order_type = Column(String(20)) # Ограничение CHECK лучше делать в БД или валидаторе Pydantic
    customer_or_dept = Column(String(255))
    status = Column(String(100), default='pending')
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class OrderItem(Base):
    __tablename__ = 'order_items'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    order_id = Column(BigInteger, ForeignKey('orders.id', ondelete='CASCADE'))
    product_id = Column(BigInteger, ForeignKey('products.id'))
    quantity = Column(Integer, nullable=False)