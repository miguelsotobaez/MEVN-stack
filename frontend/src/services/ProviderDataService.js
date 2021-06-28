import http from "../http-common";

class ProviderDataService {
  getAllProviders() {
    return http.get("/providers");
  }

  getProvider(id) {
    return http.get(`/provider/${id}`);
  }

  createProvider(data) {
    return http.post("/provider", data);
  }

  updateProvider(data) {
    return http.put(`/provider`, data);
  }

  deleteProvider(id) {
    return http.delete(`/provider/${id}`);
  }

}

export default new ProviderDataService();