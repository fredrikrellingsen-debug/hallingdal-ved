export default function Label({ children, light }) {
  return (
    <div className={'label' + (light ? ' label-light' : '')}>
      <span className="label-rule" />
      <span className="mono">{children}</span>
    </div>
  )
}
