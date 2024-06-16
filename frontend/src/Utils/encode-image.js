
const EncodeImage = (image_file) => {
    return new Promise((resolve, reject) => {
        if (!image_file) {
            reject('No image file provided');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            // Resolve the promise with the data URL string
            resolve(reader.result);
        };

        reader.onerror = () => {
            // Reject the promise in case of an error
            reject('Error reading file');
        };

        reader.readAsDataURL(image_file);
    });
};

export default EncodeImage;


// export default EncodeImage