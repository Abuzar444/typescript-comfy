import { SelectProductAmount, SelectProductColor } from "@/components";
import { Mode } from "@/components/SelectProductAmount";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { addItem } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/hooks";
import {
  type SingleProductResponse,
  customFetch,
  formatAsDollars,
  CartItem,
} from "@/utils";
import { useState } from "react";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

const url = "/products";

export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  const response = await customFetch<SingleProductResponse>(
    `${url}/${params.id}`
  );
  return { ...response.data };
};

function SingleProduct() {
  const { data: product } = useLoaderData() as SingleProductResponse;
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatAsDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();

  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem(cartProduct));
  };

  return (
    <section>
      <div className='flex gap-x-2 h-6 items-center'>
        <Button asChild variant='link' size='sm'>
          <Link to='/'>Home</Link>
        </Button>
        <Separator orientation='vertical' />
        <Button asChild variant='link' size='sm'>
          <Link to='/products'>Products</Link>
        </Button>
      </div>
      <div className='grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        <img
          src={image}
          alt={title}
          className='h-96 w-96 object-cover rounded-lg lg:w-full'
        />
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {dollarsAmount}
          </p>
          <p className='mt-6 leading-8'>{description}</p>
          <Button size='lg' className='mt-10 capitalize' onClick={addToCart}>
            add to cart
          </Button>
        </div>
        <SelectProductColor
          productColor={productColor}
          setProductColor={setProductColor}
          colors={colors}
        />
        <SelectProductAmount
          mode={Mode.SigleProduct}
          amount={amount}
          setAmount={setAmount}
        />
      </div>
    </section>
  );
}
export default SingleProduct;
