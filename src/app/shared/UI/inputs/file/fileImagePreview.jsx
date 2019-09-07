import React from 'react';
import PropTypes from 'prop-types';
import classes from './fileImagePreview.module.scss';

const FileImagePreview = ({ alt, src }) => (
  <img
    alt={alt}
    className={classes.imgPreview}
    src={src}
  />
);

FileImagePreview.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default FileImagePreview;
