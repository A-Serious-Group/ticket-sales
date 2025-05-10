import axios from './axios';

export default {

    async fetchAll() {
        return (await axios.get(
            '/events'
        )).data
    },

    async getByName(name) {
        return (await axios.get(
            `/events/search/${name}`
        )).data
    },

    async create(data) {
        return (await axios.post(
            '/events',
            data
        )).data
    },

}
