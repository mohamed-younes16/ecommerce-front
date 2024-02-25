

import * as z from "zod";


export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "must be at least 4 characters long" })
      .max(16),
    email: z.string().min(4).email(),
    password: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
    confirm: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export const Loginschema = z.object({
  email: z.string().min(4).email(),
  password: z
    .string()
    .min(4, { message: "must be at least 8 characters long" })
    .max(14),
});


export const reviewSchema = z.object({
  message: z
    .string()
    .min(4, { message: "message must at least be 5 letters long" }),
  stars: z.number().min(1),
});

export const SetupSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(4),
  bio: z.string(),
  imageUrl: z.string().min(1),
});
export const countrySelectValue = z.object({
  flag: z.string().min(1),
  value: z.string().min(1),
  latlang: z.array(z.number()).min(2),
  region: z.string(),
  label: z.string(),
});
export const RentSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(4),
  images: z
    .array(z.string())
    .refine((arr) => arr.length > 0, { message: "Images cannot be empty" }),
  description: z.string().min(5),
  roomCount: z.number().min(1),
  guestCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  price: z.number().min(50),
  locationValue: countrySelectValue,
});
