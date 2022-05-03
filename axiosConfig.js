import axios from "axios";

export const expressService = axios.create({baseURL: "http://localhost:3001",});

  