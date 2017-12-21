import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {push} from 'react-router-redux';
import {Loading} from '../../components';
import {showDiaglog} from '../../redux/modules/diaglog';
import {register, loadAuthToken} from '../../redux/modules/auth';

const styles = require('./PerfectInformation.scss');

@connect(
  state => ({...state.auth}), {
    pushState: push, register, showDiaglog, loadAuthToken
  }
)
export default class Register extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
    pushState: PropTypes.func,
    loadAuthToken: PropTypes.func,
    register: PropTypes.func,
    showDiaglog: PropTypes.func,
    loading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  render() {
    const {phone, password} = this.props.routeParams;
    return (
      <div>
        <Loading showLoading={this.props.loading} />
        <PerfectInformation  phone={phone} password={password}/>
      </div>
    );
  }
}

/**
 * component: perfect information
 */
@connect(
  state => ({...state.auth}), {
    showDiaglog, register, loadAuthToken
  }
)
class PerfectInformation extends Component {
  static propTypes = {
    register: PropTypes.func,
    showDiaglog: PropTypes.func,
    loadAuthToken: PropTypes.func,
    sendMsgCodeSuccess: PropTypes.string,
    tip: PropTypes.string,
    loading: PropTypes.bool,
    openId: PropTypes.object,
    registerSuccess: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      cardTypeText: '',
      cardNumText: '',
      sexText: '',
      birthDayText: '出生日期',
      nameText: '',
      inputDateplacehoder: '出生日期',
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // 注册成功
    if (!this.props.registerSuccess && nextProps.registerSuccess === '1') {
      console.log('--注册成功');
      this.props.loadAuthToken();
      this.props.showDiaglog('注册成功', '/');
    } else if (!this.props.registerSuccess && nextProps.registerSuccess === '2') {
      console.log('---register fail');
      this.props.showDiaglog(nextProps.tip);
      return;
    }
  }


  testPhoneNumber(phone) {
    const regex = /(1([3578][0-9]))\d{8}/;
    return (regex.test(phone) && (phone.length === 11));
  }

  goRegitser() {
    const { cardTypeText, cardNumText, sexText, birthDayText, nameText} = this.state;
    const {phone, password} = this.props;

    // password, name, sex, phone, cardType, cardNo, patientType, birthday, patientAgeType, relation_name
    this.props.register( password, nameText, sexText, phone, 'cardType', cardNumText, 'patientType', birthDayText, cardTypeText, 'relation_name');
  }

  // 修改真实姓名
  changeUserName(event) {
    this.setState({
      nameText: event.target.value
    });
  }

  // 修改证件类型
  changeCardType(event) {
    this.setState({
      cardTypeText: event.target.value,
    });

    const cardTypeText = event.target.value;
      const cardId = this.state.cardNumText;
      const year = cardId.substr(6, 4);
      const month = cardId.substr(10, 2);
      const day = cardId.substr(12, 2);
      this.setState({
        birthDayText: year + '-' + month + '-' + day,
        sexText: cardId.length > 13 ? cardId.substr(cardId.length - 2, 1) % 2 ? '1' : '2' : ''
      });
  }

  // 修改证件号码
  changeCardNum(event) {
    const {cardTypeText} = this.state;
    const cardId = event.target.value;
    const year = cardId.substr(6, 4);
    const month = cardId.substr(10, 2);
    const day = cardId.substr(12, 2);
      this.setState({
        cardNumText: event.target.value.toUpperCase(),
        birthDayText: year + '-' + month + '-' + day,
        sexText: cardId.length > 13 ? cardId.substr(cardId.length - 2, 1) % 2 ? '1' : '2' : ''
      });
  }

  // 修改性别
  changeSex(sexValue) {
    this.setState({
      sexText: sexValue
    });
  }

  // 修改生日
  changeBirthday(event) {
    if (!event.target.value){
      this.setState({
        inputDateplacehoder: '出生日期',
      });
    }
    this.setState({
      inputDateplacehoder: '',
      birthDayText: event.target.value
    });
  }

  // 获取验证吗不可点
  clickUnableGetMsgCode() {
    this.props.showDiaglog('请输入手机号');
  }

  // 注册不可点
  clickUnableBtn() {
    const { nameText, cardTypeText, cardNumText, sexText, birthDayText} = this.state;
    if (!nameText) {
      this.props.showDiaglog('请输入姓名');
      return;
    }
    if (!cardTypeText) {
      this.props.showDiaglog('请选择证件');
      return;
    }
    if (!cardNumText) {
      this.props.showDiaglog('请输入证件号');
      return;
    }
    if (sexText !== '2' && sexText !== '1') {
      this.props.showDiaglog('请选择性别');
      return;
    }
    if (!birthDayText) {
      this.props.showDiaglog('请输入出生日期');
      return;
    }
  }

  // 15位转18位身份证号
  changeFivteenToEighteen(cardNum) {
    let card = cardNum;
    if (card.length === '15' || card.length === 15) {
      const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      let cardTemp = 0;
      let cardKey;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (cardKey = 0; cardKey < 17; cardKey++) {
        cardTemp += card.substr(cardKey, 1) * arrInt[cardKey];
      }
      card += arrCh[cardTemp % 11];
      return card;
    }
    return card;
  }

  // 校验位的检测
  checkParity(cardNum) {
    // 15位转18位
    const card = this.changeFivteenToEighteen(cardNum);
    if (card.length === '18' || card.length === 18) {
      const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      let cardTemp = 0;
      let cardKey;
      let valnum;
      for (cardKey = 0; cardKey < 17; cardKey ++) {
        cardTemp += card.substr(cardKey, 1) * arrInt[cardKey];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum === card.substr(17, 1)) {
        return true;
      }
      return false;
    }
    return false;
  }

