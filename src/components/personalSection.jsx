import styles from '../styles/personalSection.module.css'
import { useState } from "react"
import FormInput from './formInput'

export default function PersonalSection({personalData, handleOnChange}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  return (
    <section className={styles.mainContainer}>
      {editable ? 
        <form className={styles.formContainer}>
            <FormInput
              style={styles.formInput}
              label='First Name'
              type='text'
              nameID='firstName'
              value={personalData.firstName}
              onChange={handleOnChange}
            ></FormInput>
            <FormInput
              style={styles.formInput}
              label='Last Name'
              type='text'
              nameID='lastName'
              value={personalData.lastName}
              onChange={handleOnChange}
            ></FormInput>
            <FormInput
              style={styles.formInput}
              label='Profession'
              type='text'
              nameID='profession'
              value={personalData.profession}
              onChange={handleOnChange}
            ></FormInput>
            <FormInput
              style={styles.formInput}
              label='Phone Number'
              type='tel'
              nameID='phoneNumber'
              value={personalData.phoneNumber}
              onChange={handleOnChange}
            ></FormInput>
            <FormInput
              style={styles.formInput}
              label='Email'
              type='email'
              nameID='email'
              value={personalData.email}
              onChange={handleOnChange}
            ></FormInput>
            <FormInput
              style={styles.formInput}
              label='About Me'
              type='textarea'
              nameID='aboutMe'
              value={personalData.aboutMe}
              onChange={handleOnChange}
            ></FormInput>
            <button onClick={() => {
              setEditable(false)
              setHover(false)
              }} type='button'>Complete</button>
        </form> :
        <div onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={styles.personalSection}>
        <div className={styles.personalSectionContainer}
        onTouchStart={() => hover ? setHover(false) : setHover(true)}>
          <h2>{personalData.firstName + ' ' + personalData.lastName}</h2>
          <h2>{personalData.profession}</h2>
          <p>{personalData.phoneNumber}</p>
          <p>{personalData.email}</p>
          <p>{personalData.aboutMe}</p>
        </div>
        {hover && <button type='button' onClick={() => setEditable(true)}>Edit</button>}
      </div>
      }
    </section>
  )
}