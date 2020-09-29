import axios from 'axios';

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"

export const getAllEvents = () => {
    return axios.get(baseURL + "users/me/calendar/events/");
}

export const updateEvent = (event) => {
    return axios.put(baseURL + `calendar/events/${event.id}`, event);
}

export const deleteEvent = (event) => {
    return axios.delete(baseURL + `calendar/events/${event}`);
}

export const exportAllEvents = () => {
    return axios.get(baseURL + "users/me/calendar/", { params: { unconcluded_only: false }, responseType: 'blob'})
}

export const exportFutureEvents = () => {
    return axios.get(baseURL + "users/me/calendar/", { params: { unconcluded_only: true }, responseType: 'blob'})
}

export const newEvent = (event) => {
    return axios.post(baseURL + "calendar/events/", event)
}