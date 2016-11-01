package com.ezhuanbing.api.exception;

public class ServiceException extends Exception {

  /**
   * 
   */
  private static final long serialVersionUID = 1504200200194042709L;

  public ServiceException() {
    super();
  }

  public ServiceException(String arg0, Throwable arg1) {
    super(arg0, arg1);
  }

  public ServiceException(String arg0) {
    super(arg0);
  }

  public ServiceException(Throwable arg0) {
    super(arg0);
  }

}
