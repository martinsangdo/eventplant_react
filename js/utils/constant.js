/**
 * author: Martin SD
 * constants
 */
import {setting} from './config.js';

export const C_Const = {
  RESPONSE_CODE: {
    SUCCESS: 200,
    FORBIDDEN: 403,
    BAD_REQUEST: 502,
    SERVER_ERROR: 500,

  },
  ARTICLE_TYPE: 'blog',
  COURSE_TYPE: 'event',
  NET_REQUEST_FAIL: 'Network request failed',   //cannot connect to server
  EN_LANG_KEY: 'en',    //english
  VI_LANG_KEY: 'vn',    //Vietnamese
  CN_LANG_KEY: 'cn',    //chinese
  THAI_LANG_KEY: 'th',  //thailand
  EMIT_KEY: {
    CHANGE_NOTIF_NUM: 'change_notif_num', //change notification number
    CHANGE_LANGUAGE: 'change_language',    //change language of apps
    CHANGE_NOTIF_NUM_FROM_PUSH: 'change_notif_num_from_push',  //get trigger when app receives Push
    CHANGE_BOOKMARK_FLAG: 'change_bookmark_flag'    //when user bookmark/unbookmark from detail called from bookmark list
  },
  AUTHORIZATION_PREFIX_HEADER: 'Bearer ', //used in header of Authorization
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  SPLASH_TIMER: 1000,   //time to display splash screen
  MAX_SPLASH_TIMER: 30000,   //maximum time to display splash screen
  DATE_FORMAT: 'YYYY-MM-DD',   //birthday format
  NOTIFICATION_DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  COURSE_DATE_FORMAT: 'DD MMMM YYYY, dddd',
  PAGE_LEN: 10, //default item number in one page, should large enough to load more item
  EMPTY_DATETIME: '0000-00-00 00:00:00',
  EMPTY_DATE: '0000-00-00',
  //message keys get from server API
  RESPONSE_MESS_KEY: {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    SUCCESS: 'SUCCESS',
    NO_DATA: 'NO_DATA'
  },
  LOGIN_TYPE: {   //login by normal acccount or social accounts
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    NORMAL: 'normal'
  },
  JSON_WEB_TOKEN: 'jwt',    //to verify request from this app
  //store/Preference keys
  STORE_KEY: {
    USER_INFO: 'USER_INFO',   //include: user_id, jwt
  }
};
