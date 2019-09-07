/* eslint-disable jsx-a11y/no-static-element-interactions */ // todo remove this disabling
/* eslint-disable jsx-a11y/click-events-have-key-events */ // todo remove this disabling
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backdrop from 'app/shared/backdrop/backdrop';
import styles from './modal.module.scss';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    const { show, children } = this.props;
    return nextProps.show !== show || nextProps.children !== children;
  }

  render() {
    const { children, show, modalClosed } = this.props;
    return (
      <>
        <Backdrop
          show={show}
          clicked={modalClosed}
        />
        <div
          className={styles.Modal}
          onClick={modalClosed}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
