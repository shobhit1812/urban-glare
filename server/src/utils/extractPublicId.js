export const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileNameWithExtension = parts[parts.length - 1]; // e.g., "sample.jpg"
  const [publicId] = fileNameWithExtension.split("."); // Split by "." to remove file extension
  return publicId;
};
