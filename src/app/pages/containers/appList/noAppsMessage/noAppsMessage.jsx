import React from 'react';
import PropTypes from 'prop-types';

import HyperlinkButton from 'app/shared/hyperlinkButton/hyperlinkButton';

import styles from './noAppsMessage.module.scss';

const NoAppsMessage = ({ onClick }) => (
  <div className={styles.noApps}>
    <p>You do not have any applications yet</p>
    <HyperlinkButton
      title="Add your first application"
      onClick={onClick}
    />
  </div>
);

NoAppsMessage.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NoAppsMessage;
