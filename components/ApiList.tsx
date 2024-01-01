"use client";
import React from "react";

import { Separator } from "./ui/separator";
import { useOrigin } from "@/hooks/store";
import { useParams } from "next/navigation";
import ApiAlert from "./ApiAlert";

const ApiList = ({
  entityName,
  entitiIdName,
}: {
  entityName: string;
  entitiIdName: string;
}) => {
  const origin = useOrigin();
  const { storeId } = useParams();
  return (
    <>
      <ApiAlert
        badge="public"
        description={`${origin}/api/stores/${storeId}/${entityName}`}
        title="GET"
      />
      <Separator className="my-6" />
      <ApiAlert
        badge="public"
        description={`${origin}/api/stores/${storeId}/${entityName}/{${entitiIdName}}`}
        title="GET"
      />
      <Separator className="my-6" />
      <ApiAlert
        badge="admin"
        description={`${origin}/api/stores/${storeId}/${entityName}`}
        title="POST"
      />
      <Separator className="my-6" />
      <ApiAlert
        badge="admin"
        description={`${origin}/api/stores/${storeId}/${entityName}/{${entitiIdName}}`}
        title="PATCH"
      />
      <Separator className="my-6" />
      <ApiAlert
        badge="admin"
        description={`${origin}/api/stores/${storeId}/${entityName}/{${entitiIdName}}`}
        title="DELETE"
      />
    </>
  );
};

export default ApiList;
