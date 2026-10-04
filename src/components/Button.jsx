const VARIANTS = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  'secondary-dark': 'button--secondary-dark',
}

/** Renders <a> when `href` is provided, otherwise <button>. */
export default function Button({ variant = 'primary', block, className = '', href, children, ...rest }) {
  const cls = ['button', VARIANTS[variant], block && 'button--block', className].filter(Boolean).join(' ')
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
