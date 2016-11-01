package com.ezhuanbing.api.wechat.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ezhuanbing.api.wechat.pojo.menu.Button;
import com.ezhuanbing.api.wechat.pojo.menu.ComplexButton;
import com.ezhuanbing.api.wechat.pojo.menu.Menu;
import com.ezhuanbing.api.wechat.pojo.menu.ViewButton;
 
public class MenuManager {
	private static Logger log = LoggerFactory.getLogger(MenuManager.class);

	
	//static String baseUrl = "http://zhongying.duapp.com/ehuizhen_weixin/";
	static String baseUrl = "http://fmj98.free.natapp.cc/ezb-wx/";
	
	//static String baseUrl = "http://testclinic.zhongyinginfo.com/ezb-wx/";
	
	
	private static Menu getMenu() { 
		ViewButton btn11 = new ViewButton();
		btn11.setName("医生列表");
		btn11.setType("view");
	    btn11.setUrl(baseUrl+"doctor/doctorsPage");
		//btn11.setUrl(baseUrl+"patient/signUpPage");

		ViewButton btn12 = new ViewButton();
		btn12.setName("医生绑定");
		btn12.setType("view");
		btn12.setUrl(baseUrl+"doctor/signInPage");

		ViewButton btn13 = new ViewButton();//换到第一个
		btn13.setName("精彩病历");
		btn13.setType("view");
		btn13.setUrl(baseUrl+"doctor/casehistoryPage");

		ViewButton btn21 = new ViewButton();//weixin_test%20//doctor/doctorPage
		btn21.setName("患者注册");
		btn21.setType("view");
		//btn21.setUrl("http://zhongying.duapp.com/weixin_test%20/patient/signUpPage");
		btn21.setUrl(baseUrl+"patient/signUpPage");

/*ViewButton btn22 = new ViewButton();
btn22.setName("患者登录");
btn22.setType("view");
//btn22.setUrl("http://zhongying.duapp.com/weixin_test%20/patient/signInPage");
btn22.setUrl(baseUrl+"patient/signInPage");
*/
		ViewButton btn22 = new ViewButton();
		btn22.setName("患者绑定");
		btn22.setType("view");
		//btn22.setUrl("http://zhongying.duapp.com/weixin_test%20/patient/signInPage");
		btn22.setUrl(baseUrl+"patient/wxBindPage");
		
		ViewButton btn23 = new ViewButton();
		btn23.setName("我的会诊");
		btn23.setType("view");
		//btn23.setUrl(baseUrl+"sms/smsPage");
		btn23.setUrl(baseUrl+"patient/myConsultationPage");

		ViewButton btn24 = new ViewButton();
		btn24.setName("医生列表");
		btn24.setType("view");
		btn24.setUrl(baseUrl+"doctor/doctorsPage");

	/*	ViewButton btn25 = new ViewButton();
		btn25.setName("苏宁易购");
		btn25.setType("view");
		btn25.setUrl("http://m.suning.com");*/

		
		ComplexButton mainBtn1 = new ComplexButton();
		mainBtn1.setName("医生");
		//mainBtn1.setSub_button(new Button[] { btn11, btn12, btn13 });//
		mainBtn1.setSub_button(new Button[] {btn11, btn12});//精彩病历btn13换到第1个  去掉btn13,

		ComplexButton mainBtn2 = new ComplexButton();
		mainBtn2.setName("患者");
		//mainBtn2.setSub_button(new Button[] { btn21, btn22, btn23, btn24 });//
		//mainBtn2.setSub_button(new Button[] { btn24, btn21, btn22, btn23 });//
		mainBtn2.setSub_button(new Button[] { btn24, btn21, btn22,btn23 });//暂时去掉会诊消息

		ComplexButton mainBtn3 = new ComplexButton();
		mainBtn3.setName("e会诊");
		ViewButton btn31 = new ViewButton();
		btn31.setName("APP下载");
		btn31.setType("view");
		btn31.setUrl("http://update.zhongyinginfo.com/d.aspx");

		ViewButton btn32 = new ViewButton();
		btn32.setName("软件介绍");
		btn32.setType("view");
		btn32.setUrl("http://mp.weixin.qq.com/s?__biz=MzA3MzAwMjk1MQ==&mid=401488552&idx=1&sn=5ef79b89970e5361e72b68b78a23fb5d&scene=18#wechat_redirect");
		
		ViewButton btn33 = new ViewButton();
		btn33.setName("西安众盈");
		btn33.setType("view");
		btn33.setUrl("http://mp.weixin.qq.com/s?__biz=MzA3MzAwMjk1MQ==&mid=208924702&idx=1&sn=f20d924b12e5df94ae25efae2db82844&scene=18#wechat_redirect");
		
		ViewButton btn34 = new ViewButton();
		btn34.setName("联系我们");
		btn34.setType("view");
					
		//btn34.setUrl("http://mp.weixin.qq.com/s?__biz=MzA3MzAwMjk1MQ==&mid=208924791&idx=1&sn=d05659d2f88b0229b509765265ab92b6&scene=18#wechat_redirect");
		btn34.setUrl("http://mp.weixin.qq.com/s?__biz=MzAxNzMxNzkxOA==&mid=206287511&idx=1&sn=dda4e8d862afa1de6f2aaa9fd731bcc8#rd");

		mainBtn3.setSub_button(new Button[] { btn31, btn32,btn33,btn34 });

		Menu menu = new Menu();
	//	menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });
		
		
		ViewButton bt1 = new ViewButton();
		bt1.setName("医生列表");
		bt1.setType("view");
		bt1.setUrl(baseUrl+"doctor/doctorsPage");
        
        ViewButton bt2 = new ViewButton();
        bt2.setName("产品介绍");
        bt2.setType("view");
        bt2.setUrl("http://www.baidu.com");
        
        ViewButton bt3 = new ViewButton();
        bt3.setName("app下载");
        bt3.setType("view");
        bt3.setUrl("http://update.zhongyinginfo.com:8081");
        
		menu.setButton(new Button[] { bt1, bt2, bt3 });

		return menu;
	}
/*
	public static void main(String[] args) {
		
		//String appId = "wx668fa96ff405b60a";//ehuizhen_weixin  Token(令牌) zy668fa96ff405b60a   可以都改为 weixinCourse
		//String appSecret  = "56d8f2d18313f8c05b5e27ee9e26530f";
		
		//String appId = "wx50755e9abe9fff28"; //我的新测试公众号
		//String appSecret = "126bc11043f0d717c950b569babff065";
		
	    //ejiayi
	    //
	  
	    String appId ="wx2d4b3f503fc6e372";
	    String appSecret = "b527f1dbec5cfdd3f2c8d911c4a78fbb";

		
		//String appId = "wx1c13133fe10bb6e0"; //郑琪测试公众号
		//String appSecret = "fbd02f0a774e029ecda1ce945d399695";

		Token token = CommonUtil.getToken(appId, appSecret);

		if (null != token) {
			boolean result = MenuUtil.createMenu(getMenu(), token.getAccessToken());

			if (result)
				//log.info("菜单创建成功｡");
			  System.out.println("菜单创建成功｡");
			else
			  System.out.println("菜单创建失败｡");
				//log.info("菜单创建失败｡");
		}
		
		//System.out.println(CommonUtil.urlEncodeUTF8("http://wangkai.duapp.com/weixin_test/auth"));
	}
	
*/
}
