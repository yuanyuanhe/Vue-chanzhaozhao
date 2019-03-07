import axios from 'axios'
import md5 from './md5';
import qs from 'qs'
let url = "https://wx.yiako.com/omp_cmanage/mallgateway",
    app_key = "1002",
    app_secret = "abc",
    data = {
      "tenant_num_id": 6,
      "data_sign": 1,
    };
//合并JSON
function mergeJsonObject (jsonbject1, jsonbject2) {
  var resultJsonObject={};
  for(var attr in jsonbject1){
    resultJsonObject[attr]=jsonbject1[attr];
  }
  for(var attr in jsonbject2){
    resultJsonObject[attr]=jsonbject2[attr];
  }
  return resultJsonObject;
};
class Request{
  query(obj){
    var time = this.TimeFormat("rf");
    var CryptoJS = require("crypto-js");
    var params = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(mergeJsonObject(data,obj.data))));
    // console.log(obj)
    var objData = {
        method:obj.method,
        params: params,
        app_key: app_key,
        timestamp: time,
        sign: md5.hexMD5(params+app_key+app_secret+time+obj.method)
    }
    axios({
        method: 'POST',
        url: url,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:qs.stringify(objData)
    }).then(function(res){
        // console.log(res.data)
        obj.success(res);
    }).catch(function(res){
        obj.error(res);
    })
  }

  //time-时间戳
  TimeFormat (id) {
    //y=年;ymd=年月日;ymdhm年月日时分;ymdhms年月日时分秒
    var datetime = new Date();
    //datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
    var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
    if (id == 'y') {
      return year;
    } else if (id == 'ym') {
      return year + '-' + month;
    } else if (id == 'ymd') {
      return year + '-' + month + '-' + date;
    } else if (id == 'ymd2') {
      return year + '年' + month + '月' + date + '日';
    } else if (id == 'ymdhm') {
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    } else if (id == 'ymdhms') {
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    } else if (id == 'ymdhms2') {
      return year + '-' + month + '-' + date + '-' + hour + '-' + minute + '-' + second;
    } else if (id == 'mdhms') {
      return month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    } else if (id == 'md') {
      return month + '-' + date;
    } else if (id == 'hm') {
      return hour + ':' + minute;
    } else if (id == 'xs') {
      return hour + ':' + hour;
    } else if (id == 'md2') {
      return month2 + '月' + date2 + '日';
    } else if (!id) {
      return year + '-' + month + '-' + date;
    } else if (id == 'mdhm') {
      return month + '-' + date + ' ' + hour + ':' + minute;
    } else if (id == 'md3') {
      //仿微信
      return '<span>' + month2 + '  </span><span style=\'font-size:.7em;\'>' + date2 + '日</span>';
    } else if (id == 'rf') {
      return year + month + date + hour + minute + second;
    }
  }

  //检测字段是否为空
  isEmpty (data) {
    if (data == '' || data == null || data == undefined || data == 'undefined' || data == 0 || data == '0') {
      return true;
    } else {
      return false;
    }
  }



}

export default new Request();

