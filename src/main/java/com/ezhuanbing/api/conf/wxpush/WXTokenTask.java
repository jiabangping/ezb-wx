package com.ezhuanbing.api.conf.wxpush;


import com.ezhuanbing.api.conf.WXPushConfig;
import com.ezhuanbing.api.conf.wxpush.WeixinUtil;

public class WXTokenTask {

	private static String WXToken; 
	
	public void getToken(){
		
		String	token = WeixinUtil.getAccessToken(WXPushConfig.appID, WXPushConfig.appsecret).getToken();
		setWXToken(token);
		//System.out.println("1");
		//System.out.println(WXToken);
	}

	public String getWXToken() {
		if(WXToken == null) {
			getToken();
			return WXToken;
		}
		return WXToken;
	}

	public static void setWXToken(String wXToken) {
		WXToken = wXToken;
	}
	
	private static WXTokenTask instance = new WXTokenTask();
	public static WXTokenTask getInstance() {
		return instance;
	}
	
}
