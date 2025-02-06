
export default async function loadImages(imagesUrlArray) {
    if (!Array.isArray(imagesUrlArray)) {
        throw new Error("Invalid input: 'imagesUrlArray' must be an array of URLs.");
    }

    async function loadSingleImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => resolve({ url: imageUrl, img });
            img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
            
            img.src = imageUrl;
        });
    }

    try {
        return await Promise.all(
            imagesUrlArray.map(imageUrl => loadSingleImage(imageUrl))
        );
    } catch (error) {
        console.error('Error loading images:', error);
        throw error;
    }
}
