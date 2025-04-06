import Axios from "axios";

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: "no-cors"
});

export default api;