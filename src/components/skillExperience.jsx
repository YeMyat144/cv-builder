import SkillBlock from "./skillBlock"
import styles from '../styles/skill.module.css'
import { useState } from "react"
import FormInput from "./formInput"

export default function SkillExperience({experience, handleOnChange, handleOnClick, handleDelete}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  function toggleEditable() {
    editable ? setEditable(false) : setEditable(true)
  }

  return (
    <section 
    className={styles.skillSection}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
      <div onTouchStart={() => hover ? setHover(false) : setHover(true)}>
        <h2 className={styles.skillTitle}>Skill</h2>
        { editable ? (
          <form className={styles.skillForm}
          onSubmit={(e) => {
            const form = e.target
            const formData = Object.fromEntries(new FormData(form))
            formData.endDate = formData.endDate ? formData.endDate : 'present'
            handleOnClick(formData)
            toggleEditable()
            }}>
            <FormInput
              label='Tech'
              nameID='tech'
              require={true}
              style={styles.formInput}
            ></FormInput>
            <FormInput
              label='Soft'
              nameID='soft'
              require={true}
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
        experience.map((skill, index) => {
          return (
            <SkillBlock
              key={index}
              index={index}
              data={skill}
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