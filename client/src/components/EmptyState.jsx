export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}) {
  return (
    <div className="text-center py-12 px-4">
      {icon && (
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action}
    </div>
  );
}
