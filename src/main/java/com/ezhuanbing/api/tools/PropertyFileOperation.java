package com.ezhuanbing.api.tools;

public class PropertyFileOperation {

	public static String getPropertyByName(String path, String name) {
		String result = "";
		try {
			result = java.util.ResourceBundle.getBundle(path).getString(name);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("文件读取失败！");
		}
		return result;
	}
	
//	public static void main(String[] args) {
//		System.out.println(getPropertyByName("pushtype","push.type.200"));
//	}
}