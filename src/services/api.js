import axios from 'axios'

const api = axios.create({
    baseURL: 'https://corp-crud-backend.herokuapp.com/'
})

export default api