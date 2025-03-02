// require('dotenv').config();
const axios = require('axios');


function titleToSlug(title) {
  return title
    .trim() //Remove whitespace from both sides of a string
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Replace multiple - with single -
}
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Set the time of both dates to midnight to only consider the date part
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
      return 'Today';
  } else if (diffDays === 1) {
      return 'Yesterday';
  } else {
      return `${diffDays} days ago`;
  }
}
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});


const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();
  
  return `${day}/${month}/${year}`;
}

function capitalizeWords(str) {
  return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

const getKeyByValue = (object, value) => {
  return Object.entries(object).find(([key, val]) => val === value)?.[0];
};

module.exports = { titleToSlug, axiosInstance,timeAgo, dataURLtoFile, formatDate,capitalizeWords,getKeyByValue };