  // 检查号码是否符合规范，包括长度，类型
  isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
      return false;
    }
    return true;
  }

  // 取身份证前两位,校验省份
  checkProvince(card) {
    const province = card.substr(0, 2);
    const vcity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    };

    if (vcity[province] === undefined) {
      return false;
    }
    return true;
  }

  // 校验日期
  verifyBirthday(year, month, day, birthday) {
    const now = new Date();
    const now_year = now.getFullYear();
    // 年月日是否合理
    if (birthday.getFullYear() === parseInt(year, 10) && (birthday.getMonth() + 1) === parseInt(month, 10) && birthday.getDate() === parseInt(day, 10)) {
      // 判断年份的范围（3岁到100岁之间)
      const time = now_year - year;
      if (time >= 0 && time <= 160) {
        return true;
      }
      return false;
    }
    return false;
  }

  // 检查生日是否正确
  checkBirthday(card) {
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (card.length === '15' || card.length === 15) {
      const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      const arr_data = card.match(re_fifteen);
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date('19' + year + '/' + month + '/' + day);
      return this.verifyBirthday('19' + year, month, day, birthday);
    }
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (card.length === '18' || card.length === 18) {
      const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      const arr_data = card.match(re_eighteen);
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date(year + '/' + month + '/' + day);
      return this.verifyBirthday(year, month, day, birthday);
    }
    return false;
  }

  checkCard(cardNum) {
    const card = cardNum;
    let tip = '0';
    // 是否为空
    if (card === '') {
      tip = '请输入身份证号，身份证号不能为空';
    }
    // 校验长度，类型
    if (this.isCardNo(card) === false) {
      tip = '您输入的身份证号码不正确';
    }
    // 检查省份
    if (this.checkProvince(card) === false) {
      tip = '您输入的身份证号码不正确';
    }
    // 校验生日
    if (this.checkBirthday(card) === false) {
      tip = '您输入的身份证号码生日不正确';
    }
    // 检验位的检测
    if (this.checkParity(card) === false) {
      tip = '您的身份证校验位不正确';
    }
    return tip;
  }

  // 校验验证吗
  clickRegister() {
    const {cardTypeText, cardNumText} = this.state;
      if (this.checkCard(cardNumText) !== '0') {
        this.props.showDiaglog(this.checkCard(cardNumText));
        return;
      } else {
        this.goRegitser()
      }
  }

  render() {
    const { cardNumText, cardTypeText, sexText, birthDayText, nameText} = this.state;
    return (
      <div>
        <Helmet title="完善信息"/>
        <p className="shadeWhite"></p>
        <ul className={styles.RegisterPage}>
          <li className={styles.formLayout + ' select ' + styles.formLayoutBorder + ' ' + styles.cardTypeCard}>
            <select id="cardType" onChange={this.changeCardType.bind(this)}>
              <option value="null" defaultValue>身份类型</option>
              <option value="1">成人</option>
              <option value="2">儿童</option>
            </select>
            <label htmlFor="cardType" className="flex tb-flex">
              <i></i>
              <svg className={styles.graphic} width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
              </svg>
            </label>
            <p className="select-icon"><i></i><i></i></p>
          </li>
          <li className={styles.formLayout + ' ' + styles.formLayoutBorder + ' ' + styles.userCard}>
            <input type="text" placeholder="真实姓名" id="userName" onChange={this.changeUserName.bind(this)} />
            <label htmlFor="userName" className="flex tb-flex">
              <i></i>
              <svg className={styles.graphic} width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
              </svg>
            </label>
          </li>
          <li className={styles.formLayout + ' ' + styles.formLayoutBorder + ' ' + styles.cardCard}>
            <input type="text" placeholder="身份证号" id="card" onChange={this.changeCardNum.bind(this)} />
            <label htmlFor="card" className="flex tb-flex">
              <i></i>
              <svg className={styles.graphic} width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
              </svg>
            </label>
          </li>
          <li className={'clearfix ' + styles.sexCard}>
            <dl className="left"><i></i>性别</dl>
            <dl className="right clearfix">
              <dt className="left">女</dt>
              <dd className="radio left">
                {
                  sexText === '2' ?
                    <input type="radio" id="sexFemale" name="sex" checked disabled />
                    :
                    <input type="radio" id="sexFemale" name="sex" onChange={() => this.changeSex('2')} />
                }
                <label htmlFor="sexFemale"></label>
              </dd>
            </dl>
            <dl className="right clearfix">
              <dt className="left">男</dt>
              <dd className="radio left">
                {
                  sexText === '1' ?
                    <input type="radio" id="sexMale" name="sex" checked disabled />
                    :
                    <input type="radio" id="sexMale" name="sex" onChange={() => this.changeSex('1')} />
                }
                <label htmlFor="sexMale"></label>
              </dd>
            </dl>
          </li>
          <li className={styles.formLayout + ' ' + styles.formLayoutBorder + ' ' + styles.dateCard}>
            {
                <input type="text" value={birthDayText} disabled />
            }
            <label htmlFor="birthdayName" className="flex tb-flex">
              <i></i>
              <svg className={styles.graphic} width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
              </svg>
            </label>
          </li>
          <li className={styles.submitBtn}>
            {
              nameText && cardTypeText && cardNumText && birthDayText && (sexText === '1' || sexText === '2') ?
                <button className="btn trbtn" onClick={this.clickRegister.bind(this)}>注册</button>
                :
                <button className={'btn trbtn ' + styles.unableBtn} onClick={this.clickUnableBtn.bind(this)}>注册</button>
            }
          </li>
          <li><footer>注:信息一旦填写不可更改</footer></li>
        </ul>
      </div>
    );
  }
}