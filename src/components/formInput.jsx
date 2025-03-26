export default function FormInput({label, type = 'text', nameID, value, require = false, onChange, style}) {
    return (
      type == 'textarea' ? (
        <div className={style}>
          <label htmlFor={nameID}>{label}</label>
          <textarea required={require} name={nameID} id={nameID} value={value} onChange={onChange}></textarea>
        </div>
      ) : (
        <div className={style}>
          <label htmlFor={nameID}>{label}</label>
          <input required={require} type={type} name={nameID} id={nameID} value={value} onChange={onChange}/>
        </div>
      )
    )
  }