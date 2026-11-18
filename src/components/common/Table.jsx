import React from 'react'

export default function Table({
  data,
  columns,
  keyField = 'id',
  emptyMessage,
}) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white border border-gray-200 shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((column) => (
              <th className="px-6 py-4" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                className="hover:bg-gray-50 transition-colors"
                key={item[keyField]}
              >
                {columns.map((column) => (
                  <td className="px-6 py-4" key={item[column.id]}>
                    {column.render
                      ? column.render(item[column.key], item)
                      : (item[column.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
