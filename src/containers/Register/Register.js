import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {push} from 'react-router-redux';
import {Loading} from '../../components';
import {showDiaglog} from '../../redux/modules/diaglog';
import {sendRegisterMsgCode, checkMsgCode} from '../../redux/modules/auth';

const styles = require('../Login/Login.scss');
let timeInterVal = null;
@connect(
  state => ({...state.auth}), {
    showDiaglog, sendRegisterMsgCode, checkMsgCode, pushState: push
  }
)
export default class Register extends Component {
  static propTypes = {
    clickGoPerfectInformationBtn: PropTypes.func,
    showDiaglog: PropTypes.func,
    sendRegisterMsgCode: PropTypes.func,
    sendMsgCodeSuccess: PropTypes.bool,
    checkMsgCode: PropTypes.func,
    checkMsgCodeSuccess: PropTypes.bool,
    checkMsgCodeFail: PropTypes.bool,
    tip: PropTypes.string,
    pushState: PropTypes.func,
    loading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      telText: '', // 手机号value
      passwordText: '', // 密码value
      repasswordText: '', // 再次输入密码
      msgCodeText: '', // 输入的验证码value
      msgCodeTimeText: '30', // 倒计时30秒，文本
      msgCodeSetIntervalStart: false, // false倒计时30秒结束   true倒计时30秒开始
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // 验证码发送过来
    if (!nextProps.loading && !nextProps.sendMsgCodeSuccess) {
      this.props.showDiaglog(nextProps.tip);
    } else if (!this.props.sendMsgCodeSuccess && nextProps.sendMsgCodeSuccess) {
      const self = this;
      // 初始化计时控件
      timeInterVal = setInterval(() => {
        const prevMsgCodeTimeText = this.state.msgCodeTimeText;
        if (prevMsgCodeTimeText === 0) {
          self.setState({
            msgCodeTimeText: '30',
            msgCodeSetIntervalStart: false
          });
          clearInterval(timeInterVal);
        } else {
          self.setState({
            msgCodeTimeText: prevMsgCodeTimeText - 1,
            msgCodeSetIntervalStart: true
          });
        }
      }, 1000);
    }
    // 校验验证码
    const {telText, passwordText} = this.state;
    if (!this.props.checkMsgCodeSuccess && nextProps.checkMsgCodeSuccess) {
      this.props.pushState('perfect-information/' + telText + '/' + passwordText);
    } else if (!this.props.checkMsgCodeFail && nextProps.checkMsgCodeFail) {
      this.props.showDiaglog(this.props.tip);
    }
  }

  componentWillUnMount() {
    clearInterval(timeInterVal);
  }

  testPhoneNumber(phone) {
    const regex = /(1([3578][0-9]))\d{8}/;
    return (regex.test(phone) && (phone.length === 11));
  }

  changeTel(event) {
    this.setState({
      telText: event.target.value
    });
  }

  changePassword(event) {
    this.setState({
      passwordText: event.target.value
    });
  }

  changeRePassword(event) {
    this.setState({
      repasswordText: event.target.value
    });
  }

  changeMsgCode(event) {
    this.setState({
      msgCodeText: event.target.value
    });
  }

  clickUnableGetMsgCode() {
    this.props.showDiaglog('请输入手机号');
  }

  clickGetMsgBtn() {
    const {telText} = this.state;
    if (!this.testPhoneNumber(telText)) {
      this.props.showDiaglog('请输入有效的手机号码');
    } else {
      this.props.sendRegisterMsgCode(telText);
    }
  }

  clickUnableBtn() {
    this.props.showDiaglog('手机号或验证码不能为空');
  }

  clickGoPerfectInformationBtn() {
    const {telText, msgCodeText, passwordText} = this.state;
    if (!this.testPhoneNumber(telText)) {
      this.props.showDiaglog('请输入有效的手机号码');
      return;
    }
    if (passwordText.length < 5) {
      this.props.showDiaglog('请输入6位以上的密码');
      return;
    }
    this.props.checkMsgCode(msgCodeText, telText);
  }

  goLogin() {
    window.history.go(-1)
  }

  render() {
    const {telText, msgCodeText, msgCodeTimeText, msgCodeSetIntervalStart} = this.state;
    return (
      <div>
        <Helmet title="注册"/>
        <p className="shadeWhite"></p>
        <ul className={styles.RegisterPage}>
          <li className={styles.formLayout + ' ' + styles.userCard}>
            <input type="tel" placeholder="手机号" id="tel" onChange={this.changeTel.bind(this)} />
            <label htmlFor="tel" className="flex tb-flex"><i></i></label>
          </li>
          <li className={styles.formLayout + ' ' + styles.msgCard}>
            <input type="text" placeholder="验证码" id="password" onChange={this.changeMsgCode.bind(this)} />
            <label htmlFor="password" className="flex tb-flex"><i></i></label>
            {
              telText && !msgCodeSetIntervalStart ?
                <article className={styles.getMsgBtn + ' ' + styles.getMsgBtnCur} onClick={this.clickGetMsgBtn.bind(this)}>获取</article>
                : <article className={styles.getMsgBtn} onClick={this.clickUnableGetMsgCode.bind(this)}>获取</article>
            }
            {
              msgCodeSetIntervalStart ?
                <article className={styles.getMsgBtn + ' ' + styles.getMsgBtnCur}>{msgCodeTimeText} s</article>
                : <strong></strong>
            }
          </li>
          <li className={styles.formLayout + ' ' + styles.passwordCard}>
            <input type="password" placeholder="输入6位以上密码" id="password" onChange={this.changePassword.bind(this)} />
            <label htmlFor="password" className="flex tb-flex"><i></i></label>
          </li>
          <li className={styles.formLayout + ' ' + styles.passwordCard}>
            <input type="password" placeholder="再次输入密码" id="password" onChange={this.changeRePassword.bind(this)} />
            <label htmlFor="password" className="flex tb-flex"><i></i></label>
          </li>
          <li className={styles.submitBtn}>
            {
              telText && msgCodeText ?
                <button className="btn trbtn" onClick={this.clickGoPerfectInformationBtn.bind(this)}>注册</button>
                :
                <button className={'btn trbtn ' + styles.unableBtn} onClick={this.clickUnableBtn.bind(this)}>注册</button>
            }
          </li>
          <li className={styles.footerArticle} onClick={() => this.goLogin()}>&gt; 返回登录</li>
        </ul>
      </div>
    );
  }
}