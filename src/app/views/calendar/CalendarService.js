import axios from 'axios';

export const getAllEvents = () => {
    return axios.get("users/me/calendar/events/");
}

export const updateEvent = (event) => {
    return axios.put(`events/${event.id}`, event);
}

export const deleteEvent = (event) => {
    return axios.delete(`events/${event}`);
}

export const exportAllEvents = () => {
    return axios.get("users/me/calendar/", { params: { unconcluded_only: false }, responseType: 'blob'})
}

export const exportFutureEvents = () => {
    return axios.get("users/me/calendar/", { params: { unconcluded_only: true }, responseType: 'blob'})
}

export const newEvent = (event) => {
    return axios.post("events/", event)
}

export const eventNotification = (event) => {
    return axios.post("notifications/", event)
}