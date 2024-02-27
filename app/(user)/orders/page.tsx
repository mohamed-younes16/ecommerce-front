import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismabd";
import { columns, orderColumn } from "./components/columns";
import { format } from "date-fns";
import { Heading } from "../profile/page";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
const page = async () => {
  const user = await getCurrentUser();
  const getOrders = async () => {
    "use server";
    const ordersList = await prismadb.order.findMany({
      where: { orderOwnerId: user?.id },
      include: {
        items: {
          include: {
            product: {
              select: { price: true, images: { take: 1 }, name: true },
            },
          },
        },
      },
    });
    return ordersList;
  };
  const orders = await getOrders();
  const orderPrice = (order) => {
    let tot = 0;
    order.items.forEach((e) => {
      console.log(e.count);
      tot += Number(e.product.price) * e.count;
    });

    return tot;
  };

  const formattedorders: orderColumn[] = orders.map((e) => ({
    products: e.items.map((e) => e.product.name).join(" , "),

    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    phone: e.phoneNumber,
    address: e.address,
    isPaid: e.isPaid,
    totalPrice: +orderPrice(e),
    imageUrl: e.items[0].product.images[0].url,
  }));

  return (
    <div>
      {" "}
      <div id="content" className="p-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`orders (${orders.length})`}
            description="Manage orders For Your Store"
          />{" "}
        </div>{" "}
        <Separator className="my-6" />
        <DataTable searchKey="name" columns={columns} data={formattedorders} />
      </div>
    </div>
  );
};

export default page;
