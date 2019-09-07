import React from 'app/shared/IconButton/react';
import PropTypes from 'app/shared/IconButton/prop-types';

import styles from './iconButton.module.scss';


const iconButton = ({ iconComponent }) => (
  <button type="button" className={styles.button}>
    {iconComponent}
  </button>
);

iconButton.propTypes = {
  iconComponent: PropTypes.node.isRequired,
};

export default iconButton;
