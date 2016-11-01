package com.ezhuanbing.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(HttpStatus400Exception.class)
  @ResponseBody
  public ExceptionResponse handle400Exception(HttpStatus400Exception ex) {
    return ex.getExceptionResponse("400");
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(HttpStatus401Exception.class)
  @ResponseBody
  public ExceptionResponse handle401Exception(HttpStatus401Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"401");
  }

  @ResponseStatus(HttpStatus.FORBIDDEN)
  @ExceptionHandler(HttpStatus403Exception.class)
  @ResponseBody
  public ExceptionResponse handle403Exception(HttpStatus403Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"403");
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(HttpStatus404Exception.class)
  @ResponseBody
  public ExceptionResponse handle404Exception(HttpStatus404Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"404");
  }

  @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
  @ExceptionHandler(HttpStatus405Exception.class)
  @ResponseBody
  public ExceptionResponse handle405Exception(HttpStatus405Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"405");
  }

  @ResponseStatus(HttpStatus.CONFLICT)
  @ExceptionHandler(HttpStatus409Exception.class)
  @ResponseBody
  public ExceptionResponse handle409Exception(HttpStatus409Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"409");
  }

  @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
  @ExceptionHandler(HttpStatus415Exception.class)
  @ResponseBody
  public ExceptionResponse handle415Exception(HttpStatus415Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"415");
  }

  @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
  @ExceptionHandler(HttpStatus429Exception.class)
  @ResponseBody
  public ExceptionResponse handle429Exception(HttpStatus429Exception ex) {
    return new ExceptionResponse(ex.getErrorMessage(),"429");
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(Exception.class)
  @ResponseBody
  public ExceptionResponse handleException(Exception ex) {
    ex.printStackTrace();
    return new ExceptionResponse(new ErrorMessage("服务器未知异常", "", "", ""),"500");
  }
}