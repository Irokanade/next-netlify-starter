export default function CategoryChip({ category, className = '' }) {
  return (
    <span
      className={`chip ${className}`}
      style={{ background: category.color }}
    >
      {category.label}
    </span>
  )
}
