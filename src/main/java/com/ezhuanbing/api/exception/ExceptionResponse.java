package com.ezhuanbing.api.exception;

public class ExceptionResponse {
	
    private String status;
	private String message;
	private ErrorInfo error = new ErrorInfo();
	
	public ExceptionResponse(ErrorMessage errorInfo, String status){
		
	    this.status = status;
		this.message = errorInfo.getMessageTitle();
		this.error.setCode(errorInfo.getErrorCode());
		this.error.setMessage(errorInfo.getErrorMessage());
		this.error.setDocument(errorInfo.getErrorDocument());
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ErrorInfo getError() {
		return error;
	}

	public void setError(ErrorInfo error) {
		this.error = error;
	}

    public String getStatus() {
      return status;
    }
  
    public void setStatus(String status) {
      this.status = status;
    }
}

class ErrorInfo{

	private String code;
	private String message;
	private String document;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDocument() {
		return document;
	}
	public void setDocument(String document) {
		this.document = document;
	}
}
