

import * as z from "zod";

export const StoreSchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(14),
});

export const BillBoardSchema = z.object({
  label: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(20),
    imageUrl: z
    .string()
    .min(1)

});

export const CategorySchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(20),
    billboardId:z.string().min(1)
   

});
export const sizeSchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(20),
    value:z.enum(["S", "M", "L", "XL", "XXL", "XXXL"]),
   

});
export const colorSchema = z.object({
  name: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(20),
    value:z.string().min(1)
   

});

export const productSchema = z.object({

  name: z.string().min(4),
  sizeId: z.string().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  price: z.number().min(1),
  description: z.string().min(1),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  images: z.string().array().min(1), 

});

