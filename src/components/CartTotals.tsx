import { useAppSelector } from "@/hooks";
import { Card, CardTitle } from "./ui/card";
import { formatAsDollars } from "./ProductsGrid";
import { Separator } from "./ui/separator";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );
  return (
    <Card className='p-8 bg-muted'>
      <CartTotalRow label='Subtotal' amount={cartTotal} />
      <CartTotalRow label='shipping' amount={shipping} />
      <CartTotalRow label='tax' amount={tax} />
      <CardTitle className='mt-8'>
        <CartTotalRow label='order total' amount={orderTotal} />
      </CardTitle>
    </Card>
  );
};

const CartTotalRow = ({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) => {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{formatAsDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className='my-2' />}
    </>
  );
};
export default CartTotals;
