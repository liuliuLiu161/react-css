const LOAD_BANNERS_LIST = 'LOAD_BANNERS_LIST';
const LOAD_BANNERS_LIST_SUCCESS = 'LOAD_BANNERS_LIST_SUCCESS';
const LOAD_BANNERS_LIST_FAIL = 'LOAD_BANNERS_LIST_FAIL';

const initState = {
  loading: false,
  bannersArr: [],
};


export default function loadBannersReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_BANNERS_LIST:
      console.log('LOAD_BANNERS_LIST');
      return {
        ...state,
        loading: true,
        bannersArr: []
      };
    case LOAD_BANNERS_LIST_SUCCESS:
      console.log('LOAD_BANNERS_LIST_SUCCESS');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        bannersArr: action.result.data,
      };
    case LOAD_BANNERS_LIST_FAIL:
      console.log('LOAD_BANNERS_LIST_FAIL');
      // consoel.log(action);
      return {
        ...state,
        loading: false,
        bannersArr: []
      };

    default:
      return state;
  }
}


/**
 * 轮播图
 */
export function loadBanners(openid) {
  return {
    types: [LOAD_BANNERS_LIST, LOAD_BANNERS_LIST_SUCCESS, LOAD_BANNERS_LIST_FAIL],
    promise: (client) => client.post('/users/banners')
  };
}

