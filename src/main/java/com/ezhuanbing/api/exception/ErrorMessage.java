package com.ezhuanbing.api.exception;

public class ErrorMessage {
	
	private String messageTitle;
	private String errorCode;
	private String errorMessage;
	private String errorDocument;
	
	public ErrorMessage(String messageTitle,String errorCode,
			String errorMessage,String errorDocument){
		this.messageTitle = messageTitle;
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.errorDocument = errorDocument;
	}
	
	public String getMessageTitle() {
		return messageTitle;
	}
	public void setMessageTitle(String messageTitle) {
		this.messageTitle = messageTitle;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getErrorDocument() {
		return errorDocument;
	}
	public void setErrorDocument(String errorDocument) {
		this.errorDocument = errorDocument;
	}
}
