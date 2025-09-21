const Button = ({ children, onClick, type = 'button', fullWidth = false, secondary = false }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white transition-colors disabled:opacity-50';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const colorClass = secondary
    ? 'bg-red-500 hover:bg-red-600' 
    : 'bg-blue-500 hover:bg-blue-600';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${widthClass} ${colorClass}`}
    >
      {children}
    </button>
  );
};

export default Button;