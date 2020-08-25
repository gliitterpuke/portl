import axios from "axios";
import localStorageService from "../../../services/localStorageService"
const auth = {
  headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
}
const tester = localStorageService.getItem("auth_user")
const application_id = tester.applications_as_client[0]

export const getAllApps = () => {
    return axios.get("https://portl-dev.herokuapp.com/api/v1/applications/", auth)
}
export const getApplicationById = (id) => {
    return axios.get("https://portl-dev.herokuapp.com/api/v1/applications/" + id, auth)
}
export const deleteFile = (invoice) => {
    return axios.post("/api/invoices/delete", invoice)
}
export const updateInvoice = (invoice) => {
    return axios.post("/api/invoices/update", invoice)
}
export const addInvoice = (invoice) => {
    return axios.post("/api/invoices/add", invoice)
}