package com.ezhuanbing.api.conf;

import org.springframework.stereotype.Service;

@Service
public class SmsConfig {

	private String user ="xazy";
	private String pass="xazy123";
	private String url="yl.mobsms.net";

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String sendUrl(String phoneNum, String content) {
		return "http://"+url+"/send/gsend.aspx?name="+user+"&pwd="+pass+"&dst="+phoneNum+"&msg="+content;
	}
}
