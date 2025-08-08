import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Профессиональное оборудование Pro",
      price: 45900,
      image: "/img/9812a804-4535-4cb5-ae81-baa26fdfbac8.jpg",
      description: "Высококачественное оборудование для бизнеса",
      category: "Оборудование"
    },
    {
      id: 2,
      name: "Деловые аксессуары Premium",
      price: 12500,
      image: "/img/09d54177-c84e-4efa-96fc-aeb428689e6a.jpg",
      description: "Стильные корпоративные аксессуары",
      category: "Аксессуары"
    },
    {
      id: 3,
      name: "Офисные решения Standard",
      price: 28900,
      image: "/img/9812a804-4535-4cb5-ae81-baa26fdfbac8.jpg",
      description: "Комплексные решения для офиса",
      category: "Оборудование"
    },
    {
      id: 4,
      name: "Бизнес-инструменты Elite",
      price: 67500,
      image: "/img/09d54177-c84e-4efa-96fc-aeb428689e6a.jpg",
      description: "Элитные инструменты для профессионалов",
      category: "Инструменты"
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: "Товар добавлен в корзину",
      description: product.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">BusinessStore</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <section className="mb-12 bg-primary text-primary-foreground rounded-lg p-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">
                  Профессиональные решения для бизнеса
                </h2>
                <p className="text-xl mb-6">
                  Качественное оборудование и аксессуары для серьезного бизнеса
                </p>
                <Button variant="secondary" size="lg">
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                  Посмотреть каталог
                </Button>
              </div>
            </section>

            {/* Products Grid */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Наши товары</h3>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <Button onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Info Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Delivery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Truck" size={24} className="mr-3 text-primary" />
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Быстрая доставка</h4>
                        <p className="text-sm text-muted-foreground">
                          Доставка по Москве в течение 1-2 дней
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">По всей России</h4>
                        <p className="text-sm text-muted-foreground">
                          Доставка в любой регион страны
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Package" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Бережная упаковка</h4>
                        <p className="text-sm text-muted-foreground">
                          Гарантируем сохранность товара
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="CreditCard" size={24} className="mr-3 text-primary" />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Banknote" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Наличными курьеру</h4>
                        <p className="text-sm text-muted-foreground">
                          Оплата при получении заказа
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="CreditCard" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Банковские карты</h4>
                        <p className="text-sm text-muted-foreground">
                          Visa, MasterCard, МИР
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Building" size={16} className="mt-1 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Безналичный расчет</h4>
                        <p className="text-sm text-muted-foreground">
                          Для юридических лиц
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cart Sidebar */}
          {isCartOpen && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Корзина
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Корзина пуста
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="font-bold text-lg">
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                        <Button className="w-full">
                          <Icon name="CreditCard" size={16} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Контакты</h3>
              <p className="text-sm text-muted-foreground mb-2">
                8 (800) 123-45-67
              </p>
              <p className="text-sm text-muted-foreground">
                info@businessstore.ru
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Информация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Гарантии</li>
                <li>Возврат товара</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Поддержка</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Помощь покупателю</li>
                <li>Техподдержка</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            © 2024 BusinessStore. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;