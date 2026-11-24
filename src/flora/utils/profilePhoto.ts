/** Decode through the browser, then keep only a small, metadata-free avatar. */
export async function prepareProfilePhoto(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Lütfen bir fotoğraf seç.');
  if (file.size > 25 * 1024 * 1024) throw new Error('Fotoğraf çok büyük. 25 MB altında bir fotoğraf seç.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Fotoğraf açılamadı. JPEG veya PNG biçiminde başka bir fotoğraf seç.'));
      image.src = url;
    });
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    if (!side) throw new Error('Fotoğraf okunamadı. Başka bir fotoğraf seç.');
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = Math.min(512, side);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Fotoğraf hazırlanamadı. Tekrar dene.');
    context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8);
  } finally { URL.revokeObjectURL(url); }
}
