package com.ezhuanbing.api.tools;

import java.util.Calendar;
import java.util.Date;

import com.ezhuanbing.api.conf.ConstantConfig;


public class PushCheck {

	/**
	 * 判断当前是不是发送短信的时间
	 * 
	 * @return 可以发送返回True
	 */
	public static boolean isSmsTime() {
		// 如果配置时间大于24，可以推送
		if (ConstantConfig.smsStartTime >= 24 || ConstantConfig.smsEndTime >= 24) {
			return true;
		}
		// 如果开始时间大于等于结束时间，可以推送
		if (ConstantConfig.smsStartTime >= ConstantConfig.smsEndTime) {
			return true;
		}

		Date sendTime = new Date();

		Calendar startDate = Calendar.getInstance();
		startDate.set(Calendar.HOUR_OF_DAY, ConstantConfig.smsStartTime);
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.MILLISECOND, 0);
		Date start = startDate.getTime();

		Calendar endDate = Calendar.getInstance();
		endDate.set(Calendar.HOUR_OF_DAY, ConstantConfig.smsEndTime);
		endDate.set(Calendar.MINUTE, 0);
		endDate.set(Calendar.SECOND, 0);
		endDate.set(Calendar.MILLISECOND, 0);
		Date end = endDate.getTime();

		return (sendTime.before(end) && sendTime.after(start));
	}

	/**
	 * 判断当前是不是发送推送的时间
	 * 
	 * @return 可以发送返回True
	 */
	public static boolean isPushTime() {
		// 如果配置时间大于24，可以推送
		if (ConstantConfig.pushStartTime >= 24 || ConstantConfig.pushEndTime >= 24) {
			return true;
		}
		// 如果开始时间大于等于结束时间，可以推送
		if (ConstantConfig.pushStartTime >= ConstantConfig.pushEndTime) {
			return true;
		}

		Date sendTime = new Date();

		Calendar startDate = Calendar.getInstance();
		startDate.set(Calendar.HOUR_OF_DAY, ConstantConfig.pushStartTime);
		startDate.set(Calendar.MINUTE, 0);
		startDate.set(Calendar.SECOND, 0);
		startDate.set(Calendar.MILLISECOND, 0);
		Date start = startDate.getTime();

		Calendar endDate = Calendar.getInstance();
		endDate.set(Calendar.HOUR_OF_DAY, ConstantConfig.pushEndTime);
		endDate.set(Calendar.MINUTE, 0);
		endDate.set(Calendar.SECOND, 0);
		endDate.set(Calendar.MILLISECOND, 0);
		Date end = endDate.getTime();

		return (sendTime.before(end) && sendTime.after(start));
	}
}
