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
      image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "100% Premium Cotton - Breathable and comfortable",
      quality: "Premium",
    },
    {
      name: "Egyptian Cotton",
      price: 5500,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Egyptian Cotton - Ultimate luxury and softness",
      quality: "Luxury",
    },
    {
      name: "Linen Blend",
      price: 4200,
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Cotton-Linen Blend - Perfect for hot weather",
      quality: "Premium",
    },
    {
      name: "Silk Cotton",
      price: 6800,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Silk-Cotton Mix - Elegant with natural sheen",
      quality: "Luxury",
    },
  ];

  const colors = [
    { name: "Classic White", color: "#FFFFFF", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Sky Blue", color: "#87CEEB", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Light Pink", color: "#FFB6C1", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Lavender", color: "#E6E6FA", image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mint Green", color: "#98FB98", image: "https://images.unsplash.com/photo-1602517062644-6eda66e25fae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Cream", color: "#F5F5DC", image: "https://images.unsplash.com/photo-1618156606154-04a7d8912d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  const cuffStyles = [
    { name: "Button Cuff", price: 0, image: "https://images.unsplash.com/photo-1622519407650-3df9883f76a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "French Cuff", price: 800, image: "https://images.unsplash.com/photo-1622445272461-c6726ba1d861?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Rounded Cuff", price: 300, image: "https://images.unsplash.com/photo-1635274531433-9bb61d41e94f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Square Cuff", price: 200, image: "https://images.unsplash.com/photo-1639066870768-ac18dcf93a47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  const pocketOptions = [
    { name: "No Pocket", price: 0, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Single Pocket", price: 200, image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Double Pocket", price: 400, image: "https://images.unsplash.com/photo-1618799805862-e0c52b24e579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Flap Pocket", price: 600, image: "https://images.unsplash.com/photo-1602810317536-5d5d7ce1b5f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
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
                  Estimated delivery: 24 hours in Karachi
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
