const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const MODIFY_PASS = 'MODIFY_PASS';
const MODIFY_PASS_SUCCESS = 'MODIFY_PASS_SUCCESS';
const MODIFY_PASS_FAIL = 'MODIFY_PASS_FAIL';

const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

const SEND_REGISTER_MSG_CODE = 'SEND_REGISTER_MSG_CODE';
const SEND_REGISTER_MSG_CODE_SUCCESS = 'SEND_REGISTER_MSG_CODE_SUCCESS';
const SEND_REGISTER_MSG_CODE_FAIL = 'SEND_REGISTER_MSG_CODE_FAIL';

const CHECK_MSG_CODE = 'CHECK_MSG_CODE';
const CHECK_MSG_CODE_SUCCESS = 'CHECK_MSG_CODE_SUCCESS';
const CHECK_MSG_CODE_FAIL = 'CHECK_MSG_CODE_FAIL';

const LOAD_AUTH_TOKEN = 'LOAD_AUTH_TOKEN';
const LOAD_AUTH_TOKEN_SUCCESS = 'LOAD_AUTH_TOKEN_SUCCESS';
const LOAD_AUTH_TOKEN_FAIL = 'LOAD_AUTH_TOKEN_FAIL';

const initialState = {
  loading: false,
  loginSuccess: '',
  user: {},
  tip: '',
  modifyPassSuccess: '',
  registerSuccess: '', // 是否注册成功
  sendMsgCodeSuccess: '', // 发送验证码成功
  checkMsgCodeSuccess: '', // 接口访问成功，验证验证码成功 1成功 2失败 空或者0等表示没有走action
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        loginSuccess: '',
        user: {},
        tip: ''
      };
    case LOGIN_SUCCESS:
      console.log(action, 'LOGIN_SUCCESS');
      let token = '';
      token = action.result && action.result.data && action.result.data.token || '';
      let uid = '';
      uid = action.result && action.result.data && action.result.data.user_id || '';
      let treatmenId = '';
      treatmenId = action.result && action.result.data && action.result.data.patient_id || '';
      let treatmentName = '';
      treatmentName = action.result && action.result.data && action.result.data.name || '';
      let MedicalCard = '';
      MedicalCard = action.result && action.result.data && action.result.data.MedicalCard || '';
      let patientType = '';
      patientType = action.result && action.result.data && action.result.data.patientType || '';

      localStorage.setItem('uid', uid);
      localStorage.setItem('token', token);
      localStorage.setItem('treatmentId', treatmenId);
      localStorage.setItem('treatmentName', treatmentName);
      localStorage.setItem('MedicalCard', MedicalCard);
      localStorage.setItem('patientType', patientType);
      localStorage.setItem('userInfor', JSON.stringify(action.result.data));
      return {
        ...state,
        loading: false,
        loginSuccess: action.result && action.result.code == 200 ? '1' : '2',
        user: action.result && action.result.data,
        tip: action.result && action.result.msg
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL');
      console.log(action);
      return {
        ...state,
        loading: false,
        loginSuccess: '2',
        user: {},
        tip: ''
      };

    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      console.log('LOGOUT_SUCCESS');
      console.log(action);
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      console.log('LOGOUT_FAIL');
      console.log(action);
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };

    case MODIFY_PASS:
      return {
        ...state,
        loading: true,
        modifyPassSuccess: '',
        tip: action.result && action.result.msg
      };
    case MODIFY_PASS_SUCCESS:
      console.log('MODIFY_PASS_SUCCESS');
      console.log(action);
      return {
        ...state,
        loading: false,
        modifyPassSuccess: action.result && action.result.code == 200 ? '1' : '2',
        tip: action.result && action.result.msg
      };
    case MODIFY_PASS_FAIL:
      console.log('MODIFY_PASS_FAIL');
      console.log(action);
      return {
        ...state,
        loading: false,
        modifyPassSuccess: '2',
        tip: action.result && action.result.msg
      };

    case REGISTER:
      return {
        ...state,
        loading: true,
        tip: '',
        registerSuccess: '',
        user: {},
      };
    case REGISTER_SUCCESS:
      console.log('REGISTER_SUCCESS');
      console.log(action);
      token = action.result && action.result.data && action.result.data.token || '';
      uid = action.result && action.result.data && action.result.data.user_id || '';
      treatmenId = action.result && action.result.data && action.result.data.patient_id || '';
      treatmentName = action.result && action.result.data && action.result.data.name || '';
      MedicalCard = action.result && action.result.data && action.result.data.MedicalCard || '';
      patientType = action.result && action.result.data && action.result.data.patientType || '';

      localStorage.setItem('uid', uid);
      localStorage.setItem('token', token);
      localStorage.setItem('treatmentId', treatmenId);
      localStorage.setItem('treatmentName', treatmentName);
      localStorage.setItem('MedicalCard', MedicalCard);
      localStorage.setItem('patientType', patientType);
      localStorage.setItem('userInfor', JSON.stringify(action.result.data));
      return {
        ...state,
        loading: false,
        registerSuccess: action.result && action.result.code == 200 ? '1' : '2',
        user: action.result && action.result.data,
        tip: action.result && action.result.msg
      };
    case REGISTER_FAIL:
      console.log('REGISTER_FAIL');
      console.log(action);
      return {
        ...state,
        loading: false,
        registerSuccess: '2',
        tip: action.result && action.result.msg,
        user: {},
      };

    case SEND_REGISTER_MSG_CODE:
      return {
        ...state,
        loading: true,
        tip: '',
        sendMsgCodeSuccess: '',
      };
    case SEND_REGISTER_MSG_CODE_SUCCESS:
      console.log('SEND_REGISTER_MSG_CODE_SUCCESS');
      console.log(action);
      return {
        ...state,
        loading: false,
        sendMsgCodeSuccess: action.result && action.result.code == 200 ? '1' : '2',
        tip: action.result && action.result.msg
      };
    case SEND_REGISTER_MSG_CODE_FAIL:
      console.log('SEND_REGISTER_MSG_CODE_FAIL');
      console.log(action);
      return {
        ...state,
        loading: false,
        sendMsgCodeSuccess: '2',
        tip: action.result && action.result.msg
      };

    case CHECK_MSG_CODE:
      return {
        ...state,
        loading: true,
        tip: '',
        checkMsgCodeSuccess: '',
        checkMsgCodeFail: false,
      };
    case CHECK_MSG_CODE_SUCCESS:
      console.log('CHECK_MSG_CODE_SUCCESS');
      console.log(action);
      return {
        ...state,
        loading: false,
        checkMsgCodeSuccess: action.result && action.result.code == 200 ? '1' : '2',
        tip: action.result && action.result.msg
      };
    case CHECK_MSG_CODE_FAIL:
      console.log('CHECK_MSG_CODE_FAIL');
      console.log(action);
      return {
        ...state,
        loading: true,
        checkMsgCodeSuccess: '2',
        tip: action.result && action.result.msg
      };

    case LOAD_AUTH_TOKEN:
      return {
        ...state,
        loading: true,
        tip: '',
        checkMsgCodeSuccess: '',
        checkMsgCodeFail: false,
      };
    case LOAD_AUTH_TOKEN_SUCCESS:
      console.log('LOAD_AUTH_TOKEN_SUCCESS');
      console.log(action);
      return {
        ...state,
        loading: false,
        checkMsgCodeSuccess: action.result && action.result.code == 200 ? '1' : '2',
        tip: action.result && action.result.msg
      };
    case LOAD_AUTH_TOKEN_FAIL:
      console.log('LOAD_AUTH_TOKEN_FAIL');
      console.log(action);
      return {
        ...state,
        loading: true,
        checkMsgCodeSuccess: '2',
        tip: action.result && action.result.msg
      };

    default:
      return state;
  }
}

