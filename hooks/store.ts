import { useEffect, useState } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  products: product[] | [];
  addProducts: (v: product) => void;
  deleteProduct: (v: product) => void;
  delteAllProducts: () => void;
  SideBarOpen: boolean;
  setSideBarOpen: (v: boolean) => void;
};

export const useCart = create<Store>()(
  persist(
    (set) => ({
      SideBarOpen: false,
      setSideBarOpen: (v: boolean) => set(() => ({ SideBarOpen: v })),
      products: [],
      addProducts: (v: product) =>
        set((s) => {
          if (
            [...s.products.filter((el: product) => el.id === v.id)].length === 0
          ) {
            toast.success("added product successfully ");
            return { products: [...s.products, v] };
          } else {
            toast.error("Product already added");
            return s;
          }
        }),

      deleteProduct: (v: product) => {
        toast.success("removed product successfully ");
        return set((s) => ({
          products: [...s.products.filter((el: product) => el.id !== v.id)],
        }));
      },
      delteAllProducts: () => set(() => ({ products: [] })),
    }),
    { name: "data", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin: string =
    typeof window !== "undefined" && window?.location?.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return origin;
};
