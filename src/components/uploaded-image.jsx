const handleFileChange = (event, selectedImage, setSelectedImage) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);

      };
      reader.readAsDataURL(file);
    }
  };

  export const ClearImage = (setSelectedImage, fileInputRef) => {
    setSelectedImage(null)
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the value of the file input
      }
  }



  export default handleFileChange


