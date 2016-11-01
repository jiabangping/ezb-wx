package com.ezhuanbing.api.wechat.config;

import java.io.IOException;
import java.nio.charset.UnsupportedCharsetException;

import net.sf.json.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WeixinBasicKit {
	private static final Logger log = LoggerFactory.getLogger(WeixinBasicKit.class);
	public static void setWeixinContext() {
	
	}
	
	public static String replaceAccessTokenUrl(String url) {
		//return url.replace("ACCESS_TOKEN", WeixinContext.accessToken.getAccess_token());
		return url.replace("ACCESS_TOKEN", WeixinContext.accessToken.getAccessToken());
	}
	
	public static String sendGetStatus(String url) throws Exception {
      HttpGet get = null;
      CloseableHttpResponse resp = null;
      CloseableHttpClient client = null;
      try {
          client = HttpClients.createDefault();
          get = new HttpGet(url);
          resp = client.execute(get);
          int statusCode = resp.getStatusLine().getStatusCode();
          return String.valueOf(statusCode);
          //if(statusCode == 200) {
          //  return String.valueOf(statusCode);
          //}
          
          //HttpEntity entity = resp.getEntity();
          //String content = EntityUtils.toString(entity,"utf-8");
          //return content;
          
      } catch (Exception e) {
          throw e;
      } finally {
          try {
              if(resp!=null) resp.close();
              if(client!=null) client.close();
          } catch (IOException e) {
              log.error(e.getMessage(),e);
              throw e;
          }
      }
  }
	
	
	public static String sendGet(String url) throws Exception {
		HttpGet get = null;
		CloseableHttpResponse resp = null;
		CloseableHttpClient client = null;
		try {
			client = HttpClients.createDefault();
			get = new HttpGet(url);
			resp = client.execute(get);
			int statusCode = resp.getStatusLine().getStatusCode();
			if(statusCode>=200&&statusCode<300) {
				HttpEntity entity = resp.getEntity();
				String content = EntityUtils.toString(entity,"utf-8");
				return content;
			}
		} catch (Exception e) {
//			log.error(e.getMessage(),e);
			throw e;
		} finally {
			try {
				if(resp!=null) resp.close();
				if(client!=null) client.close();
			} catch (IOException e) {
				log.error(e.getMessage(),e);
				throw e;
			}
		}
		return null;
	}
	
	public static String sendGetWithAuthoriz(String url,String Authorization) throws Exception {
		HttpGet get = null;
		CloseableHttpResponse resp = null;
		CloseableHttpClient client = null;
		try {
			client = HttpClients.createDefault();
			get = new HttpGet(url);
			get.setHeader("Authorization", Authorization);//"83F9B8E0-5CC5-4F67-B627-89CAA8994D8C"
			resp = client.execute(get);
			int statusCode = resp.getStatusLine().getStatusCode();
			if(statusCode>=200&&statusCode<300) {
				HttpEntity entity = resp.getEntity();
				String content = EntityUtils.toString(entity,"utf-8");
				return content;
			}else {
				return "418";
			}
		} catch (Exception e) {
//			log.error(e.getMessage(),e);
			throw e;
		} finally {
			try {
				if(resp!=null) resp.close();
				if(client!=null) client.close();
			} catch (IOException e) {
				log.error(e.getMessage(),e);
				throw e;
			}
		}
	}
	
	public static String sendJsonPost(String url,String content) {
		return sendPost(url, content, "application/json");
	}
	
	public static String sendXmlPost(String url,String content) {
		return sendPost(url, content, "application/xml");
	}
	
	public static String sendPost(String url,String content,String type) {
		CloseableHttpClient client = null;
		CloseableHttpResponse resp = null;
		try {
			client = HttpClients.createDefault();
			HttpPost post = new HttpPost(url);
			post.addHeader("Content-type",type);
			StringEntity entity = new StringEntity(content, ContentType.create(type, "UTF-8"));
			post.setEntity(entity);
			resp = client.execute(post);
			String str = EntityUtils.toString(resp.getEntity(),"utf-8");
            System.out.println(str);
			int statusCode = resp.getStatusLine().getStatusCode();
			return String.valueOf(statusCode);
			//if(statusCode>=200&&statusCode<300) {
				//return str;
			//}
		} catch (UnsupportedCharsetException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if(client!=null) client.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			try {
				if(resp!=null) resp.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	
	public static JSONObject sendJsonPostWithStatus(String url,String content) {
      CloseableHttpClient client = null;
      CloseableHttpResponse resp = null;
      try {
          client = HttpClients.createDefault();
          HttpPost post = new HttpPost(url);
          post.addHeader("Content-type","application/json");
          StringEntity entity = new StringEntity(content, ContentType.create("application/json", "UTF-8"));
          post.setEntity(entity);
          resp = client.execute(post);
          String resultStr = EntityUtils.toString(resp.getEntity(),"utf-8");
          JSONObject json = JSONObject.fromObject(resultStr);
          int statusCode = resp.getStatusLine().getStatusCode();
          json.put("status", statusCode);
          return json;
      } catch (UnsupportedCharsetException e) {
          e.printStackTrace();
      } catch (ClientProtocolException e) {
          e.printStackTrace();
      } catch (ParseException e) {
          e.printStackTrace();
      } catch (IOException e) {
          e.printStackTrace();
      } finally {
          try {
              if(client!=null) client.close();
          } catch (IOException e1) {
              e1.printStackTrace();
          }
          try {
              if(resp!=null) resp.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
      return null;
  }
	
	
	public static String queryOpenidByCode(String code)  {
		try {
			String url = WeixinFinalValue.AUTH_GET_OID;
		
			url = url.replace("APPID", WeixinContext.appId)
			   .replace("SECRET",WeixinContext.appSecurt)
			   .replace("CODE", code);
			String json = WeixinBasicKit.sendGet(url);
			String openId = JSONObject.fromObject(json).getString("openid");
			return openId;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		} 
		return null;
	}
	
	 /*public static void main(String[] args) {
	  //  String getVerifyCodeUrl = ServerConfigConst.baseZyssoApiUrl + ServerConfigConst.ssoPatientRegisteVerifyCodeUrl;
	   String getVerifyCodeUrl = "http://192.168.5.101:8080/zysso//sms/api/send/PHONENUM"; 
	    getVerifyCodeUrl = getVerifyCodeUrl.replace("PHONENUM", "13186059398");
	    String status;
      try {
        status = sendGetStatus(getVerifyCodeUrl);
        System.out.println(status);
      } catch (Exception e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
	 
	  }*/
}
