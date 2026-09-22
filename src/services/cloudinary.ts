const CLOUD_NAME = 'shaphan';
const UPLOAD_PRESET = 'SHAPHAN';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('api_key', '484834839993712');

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = await response.json();
  return data.secure_url as string;
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file)));
}
