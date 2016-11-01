package com.ezhuanbing.api;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by wangwl on 2016/8/2.
 */
@Aspect
@Component
public class LogAspect {

  private Logger logger = Logger.getLogger(getClass());

  ThreadLocal<Long> startTime = new ThreadLocal<>();

  @Pointcut("execution(* com.ezhuanbing.api.controller.*Controller.*(..))")
  public void apiLog() {
  }

  @Before("apiLog()")
  public void doBefore(JoinPoint joinPoint) throws Throwable {
    startTime.set(System.currentTimeMillis());

    ServletRequestAttributes attributes =
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    HttpServletRequest request = attributes.getRequest();

    logger.info(startTime.get() + " -- START TIME : " + System.currentTimeMillis());
    logger.info(startTime.get() + " -- URL : " + request.getRequestURL().toString());
    logger.info(startTime.get() + " -- HTTP_METHOD : " + request.getMethod());
    logger.info(startTime.get() + " -- IP : " + request.getRemoteAddr());
    logger.info(startTime.get() + " -- CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName()
            + "." + joinPoint.getSignature().getName());
    logger.info(startTime.get() + " -- ARGS : " + Arrays.toString(joinPoint.getArgs()));
  }

  @AfterReturning(returning = "result", pointcut = "apiLog()")
  public void doAfterReturning(Object result) throws Throwable {
    logger.info(startTime.get() + " -- RESPONSE : " + (result == null ? "" : result.toString()));
    logger.info(startTime.get() + " -- SPEND TIME : " + (System.currentTimeMillis() - startTime.get()));
    startTime.remove();
  }

  @AfterThrowing(throwing = "e", pointcut = "apiLog()")
  public void doRecoveryActions(Throwable e) {
    logger.info(startTime.get() + " -- THROWABLE : " + e.getMessage());
    logger.info(startTime.get() + " -- SPEND TIME : " + (System.currentTimeMillis() - startTime.get()));
    startTime.remove();
  }
}

