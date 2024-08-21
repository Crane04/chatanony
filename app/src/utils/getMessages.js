import getData from "../api/getData"; // Import the getData function

const getMessages = async (group_name) => {
  const endpoint = `/api/messages/${group_name}`;
  return getData(endpoint);
};

export default getMessages;
