import getCurrentUser from "@/actions/getCurrentUser";
import { ReactNode } from "react";

import UserLoginAlert from "@/components/UserLoginAlert";
export const metadata = {
  title: "airbnb-clone",
  description: "airbnb-clone by younes",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div>
      {user?.id ? (
        children
      ) : (
        <UserLoginAlert/>
      )}
    </div>
  );
}
