import path from "path";
import fs from "fs/promises";

interface UploadingParams {
  images: Buffer[];
}

const uploading = async ({ images }: UploadingParams) => {
  // Save images to public/ourProjects
  const uploadDir = path.join(process.cwd(), "public", "ourProjects");
  await fs.mkdir(uploadDir, { recursive: true });

  const urls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const filename = `image_${Date.now()}_${i + 1}.jpg`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, images[i]);
    urls.push(`/ourProjects/${filename}`);
  }
  return urls;
};

export default uploading;
