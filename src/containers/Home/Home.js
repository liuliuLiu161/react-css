import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import { loadBanners } from '../../redux/modules/home';

@connect(
  state => ({...state.home}),
  {pushState: push,
   loadBanners,
  })
export default class Home extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadBanners: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showNotOpenDiaglog: false
    };
  }

  componentDidMount() {
    this.props.loadBanners();
  }

  // 该功能暂未开放
  clickNotOpen() {
    // this.setState({
    //   showNotOpenDiaglog: true
    // })
    // setTimeout(() => {
    //   this.setState({showNotOpenDiaglog: false})
    // }, 2000)
    // return;
  }

  goIframePage(url) {
    // sessionStorage.setItem('iframeUrl', url);
    // browserHistory.push('/iframe-targe');
  }

  // 处理轮播index
  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const styles = require('./Home.scss');
    const { bannersArr } = this.props;

    const yuyueguahaohome = require('../../images/yuyueguahaohome.png');
    const menzhenjiaofeihome = require('../../images/menzhenjiaofeihome.png');
    const zhuyuanfuwuhome = require('../../images/zhuyuanfuwuhome.png');
    const chaxunbaogaohome = require('../../images/chaxunbaogaohome.png');
    const shishijiaohaohome = require('../../images/shishijiaohaohome.png');

    return (
      <div className={styles.homePage}>
        <div className={styles.banner}>
          <AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            {
              bannersArr && bannersArr.map((banner) => {
                return (
                  <div key={banner.name}><img src={banner.pic_url}/></div>
                );
              })
            }
          </AutoPlaySwipeableViews>
          <ul className={styles.bannerIcon}>
            <li className={this.state.index === 0 ? styles.bannerIconCur : ''}></li>
            <li className={this.state.index === 1 ? styles.bannerIconCur : ''}></li>
            <li className={this.state.index === 2 ? styles.bannerIconCur : ''}></li>
          </ul>
        </div>

        <nav className="clearfix">
          <section>
            <Link to="hospital-place">
                <dl className={styles.yuyueguahao}>
                  <dd>预约挂号</dd>
                  <dt>在线预约，省时省力</dt>
                  <img src={yuyueguahaohome}/>
                </dl>
            </Link>
          </section>
          <section>
            <Link to="">
                <dl className={styles.menzhenjiaofei}>
                  <img src={menzhenjiaofeihome}/>
                  <dd>门诊缴费</dd>
                  <dt>在线缴费不排队</dt>
                </dl>
            </Link>
            <Link to="">
              <dl className={styles.menzhenjiaofei}>
                <img src={zhuyuanfuwuhome}/>
                <dd>住院服务</dd>
                <dt>查询住院信息</dt>
              </dl>
            </Link>
          </section>
          <section>
            <Link to="query-report">
              <dl className={styles.zhuyuanfuwu}>
                <img src={menzhenjiaofeihome}/>
                <dd>查询报告</dd>
                <dt>检验检查报告</dt>
              </dl>
            </Link>
            <Link to="">
              <dl className={styles.zhuyuanfuwu}>
                <img src={zhuyuanfuwuhome}/>
                <dd>实时叫号</dd>
                <dt>排队叫号不错过</dt>
              </dl>
            </Link>
          </section>
        </nav>

      </div>
    );
  }
}

