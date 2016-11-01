package com.ezhuanbing.api.tools;

public enum UnitEnum {
	BOX(0,"盒"),  
	PCS(1,"支"),
	BOTTLE(2,"香皂"),
	BAG(3,"袋");
	
	private final int key;
	private final String value;
	UnitEnum(int code,String name) {
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
