import { useQuery } from "react-query";
import axios, { Axios, AxiosPromise } from "axios";
import { ProductsFetchResponse } from "../types/products-response";
import { useFilter } from "./useFilter";

import { useDeferredValue } from "react";
import { query } from "@/utils/filters";

console.log(process.env.NEXT_PUBLIC_API_URL as string);

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(process.env.NEXT_PUBLIC_API_URL as string, { query });
};

export function useProducts() {
  const { type, priority, search } = useFilter();
  const searchDeferred = useDeferredValue(search);
  const mountQuery = query(type, priority);
  const { data } = useQuery({
    queryFn: () => fetcher(mountQuery),
    queryKey: ["products", type, priority],
  });

  const products = data?.data?.data?.allProducts;
  const filterProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchDeferred.toLowerCase())
  );

  return {
    data: filterProducts,
  };
}
