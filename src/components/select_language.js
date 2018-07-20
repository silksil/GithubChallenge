import React from 'react';

export default function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            key={lang}
            style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.updateLanguage.bind(null, lang)}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
}
