package com.ezhuanbing.api.tools;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.enums.EnumUtils;

public class DictionaryEnumUtils extends EnumUtils{
	public static String getTextUnitEnum(int code) {
		String text = "";
		for (UnitEnum e : UnitEnum.values()) {
			if (e.getKey() == code) {
				return e.getValue();
			}
		}
		if (StringUtils.isNotBlank(text)) {
			text = "--";
		}
		return text;
	}
	
	public static Integer getKeyUnitEnum(String value) {
		Integer key = 0;
		for (UnitEnum e : UnitEnum.values()) {
			if (e.getValue() == value) {
				key =  e.getKey();
			}
		}
		return key;
	}
	
	public static String getTextUsageEnum(int code) {
		String text = "";
		for (UsageEnum e : UsageEnum.values()) {
			if (e.getKey() == code) {
				return e.getValue();
			}
		}
		if (StringUtils.isNotBlank(text)) {
			text = "--";
		}
		return text;
	}
	
	public static Integer getKeyUsageEnum(String value) {
		Integer key = 0;
		for (UsageEnum e : UsageEnum.values()) {
			if (e.getValue() == value) {
				key =  e.getKey();
			}
		}
		return key;
	}
}
