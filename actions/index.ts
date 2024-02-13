"use server";
import qs from "query-string";

const apiLink = process.env.NEXT_PUBLIC_API_URL;

export const getBillBoards = async () => {
  return await (
    await fetch(`${apiLink}/billboards`, {
      cache:"no-cache" 
    })
  ).json();
};
export const getAllSizes = async () => {
  return await (
    await fetch(`${apiLink}/sizes`, {
      cache:"no-cache" 
    })
  ).json();
};
export const getAllColors = async () => {
  return await (
    await fetch(`${apiLink}/colors`, {
      cache:"no-cache" 
    })
  ).json();
};
export const getAllcategories = async () => {
  return await (
    await fetch(`${apiLink}/categories`, {
      cache:"no-cache" 
    })
  ).json();
};
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}
export const getAllProducts = async (query: Query) => {
  const url = qs.stringifyUrl({
    url: `${apiLink}/products`,
    query: { ...query },
  },{skipNull:true});

  return await (
    await fetch(url, {
      
      cache:"no-cache" 
    })
  ).json();
};

export const getProduct = async (id: string) => {

  return await (
    await fetch(`${apiLink}/products/${id}`, {
      cache:"no-cache" 
    })
  ).json()
 
};

export const getCategory = async (query: Query) => {
  const url = qs.stringifyUrl({
    url: `${apiLink}/categories/${query.categoryId}`,
    query: { ...query },
  },{skipNull:true});

  return await (
    await fetch(url, {
      cache:"no-cache" 
    })
  ).json();
};
