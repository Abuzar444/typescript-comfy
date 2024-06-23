import { ReduxStore } from "@/store";
import { CartItem, customFetch, formatAsDollars } from "@/utils";
import { ActionFunction, Form, redirect } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { clearCart } from "@/features/cart/cartSlice";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

type Checkout = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
};

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    if (!name || !address) {
      toast({ description: "please fill out all fields" });
      return null;
    }
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: "please login to place an order" });
      return redirect("/login");
    }
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      await customFetch.post(
        "/orders",
        {
          data: info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast({ description: "order placed!" });
      return redirect("/orders");
    } catch (error) {
      toast({ description: "order failed" });
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl mb-4'>Shipping information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='place your order' className='mt-4' />
      </div>
    </Form>
  );
};
export default CheckoutForm;
