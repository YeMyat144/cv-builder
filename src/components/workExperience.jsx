import WorkBlock from "./workBlock"
import styles from '../styles/work.module.css'
import { useState } from "react"
import FormInput from "./formInput"

export default function WorkExperience({experience, handleOnChange, handleOnClick, handleDelete}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  function toggleEditable() {
    editable ? setEditable(false) : setEditable(true)
  }
  
  return (
    <section className={styles.workSection}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
      <h2 className={styles.workTitle}>Work Experience</h2>
      {editable ? 
              <form className={styles.workForm}
              onSubmit={(e) => {
                const form = e.target
                const formData = Object.fromEntries(new FormData(form))
                formData.endDate = formData.endDate ? formData.endDate : 'present'
                handleOnClick(formData)
                toggleEditable()
                }}>
                <FormInput
                  label='Position'
                  nameID='position'
                  require={true}
                  style={styles.formInput}
                ></FormInput>
                <FormInput
                  label='Company'
                  nameID='company'
                  require={true}
                  style={styles.formInput}
                ></FormInput>
                <FormInput
                  label='Job Description'
                  nameID='responsability'
                  require={true}
                  type="textarea"
                  style={styles.formInputTextArea}
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
      : 
      <div onTouchStart={() => hover ? setHover(false) : setHover(true)}>{      
        experience.map((work, index) => {
        return (
          <WorkBlock
            key={index}
            index={index}
            data={work}
            handleOnChange={handleOnChange}
            handleDelete={handleDelete}
          />
        )
        })}
      </div>
}
          {hover && !editable && <button onClick={toggleEditable}>Add</button>}
    </section>
  )
}