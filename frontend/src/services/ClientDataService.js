import http from "../http-common";

class ClientDataService {
  getAllClients() {
    return http.get("/clients");
  }

  getClient(id) {
    return http.get(`/client/${id}`);
  }

  createClient(data) {
    return http.post("/client", data);
  }

  updateClient(data) {
    return http.put(`/client`, data);
  }

  deleteClient(id) {
    return http.delete(`/client/${id}`);
  }

}

export default new ClientDataService();