import axios from './axios';

export default {

    async fetchAll() {
        return (await axios.get(
            '/tickets'
        )).data
    },

    async create(data) {
        return (await axios.post(
            '/tickets',
            data
        )).data
    },

}
