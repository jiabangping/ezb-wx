package com.ezhuanbing.api.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientFollowUpPlanDetailResp {
	
	private Integer planDetailId;
	
	private Integer planId;
	
	private String planName;//计划名称
	
	private	Integer planType;//0:普通随访，1:首次随访 
	
	private Integer patientId;
	
	private String patientName;//患者名称
	
	private String patientSex;
	
	private Integer patientAge;
	
	private String sendDate;//发送时间
	
	private Integer followupCount;//随访次数
	
	private Integer payStatus;//付费状态
	
	private Integer planDetailStatus;//计划详情状态 (这里体现了反馈状态)
	
	private String feedbackTime;//反馈时间
	
	private String endDate;//结束时间
	
	private String nextDate;//下次开始时间
	
	private Date generateTime;
	
	private String achiveTime;
	
	private Integer paperId;//问卷id
	
	private String planMark;//随访结果
	
	private Integer isLastRecord;
	
	private String paperTitle;
	
	private Integer overTimeStatus;//NULL:default,1:超时,2:已提醒
}
