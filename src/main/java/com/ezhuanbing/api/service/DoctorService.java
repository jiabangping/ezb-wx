package com.ezhuanbing.api.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ezhuanbing.api.wechat.config.JsonConst;
import com.ezhuanbing.api.wechat.config.ServerConfigConst;
import com.ezhuanbing.api.wechat.config.WeixinBasicKit;

@Service
public class DoctorService {
  private static final Logger log = LoggerFactory.getLogger(DoctorService.class);

  public JSONObject getInitData() throws Exception {

    String strResult = "";
    // String url = ServerConfigConst.baseApiUrl+"api/v1/init_v2";
    String url = ServerConfigConst.baseApiUrl + ServerConfigConst.doctorInitDataUrl;

    strResult = WeixinBasicKit.sendGet(url);

    if (null != strResult && !strResult.isEmpty()) {
      strResult = strResult.replaceAll("null", "\"\"");
      JSONObject jsonResult = JSONObject.fromObject(strResult);
      if (jsonResult != null) {
        jsonResult.put(JsonConst.result, JsonConst.success);
        return jsonResult;
      } else {
        JSONObject result = new JSONObject();
        result.put(JsonConst.result, JsonConst.fail);
        return result;
      }

    }
    JSONObject result = new JSONObject();
    result.put(JsonConst.result, JsonConst.fail);
    return result;
  }


  public JSONObject getHospitalsByCity(int cityId) throws Exception {

    String strResult = "";
    // String url = ServerConfigConst.baseApiUrl+"api/v1/init_v2";
    String url = ServerConfigConst.baseApiUrl + ServerConfigConst.getHospitalsByCityUrl;
    url = url.replace(ServerConfigConst.CITYID, String.valueOf(cityId));

    strResult = WeixinBasicKit.sendGet(url);

    if (null != strResult && !strResult.isEmpty()) {
      strResult = strResult.replaceAll("null", "\"\"");
      JSONArray arr = JSONArray.fromObject(strResult);
      if (arr != null) {
        String pre = "{\"result\": \"success\",\"data\":";
        String result = pre + arr.toString() + "}";
        return JSONObject.fromObject(result);
      } else {
        JSONObject result = new JSONObject();
        result.put(JsonConst.result, JsonConst.fail);
        return result;
      }


    }
    JSONObject result = new JSONObject();
    result.put(JsonConst.result, JsonConst.fail);
    return result;
  }



  public JSONObject getDoctors(int regionId, int hospitalId, int departmentId, int currentPage) {
    String strResult = "";
    String url = "";
    if (hospitalId != -1) {// 选了医院,根据医院Id+科室Id查
      url = ServerConfigConst.baseApiUrl + ServerConfigConst.queryByHospitalIdAndDepartmentIdUrl;
      url = url.replace(ServerConfigConst.HOSPITALID, String.valueOf(hospitalId));
      url = url.replace(ServerConfigConst.DEPARTMENTID, String.valueOf(departmentId));
      url = url.replace(ServerConfigConst.CURRENTPAGE, String.valueOf(currentPage));
    } else {// 根据区域Id+科室Id查询
      url = ServerConfigConst.baseApiUrl + ServerConfigConst.queryByRegionIDAndDepartmentIdUrl;
      url = url.replace(ServerConfigConst.REGIONID, String.valueOf(regionId));
      url = url.replace(ServerConfigConst.DEPARTMENTID, String.valueOf(departmentId));
      url = url.replace(ServerConfigConst.CURRENTPAGE, String.valueOf(currentPage));
    }
    try {
      strResult = WeixinBasicKit.sendGet(url);
    } catch (Exception e) {
      log.error(e.getMessage(), e);
    }

    if (null != strResult && !strResult.isEmpty()) {
      strResult = strResult.replaceAll("null", "\"\"");
      JSONArray arr = JSONArray.fromObject(strResult);
      if (arr != null) {
        String pre = "{\"result\": \"success\",\"data\":";
        String result = pre + arr.toString() + "}";
        return JSONObject.fromObject(result);
      } else {
        JSONObject result = new JSONObject();
        result.put(JsonConst.result, JsonConst.fail);
        return result;
      }

    }
    JSONObject result = new JSONObject();
    result.put(JsonConst.result, JsonConst.fail);
    return result;
  }
  
  public JSONObject getDoctorDetail(int doctorId) throws Exception {
    
    String strResult = "";
    String url = ServerConfigConst.baseApiUrl+ServerConfigConst.getDoctorDetailByIdUrl;
    url = url.replace(ServerConfigConst.DOCTORID, String.valueOf(doctorId));
    
    strResult = WeixinBasicKit.sendGet(url);

    if(null != strResult && !strResult.isEmpty()) {
        strResult = strResult.replaceAll("null", "\"\"");
        JSONObject jsonResult = JSONObject.fromObject(strResult);
        if(jsonResult != null) {
            jsonResult.put(JsonConst.result, JsonConst.success);
            return jsonResult;
        }
    }
    return null;
}

}
