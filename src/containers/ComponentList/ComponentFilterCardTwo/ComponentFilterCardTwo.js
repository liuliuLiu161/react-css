import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentFilterCardTwo.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FilterCardTwo } from '../../../components';


@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentFilterCardTwo extends Component {
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

  // 点击第二个筛选内容
  buttonChange(index) {
    this.clickFilterTwoItem();
  }

  render() {

    return (
      <div className={styles.componentFilterCardTwo}>
        <Helmet title="FilterCardTwo" />
        < FilterCardTwo
          leftBtn = 'left'
          rightBtn = 'right'
          onChange = {this.buttonChange.bind(this)}
        />
      </div>
    );
  }
}