export function login(phone, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/users/login', {
      data: {
        phone: phone,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function modifyPass(options) {
  return {
    types: [MODIFY_PASS, MODIFY_PASS_SUCCESS, MODIFY_PASS_FAIL],
    promise: (client) => client.post('/logout', {
      data: options
    })
  };
}

/**
 * action: register
 params required
 */
export function register(password, name, sex, phone, cardType, cardNo, patientType, birthday, patientAgeType, relation_name) {
  console.log(password, 'password', name, 'name', sex, 'sex', phone, 'phone', cardType, 'cardType', cardNo, 'cardNo', patientType, 'patientType', birthday, 'birthday', patientAgeType, 'patientAgeType', relation_name, 'relation_name', 'ppp');
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/users/register', {
      data: {
        password: password,
        name: name,
        sex: sex,
        phone: phone,
        sex: sex,
        cardType: cardType,
        cardNo: cardNo,
        patientType: patientType,
        birthday: birthday,
        patientAgeType: patientAgeType,
        relation_name: relation_name,
      }
    })
  };
}


/**
 * action: send register msgcode
 * params: tel type: 01，注册发送的验证码
 */
export function sendRegisterMsgCode(tel) {
  return {
    types: [SEND_REGISTER_MSG_CODE, SEND_REGISTER_MSG_CODE_SUCCESS, SEND_REGISTER_MSG_CODE_FAIL],
    promise: (client) => client.get('/users/verify-code/send/' + tel)
  };
}


/**
 * action: 验证验证码
 * params: 验证码msgcode type： 01，注册发送的验证码
 */
export function checkMsgCode(msgcode, tel) {
  return {
    types: [CHECK_MSG_CODE, CHECK_MSG_CODE_SUCCESS, CHECK_MSG_CODE_FAIL],
    promise: (client) => client.post('/users/verify-code/validate/' + tel, {
      data: {
        code: msgcode,
      }
    })
  };
}

/**
 * 获取token
 */
export function loadAuthToken() {
  let uid = localStorage.getItem('uid');
  return {
    types: [LOAD_AUTH_TOKEN, LOAD_AUTH_TOKEN_SUCCESS, LOAD_AUTH_TOKEN_FAIL],
    promise: (client) => client.post('/users/auth/token', {
      data: {
        scpoe: 'USER',
        uid: uid,
        secret: 'secret',
      }
    })
  };
}
