import { Filters, ProductsContainer, PaginationContainer } from "@/components";
import {
  type ProductsResponse,
  customFetch,
  type ProductsResponseWithParams,
} from "@/utils";
import { type LoaderFunction } from "react-router-dom";

const url = "/products";

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<ProductsResponse>(url, {
    params,
  });

  return { ...response.data, params };
};

function Products() {
  return (
    <h1 className='text-4xl'>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </h1>
  );
}
export default Products;
