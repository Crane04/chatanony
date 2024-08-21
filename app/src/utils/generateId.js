const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  export default generateUniqueId