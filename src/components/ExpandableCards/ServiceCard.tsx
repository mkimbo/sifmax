import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";

type ServiceItemProps = {
  id: string;
  title: string;
  price: string;
};
export const ServiceCard = (service: ServiceItemProps) => {
  const { title, price, id } = service;
  const { addToCart, removeFromCart, isInCart } = useCart();

  const inCart = isInCart(id);

  const handleCartAction = () => {
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, title, price });
    }
  };

  return (
    <div className="flex flex-row justify-between w-full p-2 bg-[#f0efed] border-b border-gray-300">
      <div className="flex flex-col gap-y-1">
        <h5 className="font-bold">{title}</h5>
        <h6 className="font-medium">{`Tsh. ${price}`}</h6>
      </div>
      <div>
        <Button
          size="sm"
          onClick={handleCartAction}
          variant={inCart ? "destructive" : "default"}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};
