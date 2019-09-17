import React, { useState } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import firebase from 'firebase/fireClass';
import { validateValue } from 'utils/utility';
import FileImagePreview from './fileImagePreview';
import styles from './file.module.scss';

const File = ({
  config, inputId, stateValue, validation,
}) => {
  console.log(stateValue);
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [filePath, setFilPath] = useState('');
  const [imageFirebase, loading, error] = useDownloadURL(
    firebase.storage.ref(stateValue || '/error'),
  );

  console.log(imageFirebase);
  const handleChange = (newValue, url) => {
    setValue(newValue);
    if (isEdited) {
      setIsValid(validateValue(newValue, validation));
      setFilPath(URL.createObjectURL(url));
    }
  };

  const handleOnBlur = () => {
    setIsEdited(true);
    setIsValid(validateValue(value, validation));
  };

  const uploadedImage = <FileImagePreview src={filePath} alt={value} />;
  const imageFromDb = error ? null : <img src={imageFirebase} alt={inputId} />;
  const displayImage = value ? uploadedImage : imageFromDb;


  const appliedClasses = isEdited && !isValid
    ? [styles.input, styles.invalid] : [styles.input];
  return (
    <>
      {config.type === 'image' ? displayImage : null}
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
