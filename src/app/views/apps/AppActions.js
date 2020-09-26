import axios from "axios";
import localStorageService from "../../services/localStorageService"
const auth = {
  headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
}
const tester = localStorageService.getItem("auth_user")

export const getAllFiles = () => {
    return axios.get(`https://portl-dev.herokuapp.com/api/v1/blobs/`, auth)
}
export const getFileById = (id) => {
    return axios.get("https://portl-dev.herokuapp.com/api/v1/blobs/" + id, auth)
}
export const deleteFile = (invoice) => {
    return axios.post("/api/invoices/delete", invoice)
}
export const addApplication = (invoice) => {
    return axios.post("/api/invoices/add", invoice)
}
export const updateApplication = (invoice) => {
    return axios.post("/api/invoices/update", invoice)
}