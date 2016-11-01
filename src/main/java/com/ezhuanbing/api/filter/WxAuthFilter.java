package com.ezhuanbing.api.filter;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ezhuanbing.api.wechat.config.ServerConfigConst;
import com.ezhuanbing.api.wechat.config.WeixinBasicKit;
import com.ezhuanbing.api.wechat.config.WeixinContext;
import com.ezhuanbing.api.wechat.config.WeixinFinalValue;

@Component("wxAuthFilter")
public class WxAuthFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
   doFilter(request, response, filterChain);
    HttpServletRequest hRequest = request;
    String uril = hRequest.getRequestURL().toString();
    System.out.println(uril);
    if(uril.contains("wxBind")) {
      System.out.println();
    }
   // filterChain.doFilter(hRequest, response);
  }

  private void doFilter(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest hRequest = request;
    String uril = hRequest.getRequestURL().toString();
    HttpServletResponse hResponse = response;

    hResponse.setHeader("Cache-Control", "no-cache");
    hResponse.setHeader("Cache-Control", "no-store");
    hResponse.setHeader("Pragma", "no-cache");
    hResponse.setDateHeader("Expires", 0);

    if (uril != null
        && (uril.contains("/doctor/signInPage") || uril.contains("/patient/signUpPage")
            || uril.contains("/patient/wxBindPage") || uril.contains("/doctor/historyOrdersPage")
            || uril.contains("/patient/myConsultationPage") || uril
              .contains("/doctor/getMyInfoPage")  || uril
              .contains("/doctor/detail")

        )) {
      Object oid = hRequest.getSession().getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
      if (oid == null) {
        String agent = hRequest.getHeader("User-Agent");
        if (agent != null && agent.toLowerCase().indexOf("micromessenger") >= 0) {
          String code = request.getParameter("code");
          String state = request.getParameter("state");
          if (code != null && state != null && state.equals("1")) {
            // 通过Code获取openid来进行授权
            String openid = WeixinBasicKit.queryOpenidByCode(code);
            if (openid != null) {
              hRequest.getSession().setAttribute(ServerConfigConst.wxOpenIdSessionAttr, openid);
            }
          } else {
            String path = hRequest.getRequestURL().toString();
            String query = hRequest.getQueryString();
            if (query != null) {
              path = path + "?" + query;
            }
            String uri = WeixinFinalValue.AUTH_URL;
            uri =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";

            uri =
                uri.replace("APPID", WeixinContext.appId)
                    .replace("REDIRECT_URI", URLEncoder.encode(path, "UTF-8"))
                    .replace("SCOPE", "snsapi_base").replace("STATE", "1");
            hResponse.sendRedirect(uri);
            return;
          }
        }
      }
    }
    filterChain.doFilter(hRequest, hResponse);
  }

}
