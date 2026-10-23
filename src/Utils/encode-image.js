const MAX_DIMENSION = 1280;
const MAX_DATA_URL_LENGTH = 700_000; // stays well under the server's 1MB message limit

// Downscales and re-encodes the image as JPEG so it fits in a single chat message
const EncodeImage = (image_file) => {
  return new Promise((resolve, reject) => {
    if (!image_file) {
      reject(new Error("No image file provided"));
      return;
    }

    const url = URL.createObjectURL(image_file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(
        1,
        MAX_DIMENSION / Math.max(img.width, img.height),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

      let quality = 0.8;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);
      while (dataUrl.length > MAX_DATA_URL_LENGTH && quality > 0.3) {
        quality -= 0.15;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }
      if (dataUrl.length > MAX_DATA_URL_LENGTH) {
        reject(new Error("Image is too large to send"));
        return;
      }
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Error reading image"));
    };

    img.src = url;
  });
};

export default EncodeImage;
