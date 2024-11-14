import { Button } from "@/components/ui/button";

interface QuantityButtonGroupProps {
  productId: string;
  quantity: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

const QuantityButtonGroup: React.FC<QuantityButtonGroupProps> = ({
  productId,
  quantity,
  onIncrease,
  onDecrease,
}) => (
  <div className="flex items-center gap-2">
    <Button onClick={() => onDecrease(productId)}>-</Button>
    <span className="px-3">{quantity}</span>
    <Button onClick={() => onIncrease(productId)}>+</Button>
  </div>
);

export default QuantityButtonGroup;
