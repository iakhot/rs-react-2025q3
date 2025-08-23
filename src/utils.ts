export function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => {
            console.log(`Failed to convert image: ${file.name}`);
            reject();
        };
        reader.readAsDataURL(file);
    });
}
