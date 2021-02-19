import axios from "axios";

export default class AnimalService {
    //url = "localhost:8080/api/animals/"
    dev;

    getAll() {
        return axios.get( "animals/all");
    }
    save(animal) {
        return axios.post("animals/insert",animal);
    }
    update(animal) {
        return axios.put("animals/update",animal);
    }
    delete(id) {
        this.dev = axios.delete('animals/delete/' + id);
        return this.dev;
    }
}
