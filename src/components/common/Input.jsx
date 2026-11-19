function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${className}`}
      />
    </div>
  )
}

export default Input
