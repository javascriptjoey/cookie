import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Recipe images uploader
  recipeImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Recipe image uploaded by:", metadata.userId);
      console.log("File URL:", file.url);
      return { url: file.url, userId: metadata.userId };
    }),

  // Recipe videos uploader
  recipeVideo: f({ video: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Recipe video uploaded by:", metadata.userId);
      console.log("File URL:", file.url);
      return { url: file.url, userId: metadata.userId };
    }),

  // Feed post media (images and videos)
  feedMedia: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
    video: { maxFileSize: "16MB", maxFileCount: 1 }
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Feed media uploaded by:", metadata.userId);
      console.log("File URL:", file.url);
      return { url: file.url, userId: metadata.userId };
    }),

  // Marketplace item images
  marketplaceImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Marketplace image uploaded by:", metadata.userId);
      console.log("File URL:", file.url);
      return { url: file.url, userId: metadata.userId };
    }),

  // Profile avatar
  profileAvatar: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar uploaded by:", metadata.userId);
      console.log("File URL:", file.url);
      return { url: file.url, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
