import getCurrentUser from "@/actions/getCurrentUser";
import { ReactNode } from "react";

import UserLoginAlert from "@/components/UserLoginAlert";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div className=" max-md:pb-16">
      {user?.id ? children : <UserLoginAlert />}
    </div>
  );
}
