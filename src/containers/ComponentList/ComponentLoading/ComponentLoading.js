import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentLoading.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Loading } from '../../../components';

@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentLoading extends Component {
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

  render() {

    return (
      <div className={styles.homePage}>
        <Helmet title="loadings" />
        <Loading showLoading={true}/>
      </div>
    );
  }
}