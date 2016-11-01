package com.ezhuanbing.api.tools;

public enum UsageEnum {
	KF(0,"口服"),  
	JMZS(1,"静脉注射"),
	JRZS(2,"肌肉注射"),
	PXZS(3,"皮下注射"),
	FQZS(4,"腹腔注射"),
	WY(5,"外用"),
	XR(6,"吸入"),
	GW(7,"灌胃"),
	GC(8,"灌肠"),
	FQ(9,"饭前"),
	FH(10,"饭后"),
	AM(11,"上午"),
	PM(12,"下午"),
	MC(13,"每晨"),
	MW(14,"每晚"),
	SQ(15,"睡前"),
	NEED(16,"需要时"),
	NECESSARY(17,"必要时"),
	IMMEDIATELY(18,"立即");

	private final int key;
	private final String value;
	UsageEnum(int code,String name) {
		this.key = code;
		this.value = name;
	}
	public int getKey() {
		return key;
	}
	public String getValue() {
		return value;
	}
}
