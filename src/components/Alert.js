function Alert({alert}) {
  const alertType = alert?.typ === 'Danger' ? 'Error' : alert?.typ;
  return (
    <div style={{height: '50px'}}>
    {alert && <div>
        <div className={`alert alert-${alert.typ.toLowerCase()}`} role="alert">
            <strong>{alertType}</strong> {alert.msg}
        </div>
      </div>}
    </div>
  )
}

export default Alert