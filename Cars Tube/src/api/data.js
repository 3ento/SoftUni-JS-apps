import * as api from './api.js'

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllCars() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function createCarListing(body) {
    return api.post('/data/cars', body)
}

export async function getCarDetails(id) {
    return api.get(`/data/cars/${id}`)
}

export async function editListing(id, body) {
    return api.put(`/data/cars/${id}`, body)
}

export async function deleteCar(id) {
    return api.del(`/data/cars/${id}`)
}

export async function getMyListing(userId) {
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function search(query) {
    return api.get(`/data/cars?where=year%3D${query}`)
}