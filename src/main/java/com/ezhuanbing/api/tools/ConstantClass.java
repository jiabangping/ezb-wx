package com.ezhuanbing.api.tools;

import org.springframework.stereotype.Component;


@Component
public class ConstantClass {

	/**
	 * 图片上传路径
	 */
	public static String ImagePath = "";
	/**
	 * 图片服务器地址
	 */
	public static String ImageServer = "";

	public static String AUTH_SERVER = "";

	public static String UPDATE_FILE_PATH = "";
	
	public static String UPDATE_SERVER = "";
	public static String realpath = "";
	
	/**
	 * 后台服务器地址
	 */
	public static String BACK_SERVER = "";
	
	/**
	 * 0：未提交
	 */
	public static final char INITIALIZE = '0';
	/**
	 * 1：待审核
	 */
	public static final char WAIT_AUDIT= '1';
	/**
	 * 2：待排班
	 */
	public static final char WAIT_SCHEDULE= '2';
	/**
	 * 3：待讨论
	 */
	public static final char WAIT_DISCUSS= '3';
	/**
	 * 4：讨论中
	 */
	public static final char DISCUSSING= '4';
	
	/**
	 * 5：病历整理中
	 */
	public static final char ARRANGING= '5';
	/**
	 * 6：结束
	 */
	public static final char END= '6';
	/**
	 * 9:  审核拒绝
	 */
	public static final char REFUSED= '9';
	
	/*
	 * 0:内部测试 1：外部测试 2：正式服务器
	 * 
	 **/
	private String configfile = "";

	
	/*
	 * 
	 * 0:关闭推送 1：开启推送
	 */
	public static int pushSwitch;
	
	
	
	/** 
	 * 0:关闭短信 1：开启短信
	 */
	public static int pushSms;
	
	/** 
	 * 0:关闭微信 1：开启微信
	 */
	public static int pushWx;
	
	
	/** 
	 * 短信发送开始时间(当天的某个小时)
	 */
	public static int smsStartTime;
	/** 
	 * 短信发送结束时间(当天的某个小时)
	 */
	public static int smsEndTime;
	/** 
	 * 推送发送开始时间
	 */
	public static int pushStartTime;
	/** 
	 * 推送发送结束时间
	 */
	public static int pushEndTime;
	
	/**
	 * 短信发送重试次数
	 */
	public static final int SMS_RETRY_COUNT = 5;
	
	
	
	
	//========================================开始读取配置文件=================================
//		public ConstantClass() {
//			
//			this.configfile = PropertyFileOperation.getPropertyByName("application", "publish.config.file");
//			initConfig();
//		}
	
	//========================================ftp配置======================================
		public static String ftpIp;
		public static String ftpUser;
		public static String ftpPass;
		public static int ftpPort;

	private void initConfig() {
		
//		UPDATE_FILE_PATH = PropertyFileOperation.getPropertyByName(configfile, "file.UPDATE_FILE_PATH");
//		UPDATE_SERVER = PropertyFileOperation.getPropertyByName(configfile, "file.UPDATE_SERVER");
//		
//		BACK_SERVER = PropertyFileOperation.getPropertyByName(configfile, "common.backserver");
//		AUTH_SERVER = PropertyFileOperation.getPropertyByName(configfile, "common.authserver");
//		ImagePath = PropertyFileOperation.getPropertyByName(configfile, "common.imagepath");
//		ImageServer = PropertyFileOperation.getPropertyByName(configfile, "common.imageserver");
//		// 推送相关
//		pushSwitch = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "pushswitch"));
//		pushSms = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "pushsms"));
//		pushWx = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "pushwx"));
//		smsStartTime = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "smsstarttime"));
//		smsEndTime = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "smsendtime"));
//		pushStartTime = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "pushstarttime"));
//		pushEndTime = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "pushendtime"));
//
//		// ftp配置
//		ftpIp = PropertyFileOperation.getPropertyByName(configfile, "ftp.ip");
//		ftpUser = PropertyFileOperation.getPropertyByName(configfile, "ftp.user");
//		ftpPass = PropertyFileOperation.getPropertyByName(configfile, "ftp.pass");
//		ftpPort = Integer.valueOf(PropertyFileOperation.getPropertyByName(configfile, "ftp.port"));
//		
//		//网易IM
//		NETEASE_APP_KEY = PropertyFileOperation.getPropertyByName(configfile, "im.appkey");
//		NETEASE_APP_SECRET = PropertyFileOperation.getPropertyByName(configfile, "im.appsecret");
		
	}
	// 医生注册信息存放地址
	public static final String RegisterDoctorXML = "\\\\121.42.211.90\\WXInfo";

