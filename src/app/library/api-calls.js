import { axiosInstance } from "./helper";

const getCategories = async (page= null,limit= null) => {
  const searchQuery = new URLSearchParams();
  if(page){
    searchQuery.append("page",page)
  }
  if(limit){
    searchQuery.append("limit",limit)
  }
  try {
    const response = await axiosInstance.get(`/category?${searchQuery.toString()}`);
    return response.data; // Return categories from the response
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return []; //
  }
};
const getAccessory = async () => {
  try {
    const response = await axiosInstance.get("/accessory");
    return response.data.accessories;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
const getTrashAccessory = async () => {
  try {
    const response = await axiosInstance.get("/accessory/get-trash");
    return response.data.accessories;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
const getProducts = async (
  category_slug = null,
  range = null,
  color = null,
  sortByName = null,
  page = null,
  limit = null,
  search = null
) => {
  const searchQuery = new URLSearchParams();
  if (range != null) {
    if (range.min < range.max) {
      searchQuery.append("min", range.min);
      searchQuery.append("max", range.max);
    }
  }
  // searchQuery.append("color", null);
  if (color != null) {
    searchQuery.append("color", color);
  }
  if (category_slug != null) {
    searchQuery.append("category_slug", category_slug);
  }
  if (sortByName != null) {
    searchQuery.append("sortByName", sortByName);
  }
  if (page != null) {
    searchQuery.append("page", page);
  }
  if (limit != null) {
    searchQuery.append("limit", limit);
  }
  if(search != null){
    searchQuery.append("search",search)
  }
  try {
    // if (range.min != null && range.max != null) {
    const response = await axiosInstance.get(
      `/product?${searchQuery.toString()}`
    );
    return response.data;

    // }
    // const response = await axiosInstance.get("/product");
    // return response.data.products; // Return categories from the response
  } catch (error) {
    console.error("Error fetching Products:", error.message);
    return []; //
  }
};

const getProductById = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/product/${product_id}`);
    return response.data.product;
  } catch (error) {
    console.log("Error in fetching product!", error.message);
    return [];
  }
};

const getTrashCategories = async () => {
  try {
    const response = await axiosInstance.get("category/get-trash");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};
const getTrashProducts = async () => {
  try {
    const response = await axiosInstance.get("product/get-trash");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

const getColors = async () => {
  try {
    const response = await axiosInstance.get("/color");
    return response.data.colors; // Return categories from the response
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    return []; //
  }
};

const getColorTrash = async () => {
  try {
    const response = await axiosInstance.get("/color/trash-colors");
    return response.data.colors; // Return categories from the response
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    return []; //
  }
};

const getAdminList = async () => {
  try {
    const response = await axiosInstance.get("/admin");
    return response.data.admins;
  } catch (error) {
    console.log("Error fetching colors:", error.message);
    return [];
  }
};

const getAllUsers = async () =>{
  try {
    const response = await axiosInstance.get('/user')
    return response.data.users
  } catch (error) {
    return []
  }
}

const getTransaction =async ()=>{
  try {
    const response = await axiosInstance.get('/transaction')
    return response.data.transactions
  } catch (error) {
    return []
  }
}

const getOrders = async (page= null, limit = null)=>{
  const searchQuery = new URLSearchParams();

  if(page){
    searchQuery.append("page",page)
  }
  if(limit){
    searchQuery.append("limit",limit)
  }
  try {
    const response = await axiosInstance.get(`/order?${searchQuery.toString()}`)
    return response.data
  } catch (error) {
    return [];
  }
}

const getTrashAdmins = async()=>{
  try {
    const response = await axiosInstance.get('/admin/get-trash')
    return response.data.admins
  } catch (error) {
    return [];
  }
}


export {
  getCategories,
  getTrashCategories,
  getColors,
  getColorTrash,
  getProducts,
  getTrashProducts,
  getAccessory,
  getTrashAccessory,
  getAdminList,
  getProductById,
  getAllUsers,
  getTransaction,
  getOrders,
  getTrashAdmins,
};
