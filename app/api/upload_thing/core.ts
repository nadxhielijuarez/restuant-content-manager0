import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { requireAdminUser } from "../../lib/auth/requireAdmin";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await requireAdminUser();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      try {
        return { uploadedBy: metadata?.userId ?? "unknown" };
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new UploadThingError("Error uploading file");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
