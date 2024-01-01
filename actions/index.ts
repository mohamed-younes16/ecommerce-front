"use server";
import qs from "query-string";

const apiLink = process.env.NEXT_PUBLIC_API_URL;
const revalidate = 1;
export const getBillBoards = async () => {
  return await (
    await fetch(`${apiLink}/billboards`, {
      next: { revalidate, tags: ["billboards"] },
    })
  ).json();
};
export const getAllSizes = async () => {
  return await (
    await fetch(`${apiLink}/sizes`, {
      next: { revalidate, tags: ["sizes"] },
    })
  ).json();
};
export const getAllColors = async () => {
  return await (
    await fetch(`${apiLink}/colors`, {
      next: { revalidate, tags: ["colors"] },
    })
  ).json();
};
export const getAllcategories = async () => {
  return await (
    await fetch(`${apiLink}/categories`, {
      next: { revalidate, tags: ["categories"] },
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
  console.log(url);
  return await (
    await fetch(url, {
      next: { revalidate, tags: ["products"] },
    })
  ).json();
};

export const getProduct = async (id: string) => {

  return await (
    await fetch(`${apiLink}/products/${id}`, {
      next: { revalidate, tags: ["billboards"] },
    })
  ).json()
 
};

export const getCategory = async (query: Query) => {
  const url = qs.stringifyUrl({
    url: `${apiLink}/categories/${query.categoryId}`,
    query: { ...query },
  },{skipNull:true});
  console.log(url)
  return await (
    await fetch(url, {
      next: { revalidate, tags: ["billboards"] },
    })
  ).json();
};
