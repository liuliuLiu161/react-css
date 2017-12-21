import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentSelectPhoto.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { SelectPhoto } from '../../../components'

@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentSelectPhoto extends Component {
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
        <SelectPhoto />
      </div>
    );
  }
}