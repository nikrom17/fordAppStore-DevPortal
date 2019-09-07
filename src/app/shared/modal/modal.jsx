import React, { Component } from 'app/shared/modal/app/shared/Modal/react';
import styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../backdrop/backdrop';

class Modal extends Component {
  shouldComponentUpdate (nextProps, nextState) {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render () {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}/>
        <div
          className={styles.Modal}
          onClick={this.props.modalClosed}
          style={{
            transform: this.props.show ? 'translateY(0)' :'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }} >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;