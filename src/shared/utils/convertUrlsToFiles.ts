export async function convertUrlsToFiles(urls: string[]) {
  return await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split("/").pop() || "default.jpg";
      return new File([blob], fileName, { type: blob.type });
    }),
  );
}
