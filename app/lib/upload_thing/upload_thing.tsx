import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers,
  } from "@uploadthing/react";
  import type { OurFileRouter } from "../../api/upload_thing/core";
  
  /** Must match `app/api/upload_thing/route.ts` (default helper URL is `/api/uploadthing`). */
  const uploadThingUrl = "/api/upload_thing";
  
  export const UploadButton = generateUploadButton<OurFileRouter>({
    url: uploadThingUrl,
  });
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: uploadThingUrl,
  });
  
  const { uploadFiles } = generateReactHelpers<OurFileRouter>({
    url: uploadThingUrl,
  });
  
  export { uploadFiles };
    