import http from "../http-common";

class DataService {
  getExpenses() {
    return http.get("/expenses");
  }

  getExpenseById(id) {
    return http.get(`/expenses/${id}`);
  }

  getExpenseByName(name) {
    return http.get(`/expenses?name=${name}`);
  }

  createExpense(expense) {
    return http.post("/expenses", data);
  }

  updateExpense(id, expense) {
    return http.put(`/expenses/${id}`, data);
  }

  deleteExpense(id) {
    return http.delete(`/expenses/${id}`);
  }
}

export default new DataService();