import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export interface productType {
  product: product;
  quantity: number;
}
type Store = {
  products: productType[] | [];
  addProducts: (v: product) => void;
  deleteProduct: (v: product) => void;
  delteAllProducts: () => void;
  SideBarOpen: boolean;
  setSideBarOpen: (v: boolean) => void;
  setquantity: (productId: string, v: 1 | -1) => void;
  isLoginModalOpen: boolean;
  setisLoginModalOpen: (v: boolean) => void;
};

export const useCart = create<Store>()(
  persist(
    (set) => ({
      isLoginModalOpen: false,
      setisLoginModalOpen: (v: boolean) => set(() => ({ isLoginModalOpen: v })),
      SideBarOpen: false,
      setSideBarOpen: (v: boolean) => set(() => ({ SideBarOpen: v })),
      products: [],
      addProducts: (v: product) =>
        set((s) => {
          if (
            [...s.products.filter((el: productType) => el.product.id === v.id)]
              .length === 0
          ) {
            toast.success("added product successfully ", { dismissible: true });
            return { products: [...s.products, { product: v, quantity: 1 }] };
          } else {
            toast.error("Product already added manage quantity in cart", {
              dismissible: true,
            });
            return s;
          }
        }),

      deleteProduct: (v: product) => {
        toast.success("removed product successfully ", { dismissible: true });
        return set((s) => ({
          products: [
            ...s.products.filter(
              (el: { product: product; quantity: number }) =>
                el.product.id !== v.id
            ),
          ],
        }));
      },
      delteAllProducts: () => set(() => ({ products: [] })),
      setquantity: (productId, v) =>
        set((s) => ({
          
          products: s.products.map((e: productType) => ({
            product: e.product,
            quantity:
              e.product.id == productId
                ? v === 1
                  ? e.quantity + v
                  : Math.max(e.quantity - 1, 1)
                : e.quantity,
          })),
        })),
    }),

    { name: "data", storage: createJSONStorage(() => sessionStorage) }
  )
);
