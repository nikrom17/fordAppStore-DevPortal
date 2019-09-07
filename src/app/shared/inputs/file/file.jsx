import React, { useState } from 'react';

import { validateValue } from 'utils/utility';
import FileImagePreview from './fileImagePreview';
import styles from './file.module.scss';

const File = ({
  config, inputId, stateValue, validation,
}) => {
  const [value, setValue] = useState(stateValue || '');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [imgURL, setImageURL] = useState('');

  const handleChange = (newValue, url) => {
    setValue(newValue);
    if (isEdited) {
      setIsValid(validateValue(newValue, validation));
      setImageURL(URL.createObjectURL(url));
    }
  };

  const handleOnBlur = () => {
    setIsEdited(true);
    setIsValid(validateValue(value, validation));
  };

  const appliedClasses = isEdited && !isValid
    ? [styles.input, styles.invalid] : [styles.input];
  return (
    <>
      {config.type === 'image' && value ? <FileImagePreview src={imgURL} alt={value} /> : null}
      <input
        className={appliedClasses.join(' ')}
        type="file"
        name={inputId}
        onBlur={handleOnBlur}
        onChange={(event) => handleChange(event.target.value, event.target.files[0])}
        value={value}
      />
    </>
  );
};

export default File;
