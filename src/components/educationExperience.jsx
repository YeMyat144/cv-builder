import EducationBlock from "./educationBlock"
import styles from '../styles/education.module.css'
import { useState } from "react"
import FormInput from "./formInput"

export default function EducationExperience({experience, handleOnChange, handleOnClick, handleDelete}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  function toggleEditable() {
    editable ? setEditable(false) : setEditable(true)
  }

  return (
    <section 
    className={styles.educationSection}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      <div onTouchStart={() => hover ? setHover(false) : setHover(true)}>
        <h2 className={styles.educationTitle}>Education</h2>
        { editable ? (
          <form className={styles.educationForm}
          onSubmit={(e) => {
            const form = e.target
            const formData = Object.fromEntries(new FormData(form))
            formData.endDate = formData.endDate ? formData.endDate : 'present'
            handleOnClick(formData)
            toggleEditable()
            }}>
            <FormInput
              label='Degree'
              nameID='degree'
              require={true}
              style={styles.formInput}
            ></FormInput>
            <FormInput
              label='University'
              nameID='university'
              require={true}
              style={styles.formInput}
            ></FormInput>
            <FormInput
              label='Start Date'
              nameID='startDate'
              require={true}
              type="date"
              style={styles.formInput}
            ></FormInput>
            <FormInput
              label='End Date (No date if currenlty active)'
              nameID='endDate'
              type="date"
              style={styles.formInput}
            ></FormInput>
            <div className={styles.formButtons}>
              <button
              type="submit"
              >
                Add
              </button>
              <button
              type="button"
              onClick={toggleEditable}
              >
                Discard
              </button>
            </div>
          </form>
        ) :
        experience.map((education, index) => {
          return (
            <EducationBlock
              key={index}
              index={index}
              data={education}
              handleOnChange={handleOnChange}
              handleDelete={handleDelete}
            />
          )
        })}
      </div>
    {hover && !editable && <button onClick={toggleEditable}>Add</button>}
    </section>
  )
}