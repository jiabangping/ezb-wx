package com.ezhuanbing.api.wechat;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sword.wechat4j.WechatSupport;

import com.ezhuanbing.api.wechat.config.WeixinContext;


/**
 * 微信服务桩
 * @author  
 * @date   2015年1月7日
 */
public class MyWechat extends WechatSupport {
    
    private static Logger logger = LoggerFactory.getLogger(MyWechat.class);

    public MyWechat(HttpServletRequest request) {
        
        super(request);
    }

    /**
     * 文本消息
     */
    @Override
    protected void onText() {
    }
    
    /**
     * 点击菜单跳转链接时的事件推送
     */
    @Override
    protected void view() {
        /*String link = super.wechatRequest.getEventKey();
        logger.info("点击菜单跳转链接时的事件推送link:" + link);
        responseText("点击菜单跳转链接时的事件推送link:" + link);*/
    }

    /**
     * 自定义菜单事件
     */
    @Override
    protected void click() {        
    }
    
    /**
     * 图片消息
     */
    @Override
    protected void onImage() {
    }

    /**
     * 语音消息
     */
    @Override
    protected void onVoice() {
    }

    /**
     * 视频消息
     */
    @Override
    protected void onVideo() {
    }
    
    /**
     * 地理位置消息
     */
    @Override
    protected void onLocation() {
    }
    /**
     * 链接消息
     */
    @Override
    protected void onLink() {
    }
    
    
    /**
     * 未知消息类型，错误处理
     */
    @Override
    protected void onUnknown() {
    }

    /**
     * 扫描二维码事件
     */
    @Override
    protected void scan() {
    }

    /**
     * 订阅事件
     */
    @Override
    protected void subscribe() {
      String result = "亲，感谢您关注，快速查找并关注医生，一对一了解您的健康，<a href=\""+WeixinContext.wxDeployBaseUrl+"/doctor/doctorsPage\" >点击这里找医生</a>";
      responseText(result);
    }
    
    /**
     * 取消订阅事件
     */
    @Override
    protected void unSubscribe() {
    }
    
    
    
    /**
     * 上报地理位置事件
     */
    @Override
    protected void location() {
    }
    
    /**
     * 模板消息发送成功推送事件
     */
    @Override
    protected void templateMsgCallback() {
    }
    /**
     * 弹出地理位置选择器的事件
     */
    @Override
    protected void locationSelect() {
    }
    /**
     * 弹出拍照或者相册发图的事件
     */
    @Override
    protected void picPhotoOrAlbum() {
    }
    /**
     * 弹出系统拍照发图的事件
     */
    @Override
    protected void picSysPhoto() {
    }
    /**
     * 弹出微信相册发图器的事件推送
     */
    @Override
    protected void picWeixin() {
    }
    /**
     * 扫码推事件
     * 
     */
    @Override
    protected void scanCodePush() {
    }
    /**
     * 扫码推事件且弹出“消息接收中”提示框的事件
     */
    @Override
    protected void scanCodeWaitMsg() {
    }
     
}
