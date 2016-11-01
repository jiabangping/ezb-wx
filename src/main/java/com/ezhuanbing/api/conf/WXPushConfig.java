package com.ezhuanbing.api.conf;

import org.springframework.stereotype.Component;

@Component
public class WXPushConfig {

	/*
	 * 0:内部测试 1：外部测�? 2：正式服务器
	 * 
	 **/

//	private int wxpushtype;
//	
//	
//	public int getWxpushtype() {
//		return wxpushtype;
//	}
//	
//	public void setWxpushtype(int wxpushtype) {
//		this.wxpushtype = wxpushtype;
//		wxPushConfig();
//	}
	
	
	public WXPushConfig() {
		wxPushConfig();
	}
	
	/*
	 * 微信推�??
	 */
	public static String appID = "";
	public static String appsecret = "";
	/*
	 * 受理会诊提醒
	 */
	public static String templateId_Acceptance_Consultation= "";
	/*
	 * 订单失败通知
	 */
	public static String templateId_Order_Failure = "";
	/*
	 *  反馈提醒
	 */
	public static String  templateId_Feed_Back = "";
	/*
	 *  会诊提醒
	 */
	public static String  templateId_Consultation = "";
	/*
	 *  拒绝会诊提醒
	 */
	public static String  templateId_Refuse_Consultation = "";
	/*
	 *  会诊订单结算通知
	 */
	public static String  templateId_Consultation_Settlement = "";
	/*
	 * �?回病例提�?
	 */
	public static String  templateId_Return_Case = "";
	/*
	 *  订单支付成功通知
	 */
	public static String  templateId_Pay_Success= "";
	/*
	 *  发起会诊提醒
	 */
	public static String  templateId_Initiate_Consultation = "";
	/*
	 *  会诊数据上传成功通知
	 */
	public static String  templateId_Data_Upload = "";
	/*
	 *  直播计划通知
	 */
	public static String  templateId_Live_Plan = "";
	/*
	 *  直播通知
	 */
	public static String  templateId_Live = "";
	
	/**
	 * 重置密码通知
	 */
	public static String templateId_reset_password = "";
	
	/**
	 * 审核 通知 
	 */
	public static String templateId_Approved = "";
	
