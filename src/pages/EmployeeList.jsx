import { useState, useEffect } from 'react'
import { getEmployees } from '../services/employeeService'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import PageHeader from '../components/common/PageHeader'
import Table from '../components/common/Table'
import StatusBadge from '../components/common/StatusBadge'

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
    render: (value, obj) => <StatusBadge status={value} />,
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

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Pending', label: 'Pending' },
]

function EmployeeList() {
  // Store employee records
  const [employees, setEmployees] = useState([])
  // Track API loading state
  const [loading, setLoading] = useState(true)
  // Store API error
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <PageHeader
          title="Employee Management"
          description="Manage and organize your employees"
        >
          <Button onClick={() => console.log('Add Employee clicked')}>
            + Add Employee
          </Button>
        </PageHeader>

        {/* Search and Filter Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="search"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              name="status"
              placeholder="All Statuses"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={statusOptions}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-blue-600 font-medium">Loading employees...</p>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
        )}

        {/* Employee Table */}
        {!loading && !error && (
          <Table
            columns={employeeColumns}
            data={employees}
            keyField="id"
            emptyMessage="No employees available."
          />
        )}
      </div>
    </div>
  )
}

export default EmployeeList
