import React from 'react';
import PropTypes from 'prop-types';

import styles from './iconButton.module.scss';


const IconButton = ({ iconComponent }) => (
  <button type="button" className={styles.button}>
    {iconComponent}
  </button>
);

IconButton.propTypes = {
  iconComponent: PropTypes.node.isRequired,
};

export default IconButton;
