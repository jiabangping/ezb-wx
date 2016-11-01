package com.ezhuanbing.api.wechat.config;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import com.ezhuanbing.api.tools.VerifyCodeUtils;

//服务配置常量
public class ServerConfigConst {
	public static ScheduledExecutorService threadPool = Executors.newScheduledThreadPool(5);  
	
	public static String baseApiUrl = "http://192.168.5.100:8080/ehuizhen/";
	
	public static final String REGIONID = "REGIONID";//区域Id
	public static final String HOSPITALID = "HOSPITALID";//医院Id
	public static final String DEPARTMENTID = "DEPARTMENTID";//科室Id 科室Id分别与REGIONID/HOSPITALID组合使用
	public static final String CURRENTPAGE = "CURRENTPAGE";
	public static final String CITYID = "CITYID";//cityId
	public static final String DOCTORID = "DOCTORID";//doctorId
	public static final String PHONENUM = "PHONENUM";//phoneNum
	public static final String ORDERID  = "ORDERID";//订单orderId
	
	
	public static String queryByRegionIDAndDepartmentIdUrl = "/api/v1/city/"+REGIONID+"/doctors?departmentId="+DEPARTMENTID+"&currentPage="+CURRENTPAGE;// 根据区域和科室 替换
	public static String queryByHospitalIdAndDepartmentIdUrl = "/api/v1/hospital/"+HOSPITALID+"/doctors?departmentId="+DEPARTMENTID+"&currentPage="+CURRENTPAGE;// 根据区域和科室 替换
	
	/**API 初始化医生列表页面下拉框数据*/
	public static String  doctorInitDataUrl = "/api/v1/init_v2";  
	
	public static String getHospitalsByCityUrl ="/api/v1/city/"+CITYID+"/hospitals";
	
	public static String getDoctorDetailByIdUrl = "/api/v1/doctor/"+DOCTORID;
	
	/**API 精彩病历*/
	public static String  defaultCasehistorylistURL = "/api/v2/department/{DEPARTMENTID}/casehistorylist";
	
	/**患者我的的会诊订单*/
	public static String patientConsultationUrl = "/api/v2/patient/PHONENUM/order";
	
	public static String  patientInfoSessionAttr = "_patientInfo";

	public static String doctorInfoSessionAttr = "_doctorInfo";
	
	public static String  wxOpenIdSessionAttr = "_wxOpenId";
	
	public static String patientVerifyCodeSessionAttr = "_patientVerifyCode";
	
	public static String patientVerifyCodeForResetPasswd = "_patientVerifyCodeForResetPasswd";
	
	public static String doctorVerifyCodeForResetPasswd = "_doctorVerifyCodeForResetPasswd";
	
	public static String doctorVerifyCodeSessionAttr = "_doctorVerifyCode";
	
/*	public static PatientService patientService;
	public static DoctorService doctorService;
*/	
	public static String[] authUrls = {"doctor/doctorPage","sms/smsPage","api/v1/sms/query","doctor/casehistoryPage"};
	
	public static final String resetPatientPasswdTokenSessionAttr = "_resetPatientPasswdTokenSessionAttr";//token
	public static final String resetDoctorPasswdTokenSessionAttr = "_resetDoctorPasswdTokenSessionAttr";//token
	public static String doctorModifyByEmailTokenSessionAttr = "doctorModifyByEmailTokenSessionAttr";
	public static int doctorPasswdModifyByEmailLinkValidPeriod = 720;//720minutes
	public static String payApiUrl = "/api/v1/common/pay/"+ORDERID;
	
	/**医生注册下发邮箱验证文言*/
	public static String DOCTORNAME = "DOCTORNAME";
	public static String doctorRegisteVerifyEmailMsgSubjectTeplate = "e会诊医生注册邮箱验证";
	public static String doctorRegisteVerifyEmailMsgUrlTeplate = "/doctor/"+DOCTORID+"/verifyEmail";
	public static String doctorRegisteVerifyEmailMsgContentTeplate = "尊敬的医生:"+DOCTORNAME+"您好，请点击链接验证您的邮箱完成注册";
			
	/**医生重置密码下发邮箱验证文言*/
	public static String doctorResetPasswdVerifyEmailMsgSubjectTeplate = "医生修改密码";
	public static String TOKEN = "TOKEN";
	public static String doctorResetPasswdVerifyEmailMsgUrlTeplate = "/doctor/overseaAccountResetPasswdPage?token="+TOKEN;
	public static String doctorResetPasswdVerifyEmailMsgContentTeplate = "尊敬的医生:"+DOCTORNAME+"您好，请点击链接完成密码修改";

	public static String emailHost = "smtp.exmail.qq.com";
	public static String emailAccount = "service@zhongyinginfo.com";
	public static String emailPassword = "Service#zhongying0526";
	public static String emailPersonal = "众盈医疗";
	
	public static boolean isWindows() {
		return System.getProperty("os.name").indexOf("Windows") != -1;
	}
	
	public static String staticRsVersion = "1.0";
	public static String getVersion() {
		return VerifyCodeUtils.generateVerifyCode(6,"0123456789");
	}
	
	public static String doctorLoginApiUrl = "/api/v1/doctor/login";
	public static String doctorHistoryordersApiUrl = "/api/v1/doctor/"+DOCTORID+"/historyorders";
	
	
	
	/*public static void main(String[] args) {
		ReplayNums[] arr = ServerConfigConst.ReplayNums.values();
		for(ReplayNums replay : arr) {
			System.out.println(replay.getNumber()+","+ replay.getName());
		}
	}*/
	
	public static enum ReplayNums {
		REGETEMAIL("重新获取激活邮件", 1),
		GREEN("绿色", 2),
		BLANK("白色", 3),
		YELLO("黄色", 4);
		  // 成员变量
		  private String name;
		  private int number;

		  // 构造方法
		  private ReplayNums(String name, int number) {
		      this.name = name;
		      this.number = number;
		  }

		  // 普通方法
		  public static String getName(int number) {
		      for (ReplayNums c : ReplayNums.values()) {
			    if (c.getNumber() == number) {
			        return c.name;
			    }
		      }
		      return null;
		  }

		  public String getName() {
		      return name;
		  }
		  public void setName(String name) {
		      this.name = name;
		  }
		  public int getNumber() {
		      return number;
		  }
		  public void setNumber(int number) {
		      this.number = number;
		  }
	}
	
	

    //专病 - zysso api begin--------------------------
    //转诊base api url
    public static String baseZhuanBingApiUrl;
    
    public static  String checkWxBindUrl;

    public static  String wxAccountBindUrl;
        
    //zysso base api url
    public static  String baseZyssoApiUrl;
    
    public static  String ssoPatientRegisteUrl;
    
    public static String ssoPatientRegisteVerifyCodeUrl;
    
    public static String ssoPatientLoginUrl;
    
    public static String subscribeDoctorUrl;
    
    public static String checkPatientDoctorBindUrl;
    
    //专病 - zysso api end-----------------------
	
}
