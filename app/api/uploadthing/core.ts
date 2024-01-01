import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const currentUserid = async () => await currentUser();
export const ourFileRouter = {
imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
    const user = await currentUserid();
    if (!user) throw new Error("Unauthorized");
    return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
