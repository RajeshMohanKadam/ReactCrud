import { useState, useEffect } from 'react'
import { getEmployees } from '../services/employeeService'
import Table from '../components/common/Table'

const employeeColumns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
    render: (value, obj) => (
      <span className="font-medium text-gray-800">{value}</span>
    ),
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, obj) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Active'
            ? 'bg-green-100 text-green-700'
            : value === 'Inactive'
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, employee) => (
      <div className="flex gap-3">
        <button
          onClick={() => handleEdit(employee)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(employee.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    ),
  },
]

function EmployeeList() {
  // Store employee records
  const [employees, setEmployees] = useState([])
  // Track API loading state
  const [loading, setLoading] = useState(true)
  // Store API error
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      setLoading(true)
      setError('')
      const data = await getEmployees()
      // console.log(data)
      setEmployees(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Users List</h1>
        <Table
          data={employees}
          columns={employeeColumns}
          keyField="id"
          emptyMessage="No employees available."
        />
      </div>
    </div>
  )
}

export default EmployeeList
