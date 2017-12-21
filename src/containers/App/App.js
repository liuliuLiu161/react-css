import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Diaglog } from '../../components';

const styles = require('./App.scss');

@connect(
  state => ({
    text: state.diaglog.text || '',
    redirectUrl: state.diaglog.redirectUrl,
    ...state.auth
  }),)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    text: PropTypes.string,
    redirectUrl: PropTypes.string,
    location: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      curTabBarIndex: 1
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  clickTabBarItem(index) {
    this.setState({
      curTabBarIndex: index
    });
  }

  render() {
    const homeicon = require('../../images/homeicon.png');
    const homeiconclick = require('../../images/homeiconclick.png');
    const registeredicon = require('../../images/registeredicon.png');
    const registerediconclick = require('../../images/registerediconclick.png');
    const mineicon = require('../../images/mineicon.png');
    const mineiconclick = require('../../images/mineiconclick.png');

    // 根据页面路由的地址，判断是否加高亮
    const curRouteUrl = this.props.location && this.props.location.pathname;
    let curTabBarIndexByRouteUrl;
    if (curRouteUrl === '/') {
      curTabBarIndexByRouteUrl = 1;
    } else if (curRouteUrl === '/registered-record') {
      curTabBarIndexByRouteUrl = 2;
    } else if (curRouteUrl === '/mine') {
      curTabBarIndexByRouteUrl = 3;
    }
    const curTabBarIndex = curTabBarIndexByRouteUrl || this.state.curTabBarIndex;
    return (
      <div>
        <Helmet title="components"/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        {/* 提示信息*/}
        {
          this.props.text ?
            <Diaglog text={this.props.text} redirectUrl={this.props.redirectUrl}/>
            : <strong></strong>
        }
        <ul className={styles.apptarBar}>
          <Link to="/" onClick={() => this.clickTabBarItem(1)} className={curTabBarIndex === 1 ? styles.apptabbarCur : ''}>
            <img src={curTabBarIndex === 1 ? homeiconclick : homeicon} />
            <span>home</span>
          </Link>
          <Link to="component-list" onClick={() => this.clickTabBarItem(2)} className={curTabBarIndex === 2 ? styles.apptabbarCur : ''}>
            <img src={curTabBarIndex === 2 ? registerediconclick : registeredicon} />
            <span>list</span>
          </Link>
          <Link to="/" onClick={() => this.clickTabBarItem(3)} className={curTabBarIndex === 3 ? styles.apptabbarCur : ''}>
            <img src={curTabBarIndex === 3 ? mineiconclick : mineicon} />
            <span>mine</span>
          </Link>
        </ul>
      </div>
    );
  }
}

