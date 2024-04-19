import axios from "axios";
export const fetchAdvertisements = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/getAdds"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error; // Re-throw the error to handle it in the component if needed
  }
};

export const fetchAddById = async (id) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/api/v1/public/add/" + id
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdvertisementsByCat = async (id) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/cat/" + id
    );
    return response;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
  }
};
export const searchAdvertisements = async (name) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/search/" + name
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error; // Re-throw the error to handle it in the component if needed
  }
};
export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/public/getCats"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error; // Re-throw the error to handle it in the component if needed
  }
};
export const findSimilars = async (cat_id, price, id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/v1/public/getSimilars?cat=${cat_id}&price=${price}&id=${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export function simplifyTimestamp(timestamp) {
  const date = new Date(timestamp);
  const simplifiedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  const simplifiedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return `${simplifiedDate} ${simplifiedTime}`;
}
