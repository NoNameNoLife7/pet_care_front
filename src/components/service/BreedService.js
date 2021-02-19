import axios from "axios";

export default class BreedService {
    getAll() {
        return axios.get( "breeds/all");
    }
    findById(id) {
        return axios.get( "breeds/findOne/",id);
    }
    save(breed) {
        return axios.post("breeds/insert",breed);
    }
    update(breed) {
        return axios.put("breeds/update",breed);
    }
    delete(id) {
        return axios.delete("breeds/delete/",id);
    }
}