	// 权限服务器地址
	public static final String AUTHCENTER_APPCODE = "0000000001";

	// 本地缓存目录
	public static final String ImageTmpPath = "upload/img";

	public static int PageSize = 15;

	// 信鸽推送
	public static final String ANDROID_ACCESS_ID = "2100100169";
	public static final String ANDROID_SECRET_KEY = "6900544bb63f7b8d102ac6ab4d7c43f8";
	public static final String IOS_ACCESS_ID = "2200100170";
	
	public static final String IOS_SECRET_KEY = "958cc191952ff48debe8d81927e87ab0";

	/**
	 * 默认图片
	 */
	public static final String DEFAULT_DOCTOR_HEADER = "default.jpg";

	public static final int TOKEN_EXPIRED_TIME = 30;
	
	/**
	 * 默认人群分类的名称
	 */
	public static final String DEFAULT_DOCTOR_GROUP = "一般人群";
	//public static final String TABLE_EHUIZHEN = "ehuizhen_test";

	/* ========================字典表父ID========================= */
	/**
	 * 职称父ID
	 */
	public static int PositionPid = 1;

	/**
	 * 医院等级父ID
	 * 
	 */
	public static int HospitalLevelPid = 31;

	public static int EvaluatePid = 10;
	  
	public static String POST_TEMPLETE = "<!DOCTYPE html><html><head><meta charset='UTF-8'>"
			+ "<meta http-equiv='X-UA-Compatible' content='IE=Edge'><meta http-equiv='pragma' content='no-cache'><meta http-equiv='cache-control' content='no-cache'><meta http-equiv='expires' content='0' /><meta name='keywords' content=''/>"
			+ "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>"
			+ "<style>.title{text-align:left;margin-top:20px;}.title #title{font-size: 1.5em;color: #333333;font-weight: bold;} .title p{font-size: 0.75em;margin-top: 14px;margin-bottom: 14px;color: #505050;}</style></head><body onload='getVisitCount();'><div class='container' style='font-size: 1em;color: #444333;line-height: 1.9em;text-align: justify;text-justify:inter-ideograph;'></div><input type='hidden' id='postId'></body></html>";
	public static String CASE_TEMPLETE = "<!DOCTYPE html><html><head><meta charset='UTF-8'>"
			+ "<meta http-equiv='X-UA-Compatible' content='IE=Edge'><meta http-equiv='pragma' content='no-cache'><meta http-equiv='cache-control' content='no-cache'><meta http-equiv='expires' content='0' />"
			+ "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>"
			+ "<style>.title{text-align:left;margin-top:20px;}.title #title{font-size: 1.5em;color: #333333;font-weight: bold;} .title p{font-size: 0.75em;margin-top: 14px;margin-bottom: 14px;color: #505050;}</style></head><body onload='getVisitCount();'><div class='container' style='font-size: 1em;color: #444333;line-height: 1.9em;text-align: justify;text-justify:inter-ideograph;'></div></body></html>";

	//=========================网易IM==================================================================
	
		/**
		 * IM虚拟账号
		 */
//		public static final String IM_VIRTUAL_ACCOUNT_ID ="000000";
//		public static final String IM_VIRTUAL_ACCOUNT_NAME ="小e广播";

		/**
		 * 网易api请求地址
		 */
		public static String NETEASE_REQUEST_URL = "https://api.netease.im/nimserver";
		/**
		 * 网易验证随机数
		 */
		public static String NETEASE_RANDOM = "12345";
		/**
		 * 网易IM app key
		 */
		public static String NETEASE_APP_KEY = "";
		/**
		 *  网易IM secrect key
		 */
		public static String NETEASE_APP_SECRET = "";

}