	private void wxPushConfig() {
		switch (ConstantConfig.pushWx) {
		case 0:
			appID = "wx1c13133fe10bb6e0";
			appsecret = "fbd02f0a774e029ecda1ce945d399695";
			templateId_Acceptance_Consultation= "61cJByeMH0OBKmlBA2OFfazKzVxH5ALc9CqMDB_CxBk";
			templateId_Order_Failure = "Yid3tIpDuvT-VtmFTAqTaEnpU8uye6JYnmyfSixHFCE";
			templateId_Feed_Back = "CjJB8edCKpRTHrUXadf1Y9MbyH2uGF5lrW_Pz9YJP9k";
			templateId_Consultation = "wVqsEBSgal0gSpoHlZltf5AD04ge6VloHDYobXOrU0M";
			templateId_Refuse_Consultation = "drWbPgI3xvO6MR1dFCgmBeP9unzqTFv9PB6H-QGY88w";
			templateId_Consultation_Settlement = "_peJh5OVBgn1B1nD0xsgDUJIW4XC_TN8nnSGPWaLvIo";
			templateId_Return_Case = "7MaJGYfQPQLLBrgGiid--P6HQXs8gpIhfEc7PKLeJy8";
			templateId_Pay_Success= "ZXpzxLSTU86p-ZHZHkVAgEBX9BJvOXOIkjeoVpx09E8";
			templateId_Initiate_Consultation = "UvjNinZrmmuL8MwBK4wwtkzTELs25ZgoNyBs78sueqw";
			templateId_Data_Upload = "DKWc07uHPDPbmBiFvbClhHskaI80UD4SYQBXrsDnzDM";
			break;
		case 1:
//			appID = "wx1c13133fe10bb6e0";
//			appsecret = "fbd02f0a774e029ecda1ce945d399695";
	
//			appID = "wxf069dda67ff8b434";
//			appsecret = "3a4eeb335278b64a8cba2e54e08e83c5";
			
//			appID = "wx50755e9abe9fff28";
//			appsecret = "126bc11043f0d717c950b569babff065";
			
			appID = "wx00e649b5653120c8";
            appsecret = "0dac8b985edd63c27f96345f22428a4d";
			
			templateId_Acceptance_Consultation= "61cJByeMH0OBKmlBA2OFfazKzVxH5ALc9CqMDB_CxBk";
			templateId_Order_Failure = "Yid3tIpDuvT-VtmFTAqTaEnpU8uye6JYnmyfSixHFCE";
			templateId_Feed_Back = "CjJB8edCKpRTHrUXadf1Y9MbyH2uGF5lrW_Pz9YJP9k";
			templateId_Consultation = "wVqsEBSgal0gSpoHlZltf5AD04ge6VloHDYobXOrU0M";
			templateId_Refuse_Consultation = "drWbPgI3xvO6MR1dFCgmBeP9unzqTFv9PB6H-QGY88w";
			templateId_Consultation_Settlement = "_peJh5OVBgn1B1nD0xsgDUJIW4XC_TN8nnSGPWaLvIo";
			templateId_Return_Case = "7MaJGYfQPQLLBrgGiid--P6HQXs8gpIhfEc7PKLeJy8";
			templateId_Pay_Success= "ZXpzxLSTU86p-ZHZHkVAgEBX9BJvOXOIkjeoVpx09E8";
			templateId_Initiate_Consultation = "UvjNinZrmmuL8MwBK4wwtkzTELs25ZgoNyBs78sueqw";
			templateId_Data_Upload = "DKWc07uHPDPbmBiFvbClhHskaI80UD4SYQBXrsDnzDM";
//			templateId_reset_password = "e_4v9nwIKsNxwtuX2ZA4pJNtzdn7nWkmuBbF3oWXdDg";
			
			templateId_reset_password = "WMLf2xuAu3hInv3OpODqw6-A57vibxQDQRHdRpp3mMI";
			
			templateId_Approved = "wKHO4Sbnu9hEIJZRLC7FUtxd3rGI1y95oX1J-vnSZoY";
			break;
		case 2:
			appID = "wx668fa96ff405b60a";//公众号配�?1rd modify
			appsecret = "56d8f2d18313f8c05b5e27ee9e26530f";//公众号配�?2rd modify
			templateId_Acceptance_Consultation= "29vUzBt0lcts_NK-Yaf--DnkIAOHIVgpbvNiKh3TQbU";
			templateId_Order_Failure = "HHdnuigab_Im2WxEP4FI9X1GDp_s6tHcgbzO0v_sXDU";
			templateId_Feed_Back = "PBN-JE5YDMmpA_yefKCj6FTo9lmF2Ld9xmb5lWai9FQ";
			templateId_Consultation = "Z0TdPgmFvlvHTA8Zs49GT7TZa5_IroM3Onlv8fyzRBA";
			templateId_Refuse_Consultation = "gmfTZUt5LhcI6vpCo3GWiuhqgPJUlxvVR880PE8sB1c";
			templateId_Consultation_Settlement = "np5HylDhvfJJDYOSTZpmy43Z83Lyc0n1zHxx0H-7qBA";
			templateId_Return_Case = "nxFLdKzn-yag6vDz09Oa_XmgTlRkQ2coZGQIToXJgrg";
			templateId_Pay_Success= "sqaUJSFB-iRGOmyNu4kA2oSI9CfAItuSFgIap4nULKc";
			templateId_Initiate_Consultation = "x1UNAOQn0gCZuzlOxa9B1Gami3N9IGqMKwfHAN1DUOs";
			templateId_Data_Upload = "zq355a3a4KkHZXBXZQlxkqIhqkAo-s8J9LIBYU3EtsU";
			templateId_reset_password = "-NT0OfGOhHqFVBZ0gxN-YcGmVGrlgxf4Rjo-xm3ttx8";//重置密码 推�?�公众号模板消息 模板id
			templateId_Approved = "JSnuYRmCX1uaTEcYWGxYkimtYYdCTkPZ_JFadaSmfCw";//审核医生 推�?�公众号模板消息 模板id 
			break;
		}
	}
}
