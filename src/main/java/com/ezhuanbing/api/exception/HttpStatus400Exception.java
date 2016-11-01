package com.ezhuanbing.api.exception;

public class HttpStatus400Exception extends Exception{

	private static final long serialVersionUID = 1L;
	private ErrorMessage errorMessage;
	
	public HttpStatus400Exception(){}
	
	public HttpStatus400Exception(String messageTitle,String errorCode,
			String errorMessage,String errorDocument){
		this.errorMessage = new ErrorMessage(messageTitle, errorCode, 
				errorMessage, errorDocument);
	}

	public ErrorMessage getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(ErrorMessage errorMessage) {
		this.errorMessage = errorMessage;
	}
	
	public ExceptionResponse getExceptionResponse(String status){
		return new ExceptionResponse(errorMessage, status);
	}
}
