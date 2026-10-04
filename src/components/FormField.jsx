import Icon from './Icon.jsx'

/**
 * Campo con label persistente y mensaje de error enlazado por aria-describedby.
 * `as` puede ser 'input' (por defecto), 'textarea' o 'select'.
 */
export default function FormField({ id, label, optional, error, as: Tag = 'input', span2, children, ...rest }) {
  const errId = `${id}-err`
  return (
    <div className={`field${span2 ? ' span-2' : ''}`}>
      <label htmlFor={id}>{label}{optional && <> <span className="opt">(opcional)</span></>}</label>
      <Tag id={id} name={id} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? errId : undefined} {...rest}>
        {children}
      </Tag>
      {error && (
        <p className="err" id={errId}>
          <Icon name="i-alert" /><span>{error}</span>
        </p>
      )}
    </div>
  )
}
