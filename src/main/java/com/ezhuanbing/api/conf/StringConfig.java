package com.ezhuanbing.api.conf;

public class StringConfig {
  
	// 客服电话
	public static final String CallCenterPhoneNum = "4008883918";
	
    public class PushMessage{
      // 首次随访
      public static final String SF_FIRST_FOLLOWUP_TEXT = "尊敬的患者，你好！请将你的首诊信息提交给我，便于我更好的了解您的病情。";
      // 首次随访（医生发送信息）
      public static final String SF_FIRST_FOLLOWUP_REMIND_TEXT = "尊敬的患者，你好！由于你上传的图片不是很清晰，请重新上传一下，谢谢！";
      // 发送随访表(自动任务发送、付费提醒)
      public static final String SF_FOLLOWUP_FEE_TEXT = "尊敬的患者，你好！你有一个随访计划需要进行付费操作，请及时处理。";
      // 发送随访表(发送随访表提醒)
      public static final String SF_FOLLOWUP_REMIND_TEXT = "尊敬的患者，你好！由于长时间未提交你的随访表%s，为了能及时给你做出诊断请及时上传。";//%s detail中的planMark
      // 付费成功提醒
      public static final String SF_FOLLOWUP_FEE_SUCCESS_TEXT = "尊敬的患者，你好！你的付费操作已经成功，请尽快填写随访表单。";
      // 发送附加随访表
      public static final String SF_FOLLOWUP_ACCESSORY_TEXT = "尊敬的患者，你好！请填写我补充的检查项目，完成后及时提交给我。";
      
      public static final String SF_FOLLOWUP_COMMIT_TEXT = "尊敬的患者，你好！你的随访表已提交，如有问题可以直接和医生进行沟通。";
      // 随访结束提醒
      public static final String SF_FOLLOWUP_FINISH_TEXT = "尊敬的患者，你好！随访表已提交，如有什么问题可以点击咨询给我留言，我会在第一时间和你联系。";
      // 宣教资料发送提醒
      public static final String SF_EDUCATION_FILE_REMIND_TEXT = "尊敬的患者，你好！你有一条新的宣教资料，请查看。资料名称%s";
    }
    
    public class PushTitle{
      // 首次随访
      public static final String SF_FIRST_FOLLOWUP_TITLE = "随访信息";
      // 首次随访（医生发送信息）
      public static final String SF_FIRST_FOLLOWUP_REMIND_TITLE = "随访信息";
      // 发送随访表(自动任务发送、付费提醒)
      public static final String SF_FOLLOWUP_FEE_TITLE = "随访信息";
      // 发送随访表(发送随访表提醒)
      public static final String SF_FOLLOWUP_REMIND_TITLE = "随访信息";
      // 付费成功提醒
      public static final String SF_FOLLOWUP_FEE_SUCCESS_TITLE = "随访信息";
      // 发送附加随访表
      public static final String SF_FOLLOWUP_ACCESSORY_TITLE = "随访信息";
      // 随访结束提醒
      public static final String SF_FOLLOWUP_FINISH_TITLE = "随访信息";
      // 宣教资料发送提醒
      public static final String SF_EDUCATION_FILE_REMIND_TITLE = "宣教资料";
    }
}
