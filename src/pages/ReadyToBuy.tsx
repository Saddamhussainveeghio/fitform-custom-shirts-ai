
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ShoppingCart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReadyToBuy = () => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);

  const shirts = [
    {
      id: 1,
      name: "Classic White Formal",
      price: 4500,
      originalPrice: 5500,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Crisp white formal shirt perfect for office and formal events",
      rating: 4.8,
      reviews: 124,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Light Blue", "Pink"],
    },
    {
      id: 2,
      name: "Premium Blue Pinstripe",
      price: 5200,
      originalPrice: 6200,
      image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elegant blue pinstripe shirt for sophisticated professionals",
      rating: 4.9,
      reviews: 89,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Navy", "Gray"],
    },
    {
      id: 3,
      name: "Executive Black",
      price: 4800,
      originalPrice: 5800,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Sophisticated black formal shirt for executive meetings",
      rating: 4.7,
      reviews: 156,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Charcoal", "Dark Blue"],
    },
    {
      id: 4,
      name: "Royal Navy Formal",
      price: 5000,
      originalPrice: 6000,
      image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Rich navy blue formal shirt with premium cotton fabric",
      rating: 4.8,
      reviews: 98,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Royal Blue", "Midnight Blue"],
    },
    {
      id: 5,
      name: "Slim Fit Gray",
      price: 4700,
      originalPrice: 5700,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern slim fit gray shirt for contemporary professionals",
      rating: 4.6,
      reviews: 142,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Gray", "Light Gray", "Charcoal"],
    },
    {
      id: 6,
      name: "French Cuff Premium",
      price: 6500,
      originalPrice: 7500,
      image: "https://images.unsplash.com/photo-1549298916-acc8b44f8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Luxury formal shirt with French cuffs and mother-of-pearl buttons",
      rating: 4.9,
      reviews: 67,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Cream", "Light Blue"],
    },
  ];

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(shirts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const addToCart = (shirt: any) => {
    toast({
      title: "Added to Cart",
      description: `${shirt.name} has been added to your cart`,
    });
  };

  const getCurrentShirts = () => {
    const startIndex = currentSlide * itemsPerPage;
    return shirts.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ready to Buy</h1>
          <p className="text-xl opacity-90">
            Premium formal shirts ready for immediate delivery
          </p>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentShirts().map((shirt) => (
              <Card key={shirt.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={shirt.image}
                    alt={shirt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(shirt.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({shirt.reviews})
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{shirt.name}</h3>
                  <p className="text-muted-foreground mb-4">{shirt.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">
                      PKR {shirt.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      PKR {shirt.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive" className="ml-auto">
                      {Math.round(((shirt.originalPrice - shirt.price) / shirt.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm font-medium">Sizes:</span>
                    {shirt.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium">Colors:</span>
                    {shirt.colors.map((color) => (
                      <Badge key={color} variant="secondary">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => addToCart(shirt)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReadyToBuy;
