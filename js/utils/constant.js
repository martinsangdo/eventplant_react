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
    LANGUAGE: 'LANGUAGE',      //include: saved language key: "current_language":vi/ja, "data_obj" of keywords of current language
    CURRENT_LANG_KEY: 'current_language',   //key of chosen language
    DATA_LANG_KEY: 'data_obj',
    FIREBASE_TOKEN: 'FIREBASE_TOKEN',
    CHOSEN_LANGUAGE_KEY: 'chosen_language', //indicate user chose language in second screen
    DEFAULT_LANG_INFO: {
      current_language: setting.EN_LANG_KEY,
      data_obj: {}
    },
    FILTERING_CATEGORY: 'FILTERING_CATEGORY',   //in Home
    FILTERING_COUNTRY: 'FILTERING_COUNTRY'      //in Courses
  },
  FILTER_COUNTRY: { //used in courses
    ALL: 'all',
    SINGAPORE: 'singapore',
    MALAYSIA: 'malaysia',
    INDIA: 'india',
    THAILAND: 'thailand',
    VIETNAM: 'vietnam'
  },
  FILTER_CATEGORY: { //used in courses
    LATEST: 'latest',
    NEWS: 'news',
    BUSINESS: 'business',
    ENTREPRENEURSHIP: 'entrepreneurship',
    FINANCE: 'finance',
    LIFESTYLE: 'lifestyle'
  }
};
//define string multi-lang keys (same as keyword in DB)
export const C_MULTI_LANG = {
  //tab
  home: 'home',
  courses: 'courses',
  free_courses: 'free_courses',
  profile: 'profile',
  //Select Language
  select_language: 'select_language',
  choose_your_preferred_language: 'choose_your_preferred_language',
  //Select Country
  you_are_almost_there: 'you_are_almost_there',
  where_are_you_signing_in_from: 'where_are_you_signing_in_from',
  select_country: 'select_country',
  //home
  latest: 'latest',
  save: 'save',
  share: 'share',
  search: 'search',
  cancel: 'cancel',
  //filters
  done: 'done',
  filter: 'filter',
  news: 'news',
  business: 'business',
  entrepreneurship: 'entrepreneurship',
  finance: 'finance',
  lifestyle: 'lifestyle',
  all_courses: 'all_courses',
  //notification
  notifications: 'notifications',
  min_ago: 'min_ago',
  mins_ago: 'mins_ago',
  hour_ago: 'hour_ago',
  hours_ago: 'hours_ago',
  day_ago: 'day_ago',
  days_ago: 'days_ago',
  week_ago: 'week_ago',
  weeks_ago: 'weeks_ago',
  month_ago: 'month_ago',
  months_ago: 'months_ago',
  year_ago: 'year_ago',
  years_ago: 'years_ago',
  confirm_del_notif: 'confirm_del_notif',
  //setting
  notification_settings: 'notification_settings',
  about_summit: 'about_summit',
  my_saved_items: 'my_saved_items',
  feedback: 'feedback',
  contact: 'contact',
  about_1: 'about_1',
  about_2: 'about_2',
  about_3: 'about_3',
  about_4: 'about_4',
  about_5: 'about_5',
  language: 'language',
  latest_articles: 'latest_articles',
  latest_news: 'latest_news',
  latest_articles_note: 'latest_articles_note',
  latest_news_note: 'latest_news_note',
  language_note: 'language_note',
  open_setting_app: 'open_setting_app',
  //extra
  confirmation: 'confirmation',
  more_courses: 'more_courses',
  learn_more: 'learn_more',
  saved_items: 'saved_items'
};
