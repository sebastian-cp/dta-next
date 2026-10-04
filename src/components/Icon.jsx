export default function Icon({ name, size, className = '' }) {
  const cls = ['icon', size && `icon--${size}`, className].filter(Boolean).join(' ')
  return (
    <svg className={cls} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  )
}
