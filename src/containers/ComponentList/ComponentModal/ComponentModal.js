import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentModal.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Modal, ModalHeader, ModalFooter } from '../../../components'

@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentModal extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }
  onhide() {

  }

  render() {

    return (
      <div className={styles.componentModal}>
        <Modal
          showModalState = {true}>
          <ModalHeader
            onHide = {this.onhide.bind(this)}
            showCloseBtn = {true}>
            this is header
          </ModalHeader>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          this is modal,this is modal,this is modal,this is modal,this is modal,this is modal,this is modal.
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ModalFooter>
            this is footer
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}