
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic White Formal",
      type: "Ready-to-buy",
      price: 4500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      size: "L",
      color: "White",
    },
    {
      id: 2,
      name: "Custom Egyptian Cotton",
      type: "Custom",
      price: 6800,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      fabric: "Egyptian Cotton",
      color: "Sky Blue",
      cuff: "French Cuff",
      pocket: "Single Pocket",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "FITFORM10") {
      setDiscount(0.1);
      toast({
        title: "Promo Code Applied",
        description: "You received 10% discount!",
      });
    } else if (promoCode.toUpperCase() === "WELCOME20") {
      setDiscount(0.2);
      toast({
        title: "Promo Code Applied",
        description: "You received 20% discount!",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const deliveryFee = 500; // PKR 500 delivery fee
  const total = subtotal - discountAmount + deliveryFee;

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Proceeding to Checkout",
      description: "You will be redirected to the payment page",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl opacity-90">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild>
                <a href="/ready-to-buy">Continue Shopping</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold mb-6">Cart Items ({cartItems.length})</h2>
              
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.type}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm">
                          {item.type === "Ready-to-buy" ? (
                            <>
                              <p><span className="font-medium">Size:</span> {item.size}</p>
                              <p><span className="font-medium">Color:</span> {item.color}</p>
                            </>
                          ) : (
                            <>
                              <p><span className="font-medium">Fabric:</span> {item.fabric}</p>
                              <p><span className="font-medium">Color:</span> {item.color}</p>
                              <p><span className="font-medium">Cuff:</span> {item.cuff}</p>
                              <p><span className="font-medium">Pocket:</span> {item.pocket}</p>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              PKR {item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Try: FITFORM10 or WELCOME20
                    </p>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>PKR {subtotal.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({Math.round(discount * 100)}%):</span>
                        <span>-PKR {discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>PKR {deliveryFee.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">PKR {total.toLocaleString()}</span>
                  </div>

                  <Button className="w-full" onClick={proceedToCheckout}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Free delivery on orders above PKR 10,000</p>
                    <p>• 30-day return policy</p>
                    <p>• Secure payment processing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
