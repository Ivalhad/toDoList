const Button = ({ children, onClick, type = 'button', fullWidth = false, secondary = false }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white transition-colors';
  const widthClass = fullWidth ? 'w-full' : '';
  const colorClass = secondary
    ? 'bg-secondary hover:bg-blue-500'
    : 'bg-primary hover:bg-blue-600';

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