import * as axios from 'axios'

export const usersAPI = {
    getUsers(page, pageSize) {
        return axios.get(`/users?page=${page}&count=${pageSize}`).then(res => { return res.data })
    },
    followUser(id) { return axios.post(`/follow?id=${id}`).then(res => { return res.data }) }
}
export const authAPI = {
  
    login(data) {  return axios.post(`/auth`,{data}).then(res => { return res.data }) },
    logout() {  return axios.delete(`/auth`).then(res => { return res.data })},
    checkAuth() { return axios.get(`/auth/me`).then(res => { return res.data }) }
  
}
export const profileAPI = {
    setProfile(url) {
        return axios.get(`/profile${url}`).then(res => {
            return res.data;
        })
    },
    getStatus(url) {
        return axios.get(`/profile/status${url}`).then(res => {
            return res.data;
        })
    },
    setStatus(url, status) {
        return axios.put(`/profile/status${url}`,{status:status}).then(res => {
            return res.data;
        })
    }
}