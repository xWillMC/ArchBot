import axios from "axios";

export const archmc = axios.create({
  baseURL: process.env.ARCHMC_API_BASE,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.ARCHMC_API_KEY}`
  }
});
