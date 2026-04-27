export default function Card({ children, className = '', hover = false }) {
  const baseStyles = 'bg-white rounded-lg shadow-md border border-gray-100';
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 border-t border-gray-100 ${className}`}>{children}</div>;
}
