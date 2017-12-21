import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./Button.scss');
import { Link } from 'react-router';

@connect(
  state => ({}),
  {pushState: push,
  })
export class NotClickBtn extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className={styles.notClick}>
        <footer>
          <button className={'btn trbtn ' + styles.unableBtn}>{this.props.title}</button>
        </footer>
      </div>
    );
  }
}

export class CanClickBtn extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className={styles.canClickBtn}>
        <footer>
          <button className={'btn trbtn '}>{this.props.title}</button>
        </footer>
      </div>
    );
  }
}

export class PositionBtn extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className={styles.positionBtn}>
          <button className={'btn pobtn'}>{this.props.title}</button>
      </div>
    );
  }
}

export class AllSelectBtn extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className={styles.allSelectBtn}>
        <footer>
          <input type="checkbox"/>
          <button className={'btn'}>{this.props.title}</button>
        </footer>
      </div>
    );
  }
}