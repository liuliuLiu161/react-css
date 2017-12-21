import React, { Component, PropTypes } from 'react';
import { hideDiaglog } from 'redux/modules/diaglog';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';


let timer = null;

@connect(
  () => ({}),
  {pushState: push, hideDiaglog})
export default class Diaglog extends Component {

  static propTypes = {
    text: PropTypes.string,
    hideDiaglog: PropTypes.func,
    pushState: PropTypes.func,
    redirectUrl: PropTypes.string
  };

  state = {
    show: true
  };

  componentDidMount() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({show: false}, () => {
        this.props.hideDiaglog();
      });
      if (this.props.redirectUrl) {
        console.log(this.props.redirectUrl);
        this.props.pushState(this.props.redirectUrl);
      }
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      this.setState({show: true});
    }
  }

  componentWillUpdate() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({show: false}, () => {
        this.props.hideDiaglog();
      });
      if (this.props.redirectUrl) {
        console.log(this.props.redirectUrl);
        this.props.pushState(this.props.redirectUrl);
      }
    }, 3000);
  }

  componentWillUnMount() {
    console.log('---diag');
    clearTimeout(timer);
  }

  render() {
    const styles = require('./Diaglog.scss');
    console.log('---diaglog');
    console.log(this.state.show);
    return (
      <div className={styles.diagLog}>
        {
          this.props.text && this.state.show && this.props.redirectUrl ?
            <div className={styles.loading}>
              <div className={styles.tipWithRedirectUrl}>{this.props.text}</div>
              <div className={styles.redirectUrl}>即将跳转...</div>
            </div> : ''
        }
        {
          this.props.text && this.state.show && !this.props.redirectUrl ?
            <div className={styles.loading}>
              <div className={styles.tipWithNoRedirectUrl}>{this.props.text}</div>
            </div> : ''
        }
      </div>
    );
  }
}
