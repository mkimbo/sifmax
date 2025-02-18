"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { cart, toggleCart } = useCart();

  return (
    <Button variant="ghost" className="relative ml-3" onClick={toggleCart}>
      <ShoppingCart className="w-6 h-6 text-primary font-bold" />
      {cart.length > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2">
          {cart.length}
        </Badge>
      )}
    </Button>
  );
}
