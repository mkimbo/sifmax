"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { ServiceCard } from "../ExpandableCards/ServiceCard";
import { getUrlWhatsappMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, removeFromCart, isCartOpen, toggleCart } = useCart();
  const router = useRouter();
  const cartContent = (
    <>
      <ScrollArea className="flex-grow mb-4 bg-white">
        {cart.map((item) => (
          <ServiceCard
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            price={item.price}
          />
        ))}
      </ScrollArea>
      <div className="mt-auto text-white">
        {/* <p className="font-semibold">Total: Tsh. {totalPrice.toFixed(2)}</p> */}
        <Button
          onClick={() => {
            const msg = getUrlWhatsappMessage(
              cart.map((i) => ({ name: i.title }))
            );
            const url = "https://wa.me/254713786782?text=" + msg;
            // console.log(msg, "url", url);

            router.push(url);
          }}
          disabled={cart.length === 0}
          className="w-full mt-2"
        >
          Book Services
        </Button>
      </div>
    </>
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent side="top" className="minus-header" hideClose={true}>
        <SheetHeader>
          <SheetTitle className="text-white mb-4 flex flex-row justify-between items-center align-middle">
            <span className="text-base">
              {cart.length === 0 ? "Cart is empty" : "Cart"}
            </span>
            <X className={`text-primary`} onClick={toggleCart} />
          </SheetTitle>
        </SheetHeader>
        {cartContent}
      </SheetContent>
    </Sheet>
  );
}
