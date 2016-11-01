package com.ezhuanbing.api.exception;

public class ControllerException extends Exception {

  /**
   * 
   */
  private static final long serialVersionUID = -2731992364133636633L;

  public ControllerException() {
    super();
  }

  public ControllerException(String arg0, Throwable arg1) {
    super(arg0, arg1);
  }

  public ControllerException(String arg0) {
    super(arg0);
  }

  public ControllerException(Throwable arg0) {
    super(arg0);
  }
}
