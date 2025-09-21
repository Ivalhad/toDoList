const Button = ({ children, onClick, type = 'button', fullWidth = false, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white transition-colors disabled:opacity-50';
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Logika untuk memilih warna berdasarkan variant
  const getColorClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-blue-400 hover:bg-blue-500'; 
      case 'danger':
        return 'bg-red-500 hover:bg-red-600'; 
      case 'primary':
      default:
        return 'bg-blue-500 hover:bg-blue-600'; 
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${widthClass} ${getColorClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;