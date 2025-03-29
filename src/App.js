import './App.css';
import styles from './styles/CV.module.css';
import React, { useState } from "react";
import PersonalSection from './components/personalSection';
import EducationExperience from './components/educationExperience';
import SkillExperience from './components/skillExperience';
import WorkExperience from './components/workExperience';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle("light", !isDarkMode);
  }

  function downloadResume() {
    const resume = document.getElementById("resume-content"); // Target the resume section
    const isDarkMode = !document.body.classList.contains("light"); // Check theme mode

    // Ask user for filename
    const fileName = prompt("Enter name for the resume:", "cv-craft") || "cv-craft";

    html2canvas(resume, {
      scale: 2,
      useCORS: true,
      backgroundColor: isDarkMode ? "#1c1b1b" : "#ffffff", // Set dark background in dark mode
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    }).catch(error => {
      console.error("Error capturing resume:", error);
    });
}


  const [personalInformation, setPersonalInformation] = useState({
    firstName: 'John',
    lastName: 'Moe',
    profession: 'Software Engineer',
    phoneNumber: '0654208823',
    email: 'johnmoe@gmail.com',
    aboutMe: 'I am a dedicated and detail-oriented software engineer with a strong passion for developing scalable web applications. I enjoy solving complex problems and working collaboratively in a team environment to create impactful solutions.'
  });

  function updatePersonalInformation(e) {
    setPersonalInformation(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [educationExperience, setEducationExperience] = useState([
    {
      degree: 'Bachelor of Computer Science',
      university: 'Assumption University in Thailand',
      startDate: '2022-05-06',
      endDate: '2025-06-22'
    },
  ]);

  function updateEducationExperience(e) {
    const index = e.target.closest('form').dataset.key;
    const { name, value } = e.target;

    setEducationExperience(prev =>
      prev.map((education, edIndex) =>
        edIndex == index ? { ...education, [name]: value } : education
      )
    );
  }

  function addEducationExperience(data) {
    setEducationExperience(prev => [...prev, data]);
  }

  function deleteEducationExperience(e) {
    const index = e.target.closest('button').dataset.key;
    setEducationExperience(prev => prev.filter((_, i) => i != index));
  }

  const [skillExperience, setSkillExperience] = useState([
    { tech: 'JavaScript', soft: 'Problem-solving' }
  ]);

  function updateSkillExperience(e) {
    const index = e.target.closest('form').dataset.key;
    const { name, value } = e.target;

    setSkillExperience(prev =>
      prev.map((skill, sIndex) =>
        sIndex == index ? { ...skill, [name]: value } : skill
      )
    );
  }

  function addSkillExperience(data) {
    setSkillExperience(prev => [...prev, data]);
  }

  function deleteSkillExperience(e) {
    const index = e.target.closest('button').dataset.key;
    setSkillExperience(prev => prev.filter((_, i) => i != index));
  }

  const [workExperience, setWorkExperience] = useState([
    {
      position: 'Software Engineer',
      company: 'Google',
      startDate: '2021-07-01',
      endDate: 'present',
      responsability: 'Develop and optimize backend services to enhance the scalability and performance of cloud-based applications.'
    },
    {
      position: 'Data Engineer',
      company: 'Amazon Web Services (AWS)',
      startDate: '2019-07-01',
      endDate: '2021-06-30',
      responsability: 'Designed and maintained ETL pipelines to process large-scale datasets for analytics and machine learning applications.'
    }
  ]);

  function updateWorkExperience(e) {
    const index = e.target.closest('form').dataset.key;
    const { name, value } = e.target;

    setWorkExperience(prev =>
      prev.map((work, wIndex) =>
        wIndex == index ? { ...work, [name]: value } : work
      )
    );
  }

  function addWorkExperience(data) {
    setWorkExperience(prev => [...prev, data]);
  }

  function deleteWorkExperience(e) {
    const index = e.target.closest('button').dataset.key;
    setWorkExperience(prev => prev.filter((_, i) => i != index));
  }

  return (
    <div className={styles.cv} id="resume-content">
      {/* Dark/Light Mode Button */}
      <button onClick={toggleTheme} className="toggleButton no-print">
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <PersonalSection
        personalData={personalInformation}
        handleOnChange={updatePersonalInformation}
      />
      <EducationExperience
        experience={educationExperience}
        handleOnChange={updateEducationExperience}
        handleOnClick={addEducationExperience}
        handleDelete={deleteEducationExperience}
      />
      <SkillExperience
        experience={skillExperience}
        handleOnChange={updateSkillExperience}
        handleOnClick={addSkillExperience}
        handleDelete={deleteSkillExperience}
      />
      <WorkExperience
        experience={workExperience}
        handleOnChange={updateWorkExperience}
        handleOnClick={addWorkExperience}
        handleDelete={deleteWorkExperience}
      />

      {/* Download Resume Button */}
      <button onClick={downloadResume} className="downloadButton no-print">
        Download
      </button>
    </div>
  );
}

export default App;
