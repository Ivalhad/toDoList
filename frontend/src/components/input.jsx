const Input = ({ type = 'text', placeholder, value, onChange, required = false, className = '' }) => {
  // Gabungkan class default dengan class tambahan dari props
  const combinedClasses = `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={combinedClasses}
    />
  );
};

export default Input;