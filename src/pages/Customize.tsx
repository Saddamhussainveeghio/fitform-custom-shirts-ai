import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Customize = () => {
  const { toast } = useToast();
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCuff, setSelectedCuff] = useState(0);
  const [selectedPocket, setSelectedPocket] = useState(0);
  const [customRequests, setCustomRequests] = useState("");

  const fabrics = [
    {
      name: "Premium Cotton",
      price: 3500,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "100% Premium Cotton - Breathable and comfortable",
      quality: "Premium",
    },
    {
      name: "Egyptian Cotton",
      price: 5500,
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Egyptian Cotton - Ultimate luxury and softness",
      quality: "Luxury",
    },
    {
      name: "Linen Blend",
      price: 4200,
      image: "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Cotton-Linen Blend - Perfect for hot weather",
      quality: "Premium",
    },
    {
      name: "Silk Cotton",
      price: 6800,
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Silk-Cotton Mix - Elegant with natural sheen",
      quality: "Luxury",
    },
  ];

  const colors = [
    { name: "Classic White", color: "#FFFFFF", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Sky Blue", color: "#87CEEB", image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Light Pink", color: "#FFB6C1", image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Lavender", color: "#E6E6FA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mint Green", color: "#98FB98", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Cream", color: "#F5F5DC", image: "https://images.unsplash.com/photo-1549298916-acc8b44f8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  const cuffStyles = [
    { name: "Button Cuff", price: 0, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "French Cuff", price: 800, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Rounded Cuff", price: 300, image: "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Square Cuff", price: 200, image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  const pocketOptions = [
    { name: "No Pocket", price: 0, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Single Pocket", price: 200, image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Double Pocket", price: 400, image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Flap Pocket", price: 600, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  const calculateTotalPrice = () => {
    const fabricPrice = fabrics[selectedFabric].price;
    const cuffPrice = cuffStyles[selectedCuff].price;
    const pocketPrice = pocketOptions[selectedPocket].price;
    return fabricPrice + cuffPrice + pocketPrice;
  };

  const addToCart = () => {
    const customShirt = {
      fabric: fabrics[selectedFabric].name,
      color: colors[selectedColor].name,
      cuff: cuffStyles[selectedCuff].name,
      pocket: pocketOptions[selectedPocket].name,
      customRequests,
      totalPrice: calculateTotalPrice(),
    };

    toast({
      title: "Custom Shirt Added to Cart",
      description: `Your custom ${customShirt.fabric} shirt in ${customShirt.color} has been added to cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customize Your Shirt</h1>
          <p className="text-xl opacity-90">
            Create your perfect formal shirt with our customization options
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fabric Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Fabric</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fabrics.map((fabric, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedFabric === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedFabric(index)}
                    >
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{fabric.name}</h3>
                        <Badge variant={fabric.quality === "Luxury" ? "default" : "secondary"}>
                          {fabric.quality}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {fabric.description}
                      </p>
                      <p className="font-bold text-primary">
                        PKR {fabric.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Color & Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedColor === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedColor(index)}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="text-sm font-medium">{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cuff Design */}
            <Card>
              <CardHeader>
                <CardTitle>Cuff Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cuffStyles.map((cuff, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedCuff === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCuff(index)}
                    >
                      <img
                        src={cuff.image}
                        alt={cuff.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{cuff.name}</span>
                        <span className="text-primary font-bold">
                          {cuff.price > 0 ? `+PKR ${cuff.price}` : "Included"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pocket Options */}
            <Card>
              <CardHeader>
                <CardTitle>Pocket Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pocketOptions.map((pocket, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedPocket === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPocket(index)}
                    >
                      <img
                        src={pocket.image}
                        alt={pocket.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{pocket.name}</span>
                        <span className="text-primary font-bold">
                          {pocket.price > 0 ? `+PKR ${pocket.price}` : "Included"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Customizations</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="custom-requests">
                  Special requests or additional customizations
                </Label>
                <Textarea
                  id="custom-requests"
                  placeholder="Enter any special requests, monogram details, or additional customizations..."
                  className="mt-2"
                  value={customRequests}
                  onChange={(e) => setCustomRequests(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fabric:</span>
                    <span className="font-medium">{fabrics[selectedFabric].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color:</span>
                    <span className="font-medium">{colors[selectedColor].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuff Style:</span>
                    <span className="font-medium">{cuffStyles[selectedCuff].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pocket:</span>
                    <span className="font-medium">{pocketOptions[selectedPocket].name}</span>
                  </div>
                </div>

                <hr />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>PKR {fabrics[selectedFabric].price.toLocaleString()}</span>
                  </div>
                  {cuffStyles[selectedCuff].price > 0 && (
                    <div className="flex justify-between">
                      <span>Cuff Style:</span>
                      <span>+PKR {cuffStyles[selectedCuff].price.toLocaleString()}</span>
                    </div>
                  )}
                  {pocketOptions[selectedPocket].price > 0 && (
                    <div className="flex justify-between">
                      <span>Pocket:</span>
                      <span>+PKR {pocketOptions[selectedPocket].price.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    PKR {calculateTotalPrice().toLocaleString()}
                  </span>
                </div>

                <Button className="w-full" onClick={addToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Estimated delivery: 7-10 business days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
