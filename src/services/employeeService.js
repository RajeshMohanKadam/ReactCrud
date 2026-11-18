import api from './api'

// GET: Fetch all employees
export async function getEmployees() {
  const response = await api.get('/employees')
  return response.data
}

// GET: Fetch single employee
export async function getEmployeeById(id) {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

// POST: Create employee
export async function createEmployee(empData) {
  const response = await api.post('/employees', empData)
  return response.data
}

// PUT: Update employee
export async function updateEmployee(id, empData) {
  const response = await api.put(`/employees/${id}`, empData)
  return response.data
}

// DELETE: Delete employee
export async function deleteEmployee(id) {
  const response = await api.delete(`/employee/${id}`)
  return response.data
}
