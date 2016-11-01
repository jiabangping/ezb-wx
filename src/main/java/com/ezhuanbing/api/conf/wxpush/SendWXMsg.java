package com.ezhuanbing.api.conf.wxpush;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.sword.wechat4j.WechatSupport;

import com.ezhuanbing.api.conf.ConstantConfig;
import com.ezhuanbing.api.conf.wxpush.WXTokenTask;

import net.sf.json.JSONObject;

public  class  SendWXMsg  extends WechatSupport {
	
	 Logger log = LoggerFactory.getLogger(getClass());

	    public SendWXMsg(HttpServletRequest request) {
	    	super(request);
	    }

		/**
	     * 发送模板消息
	     * appId 公众账号的唯一标识
	     * appSecret 公众账号的密钥
	     * openId 用户标识
	     */
	   	@Async
	    public void sendPayUrl(String openId, Map<String,TemplateData> m, String templateId, String payurl) {
	   		
	   		if (ConstantConfig.pushSwitch == 0) {
	   			log.info("微信发送关闭，不发送");
				return;
			}

	   		String access_token = WXTokenTask.getInstance().getWXToken();
	   		System.out.println(access_token);
	        String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+access_token;
	        WxTemplate temp = new WxTemplate();
	        temp.setUrl(payurl);
	        temp.setTouser(openId);
	        temp.setTopcolor("#000000");
	        temp.setTemplate_id(templateId);
	        temp.setData(m);
	        String jsonString = JSONObject.fromObject(temp).toString();
	        JSONObject jsonObject = WeixinUtil.httpRequest(url, "POST", jsonString);
	        System.out.println(jsonObject);
	        int result = 0;
	        if (jsonObject != null) {  
	             if ( jsonObject.getInt("errcode") != 0 ) {  
	                 result = jsonObject.getInt("errcode");
	                 log.error("错误 errcode:{} errmsg:{}", jsonObject.getInt("errcode"), jsonObject.getString("errmsg"));  
	             }  
	         }
	        log.info("模板消息发送结果："+result);
	    }
	    
	   	@Async
	    public void sendOrderMessage(String openId, Map<String,TemplateData> m, String templateId) {

	   		if (ConstantConfig.pushWx == 0) {
	   			log.info("微信发送关闭，不发送");
				return;
			}

	   		String access_token = WXTokenTask.getInstance().getWXToken();
	        System.out.println(access_token);
	        String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+access_token;
	        WxTemplate temp = new WxTemplate();
	        temp.setTouser(openId);
	        temp.setTopcolor("#000000");
	        temp.setTemplate_id(templateId);
	        temp.setData(m);
	        String jsonString = JSONObject.fromObject(temp).toString();
	        JSONObject jsonObject = WeixinUtil.httpRequest(url, "POST", jsonString);
	        System.out.println(jsonObject);
	        int result = 0;
	        if (jsonObject != null) {  
	             if ( jsonObject.getInt("errcode") != 0 ) {  
	                 result = jsonObject.getInt("errcode");
	                 log.error("错误 errcode:{} errmsg:{}", jsonObject.getInt("errcode"), jsonObject.getString("errmsg"));  
	             }  
	         }
	        log.info("模板消息发送结果："+result);
	    }
	   	
		@Async
	    public void sendResetPasswordMessage(String openId, Map<String,TemplateData> m, String templateId) {

	   		if (ConstantConfig.pushWx == 0) {
	   			log.info("微信发送关闭，不发送");
				return;
			}

	   		String access_token = WXTokenTask.getInstance().getWXToken();
	        System.out.println(access_token);
	        String url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+access_token;
	        WxTemplate temp = new WxTemplate();
	        temp.setTouser(openId);
	        temp.setTopcolor("#000000");
	        temp.setTemplate_id(templateId);
	        temp.setData(m);
	        String jsonString = JSONObject.fromObject(temp).toString();
	        JSONObject jsonObject = WeixinUtil.httpRequest(url, "POST", jsonString);
	        System.out.println(jsonObject);
	        int result = 0;
	        if (jsonObject != null) {  
	             if ( jsonObject.getInt("errcode") != 0 ) {  
	                 result = jsonObject.getInt("errcode");
	                 log.error("错误 errcode:{} errmsg:{}", jsonObject.getInt("errcode"), jsonObject.getString("errmsg"));  
	             }  
	         }
	        log.info("模板消息发送结果："+result);
	    }

		@Override
		protected void click() {
			
		}

		@Override
		protected void location() {
			
		}

		@Override
		protected void locationSelect() {
			
		}

		@Override
		protected void onImage() {
			
		}

		@Override
		protected void onLink() {
			
		}

		@Override
		protected void onLocation() {
			
		}

		@Override
		protected void onText() {
			
		}

		@Override
		protected void onUnknown() {
			
		}

		@Override
		protected void onVideo() {
			
		}

		@Override
		protected void onVoice() {
			
		}

		@Override
		protected void picPhotoOrAlbum() {
			
		}

		@Override
		protected void picSysPhoto() {
			
		}

		@Override
		protected void picWeixin() {
			
		}

		@Override
		protected void scan() {
			
		}

		@Override
		protected void scanCodePush() {
			
		}

		@Override
		protected void scanCodeWaitMsg() {
			
		}

		@Override
		protected void subscribe() {
			
		}

		@Override
		protected void templateMsgCallback() {
			
		}

		@Override
		protected void unSubscribe() {
			
		}

		@Override
		protected void view() {
			
		}
}
