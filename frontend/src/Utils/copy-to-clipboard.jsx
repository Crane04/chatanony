const CopyToClipBoard = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            alert("Copied!")
          })
          .catch((error) => {
            console.error('Unable to copy to clipboard:', error);
            // Handle error cases, such as browser compatibility or permissions
          });
}
export default CopyToClipBoard