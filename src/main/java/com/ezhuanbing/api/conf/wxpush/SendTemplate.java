package com.ezhuanbing.api.conf.wxpush;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import com.ezhuanbing.api.conf.WXPushConfig;


@Component
public class SendTemplate {

	public SendTemplate() {
	}
	
	public void sendWx(String openId , String templateId, List<String> dates,HttpServletRequest request){
		
		if(templateId.equals(WXPushConfig.templateId_Feed_Back) ||
				templateId.equals(WXPushConfig.templateId_Live_Plan) || 
				templateId.equals(WXPushConfig.templateId_Live) || 
				templateId.equals(WXPushConfig.templateId_Initiate_Consultation) ){
			
			Map<String,TemplateData> m = new HashMap<String,TemplateData>();
			TemplateData first = new TemplateData();
			first.setColor("#000000");  
			first.setValue(dates.get(0));  
			m.put("first", first);  
			TemplateData keyword1 = new TemplateData();  
			keyword1.setColor("#000000");  
			keyword1.setValue(dates.get(1));  
			m.put("keyword1", keyword1);
			TemplateData keyword2 = new TemplateData();  
			keyword2.setColor("#000000");  
			keyword2.setValue(dates.get(2));    
			m.put("keyword2", keyword2);
			TemplateData keyword3 = new TemplateData();  
			keyword3.setColor("#000000"); 
			keyword3.setValue(dates.get(3));  
			m.put("keyword3", keyword3);
			TemplateData keyword4 = new TemplateData();  
			keyword4.setColor("#000000"); 
			keyword4.setValue(dates.get(4));  
			m.put("keyword4", keyword4);
			TemplateData remark = new TemplateData();  
			remark.setColor("#000000");  
			remark.setValue(dates.get(5));  
			m.put("remark", remark);
		
			// 发送微信推送
			SendWXMsg wx = new SendWXMsg(request);
			wx.sendOrderMessage(openId, m, templateId);
			
		}
		else if(templateId.equals(WXPushConfig.templateId_Return_Case) ||
				templateId.equals(WXPushConfig.templateId_reset_password)){
			
			Map<String,TemplateData> m = new HashMap<String,TemplateData>();
			TemplateData first = new TemplateData();
			first.setColor("#000000");  
			first.setValue(dates.get(0));  
			m.put("first", first);  
			TemplateData keyword1 = new TemplateData();  
			keyword1.setColor("#000000");  
			keyword1.setValue(dates.get(1));  
			m.put("keyword1", keyword1);
			TemplateData keyword2 = new TemplateData();  
			keyword2.setColor("#000000");  
			keyword2.setValue(dates.get(2));    
			m.put("keyword2", keyword2);
			TemplateData remark = new TemplateData();  
			remark.setColor("#000000");  
			remark.setValue(dates.get(3));  
			m.put("remark", remark);
		
			// 发送微信推送
			SendWXMsg wx = new SendWXMsg(request);
			wx.sendResetPasswordMessage(openId, m, templateId);
			
		}
		else if(templateId.equals(WXPushConfig.templateId_Acceptance_Consultation) || 
				templateId.equals(WXPushConfig.templateId_Refuse_Consultation) ||
				templateId.equals(WXPushConfig.templateId_Consultation) || 
				templateId.equals(WXPushConfig.templateId_Pay_Success) || 
				templateId.equals(WXPushConfig.templateId_Consultation_Settlement) || 
				templateId.equals(WXPushConfig.templateId_Order_Failure) || 
				templateId.equals(WXPushConfig.templateId_Data_Upload)||
				templateId.equals(WXPushConfig.templateId_Approved)){
			
			Map<String,TemplateData> m = new HashMap<String,TemplateData>();
			TemplateData first = new TemplateData();
			first.setColor("#000000");  
			first.setValue(dates.get(0));  
			m.put("first", first);  
			TemplateData keyword1 = new TemplateData();  
			keyword1.setColor("#000000");  
			keyword1.setValue(dates.get(1));  
			m.put("keyword1", keyword1);
			TemplateData keyword2 = new TemplateData();  
			keyword2.setColor("#000000");  
			keyword2.setValue(dates.get(2));    
			m.put("keyword2", keyword2);
			TemplateData keyword3 = new TemplateData();  
			keyword3.setColor("#000000");  
			keyword3.setValue(dates.get(3));    
			m.put("keyword3", keyword3);
			TemplateData remark = new TemplateData();  
			remark.setColor("#000000");  
			remark.setValue(dates.get(4));  
			m.put("remark", remark);
		
			// 发送微信推送
			SendWXMsg wx = new SendWXMsg(request);
			wx.sendOrderMessage(openId, m, templateId);
			
		}
		
	}
	
	public void sendWx(String openId , String templateId, List<String> dates , String payurl, HttpServletRequest request){
		
		if(templateId.equals(WXPushConfig.templateId_Acceptance_Consultation)){
			
			Map<String,TemplateData> m = new HashMap<String,TemplateData>();
			TemplateData first = new TemplateData();
			first.setColor("#000000");  
			first.setValue(dates.get(0));  
			m.put("first", first);  
			TemplateData keyword1 = new TemplateData();  
			keyword1.setColor("#000000");  
			keyword1.setValue(dates.get(1));  
			m.put("keyword1", keyword1);
			TemplateData keyword2 = new TemplateData();  
			keyword2.setColor("#000000");  
			keyword2.setValue(dates.get(2));    
			m.put("keyword2", keyword2);
			TemplateData keyword3 = new TemplateData();  
			keyword3.setColor("#000000");  
			keyword3.setValue(dates.get(3));    
			m.put("keyword3", keyword3);
			TemplateData remark = new TemplateData();  
			remark.setColor("#000000");  
			remark.setValue(dates.get(4));  
			m.put("remark", remark);
			// 发送微信推送
			SendWXMsg wx = new SendWXMsg(request);
			wx.sendPayUrl(openId, m, templateId, payurl);
		}
		
	}
	
	
}
