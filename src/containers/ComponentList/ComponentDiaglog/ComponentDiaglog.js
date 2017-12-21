import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentDiaglog.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import {showDiaglog} from '../../../redux/modules/diaglog';

@connect(
  state => ({...state.home}),
  {pushState: push, showDiaglog
  })
export default class ComponentDiaglog extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    showDiaglog: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.showDiaglog('this is diaglog');
  }

  render() {

    return (
      <div className={styles.homePage}>

      </div>
    );
  }
}