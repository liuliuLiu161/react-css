import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {push} from 'react-router-redux';
import {Loading} from '../../components';
import {showDiaglog} from '../../redux/modules/diaglog';
import {login, loadAuthToken} from '../../redux/modules/auth';

const styles = require('./Login.scss');

@connect(
  state => ({...state.auth}), {
    pushState: push, login, showDiaglog, loadAuthToken
  }
)
export default class Login extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    login: PropTypes.func,
    loadAuthToken: PropTypes,
    showDiaglog: PropTypes.func,
    loading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      telText: '',
      passwordText: ''
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('dd');
    if (nextProps.loginSuccess == '1'){
      console.log('dfasdfasf');
      // this.props.showDiaglog('登录成功', '/');
      // this.props.loadAuthToken();
      this.props.pushState('/');
    }
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

  clickUnableBtn() {
    this.props.showDiaglog('手机号或验证码不能为空');
  }

  clickLoginBtn() {
    if (!this.testPhoneNumber(this.state.telText)) {
      this.props.showDiaglog('请输入有效的手机号码');
      return;
    }
    const {telText, passwordText} = this.state;
    this.props.login(telText, passwordText);
  }

  goRegister() {
    this.props.pushState('register');
  }

  render() {
    const {telText, passwordText} = this.state;
    return (
      <div>
        <Helmet title="登录"/>
        <Loading showLoading={this.props.loading} />
        <p className="shadeWhite"></p>
        <ul className={styles.LoginPage}>
          <li className={styles.formLayout + ' ' + styles.userCard}>
            <input type="tel" placeholder="手机号" id="tel" onChange={this.changeTel.bind(this)} />
            <label htmlFor="tel" className="flex tb-flex"><i></i></label>
          </li>
          <li className={styles.formLayout + ' ' + styles.passwordCard}>
            <input type="text" placeholder="密码" id="password" onChange={this.changePassword.bind(this)} />
            <label htmlFor="password" className="flex tb-flex"><i></i></label>
            <article className={'flex tb-flex ' + styles.forgetPasswordBtn}><i></i>忘记密码</article>
          </li>
          <li className={styles.submitBtn}>
            {
              telText && passwordText ?
                <button className="btn trbtn" onClick={this.clickLoginBtn.bind(this)}>登录</button>
                :
                <button className={'btn trbtn ' + styles.unableBtn} onClick={this.clickUnableBtn.bind(this)}>登录</button>
            }
          </li>
          <li className={styles.footerArticle} onClick={() => this.goRegister()}>注册账号 &gt;</li>
        </ul>
      </div>
    );
  }
}

