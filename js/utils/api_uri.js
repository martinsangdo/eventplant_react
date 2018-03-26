/**
 * author: Martin SD
 * API URI
 */
import {setting} from './config.js';

export const API_URI = {
    DEFAULT_REQUEST_HEADER: {   //header of request sending to server
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    },
    MULTIPART_REQUEST_HEADER: {
        'Content-Type': 'multipart/form-data'
    },
    //Splash
    UPSERT_USER: setting.IP + '_api/user/upsert_user',
    GET_LANGUAGE_KEY: setting.IP + '_api/common/get_app_translation', //get translation of key labels
    //select country
    GET_GEO_INFO: 'https://freegeoip.net/json/',
    GET_COUNTRY_LIST: setting.IP + '_api/geolocation/get_country_list',
    UPSERT_USER_COUNTRY: setting.IP + '_api/user/upsert_user_country',
    //home (article list)
    GET_ARTICLE_LIST: setting.IP + '_api/record/get_blog_list',
    UPSERT_BOOKMARK: setting.IP + '_api/record/upsert_bookmark',
    GET_BLOG_DETAIL: setting.IP + '_api/record/get_blog_detail/',
    SEARCH_BLOG: setting.IP + '_api/record/search_blog',
    //courses
    GET_FREE_COURSES_PAGING: setting.IP + '_api/record/get_free_course_list',
    GET_EVENT_DETAIL: setting.IP + '_api/record/get_event_detail/',
    SEARCH_EVENT: setting.IP + '_api/record/search_event',
    //notifications
    GET_NOTIF_LIST: setting.IP + '_api/user/get_notification_list',
    DELETE_NOTIF_BY_ID: setting.IP + '_api/user/delete_notification',
    //bookmark
    GET_BOOKMARK_LIST: setting.IP + '_api/record/get_bookmark_list',
    UPSERT_BOOKMARK: setting.IP + '_api/record/upsert_bookmark',
    DELETE_BOOKMARK: setting.IP + '_api/record/delete_bookmark',
    //setting
    GET_NOTIF_SETTINGS: setting.IP + '_api/user/get_notification_setting',
    UPDATE_NOTIF_SETTINGS: setting.IP + '_api/user/update_notification_setting'
};
