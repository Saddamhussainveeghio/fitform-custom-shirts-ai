import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, Star, Users, Shirt, Ruler } from "lucide-react";

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Man in formal shirt
    "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Professional business shirt
    "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Business formal wear
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // White formal shirt
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const features = [
    {
      icon: <Shirt className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "Finest fabrics and superior craftsmanship",
    },
    {
      icon: <Ruler className="h-8 w-8 text-primary" />,
      title: "Perfect Fit",
      description: "AI-powered measurements for perfect fitting",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Custom Design",
      description: "Personalize every detail of your shirt",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Expert Tailoring",
      description: "Professional tailors with years of experience",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              FitForm
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in">
              Premium Formal Shirts Tailored to Perfection
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90 animate-fade-in">
              Experience the perfect blend of style, comfort, and craftsmanship.
              From ready-to-wear to custom designs, we create shirts that fit
              your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/ready-to-buy">
                <Button size="lg" className="text-lg px-8 py-4">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/customize">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                >
                  Customize Shirt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FitForm?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine traditional tailoring expertise with modern technology
              to deliver exceptional formal shirts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover our collection or create your perfect custom shirt today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ready-to-buy">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Browse Collection
              </Button>
            </Link>
            <Link to="/get-measured">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                Get Measured
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
