package com.ezhuanbing.api.service;

import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ezhuanbing.api.exception.HttpStatus400Exception;
import com.ezhuanbing.api.tools.FtpUpload;

@Service
public class ImageService {

  private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

  @Autowired
  FtpUpload ftpUpload;
  /**
   * 压缩图片
   * 
   * @param oldimgpath
   * @param newimgpath
   * @param w
   * @param h
   * @param per
   * @return
   */
  private static boolean resize(File org, File dest, int height, int width) {
    boolean bol = false; // 是否进行了压缩
    String pictype = dest.getName();
    pictype = pictype.substring(pictype.lastIndexOf(".") + 1, pictype.length());
    double ratio = 0; // 缩放比例

    BufferedImage bi;
    try {
      bi = ImageIO.read(org);
      Image itemp = bi.getScaledInstance(width, height, BufferedImage.SCALE_SMOOTH);
      float itempWidth = bi.getWidth();
      float itempHeight = bi.getHeight();

      int mac_width = 300;
      if (itempWidth > mac_width) {
        height = (int) (mac_width / (itempWidth / itempHeight));
        width = mac_width;
        ratio = Math.min((new Integer(height)).doubleValue() / itempHeight,
            (new Integer(width)).doubleValue() / itempWidth);
        AffineTransformOp op =
            new AffineTransformOp(AffineTransform.getScaleInstance(ratio, ratio), null);
        itemp = op.filter(bi, null);
        ImageIO.write((BufferedImage) itemp, pictype, dest);
        bol = true;
      } else {
        ImageIO.write((BufferedImage) bi, pictype, dest);
        bol = true;
      }
    } catch (IOException e1) {
      e1.printStackTrace();
    }
    return bol;
  }

//  public static void main(String[] args) {
//    int a = 35;
//    resize(new File("D:\\1.jpg"), new File("D:\\2.jpg"), a * 5, a * 4);
//  }

  private boolean Tosmallerpic(File originFile, File tmpTarFile, String folderPath,
      String tarFileName, int w, int h, float per) {

    logger.info("压缩图片-Service-End");
    try {
      if (resize(originFile, tmpTarFile, w, h)) {
        ftpUpload.fileUpload(tmpTarFile, folderPath, tarFileName);
      }
      return true;
    } catch (Exception ex) {
      ex.printStackTrace();
      logger.info("压缩图片,异常[" + ex.getMessage() + "]");
      return false;
    } finally {
      logger.info("压缩图片-Service-End");
    }
  }

  /**
   * MultipartFile图片文件上传
   * 
   * @param files
   * @param image
   * @throws Exception
   */
//  public void PhotoUpload(String orderId, MultipartFile[] files, ConsultationPhotoItemModel image)
//      throws Exception {
//
//    logger.info("MultipartFile图片文件上传-Service-Strat");
//    logger.info("MultipartFile图片文件上传-Service-getItemType : " + image.getItemType());
//    logger.info("MultipartFile图片文件上传-Service-getPhotoType : " + image.getPhotoType());
//    logger.info("MultipartFile图片文件上传-Service-getPhotoDate : " + image.getPhotoDate());
//    logger.info("MultipartFile图片文件上传-Service-getCallerId : " + image.getCallerId());
//    int i = 0;
//    DictionaryModel dic = dictionaryDao.getDictionaryById(image.getPhotoType());
//    String photoTypePath = dic == null ? "" : dic.getNote();
//    if (photoTypePath == "") {
//      throw new RequestParamException("photo Type id err : " + image.getPhotoType());
//    }
//    logger.info("MultipartFile图片文件上传-Service-photoTypeName : " + photoTypePath);
//
//    if (files.length == 0) {
//      logger.info("MultipartFile图片文件上传-Service-files.length : " + files.length);
//      throw new RequestParamException("files length err : " + files.length);
//    }
//
//    List<ConsultationPhotoItemModel> list =
//        imageDao.isImageList(orderId, image.getItemType(), image.getPhotoType());
//    if (list.size() == 0 || list == null) {
//      i = 0;
//    } else {
//      i = list.size();
//    }
//
//    for (MultipartFile myfile : files) {
//      i++;
//      // 上传图片地址
//      String imgName = orderId + "_" + image.getItemType() + "_" + i + ".jpg";
//      // 缩略图地址
//      String imgvName = orderId + "_" + image.getItemType() + "_v" + i + ".jpg";
//
//      // 上传图片
//      if (!myfile.isEmpty()) {
//
//        logger.info("MultipartFile图片文件上传-Service-fileGetName : " + myfile.getName());
//        // 业务修改，FTP上传
//        FtpUpload ftpUpload = new FtpUpload();
//        ftpUpload.fileUpload(myfile, photoTypePath, imgName);
//        // 将MultipartFile转成File
//        CommonsMultipartFile cf = (CommonsMultipartFile) myfile;
//        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
//        File originFile = fi.getStoreLocation();
//
//        // 上传缩略图
//        String path = request.getSession().getServletContext().getRealPath("/");
//        String basePath = path + "/image/" + imgvName;
//        File tmpTarFile = new File(basePath);
//
//        if (!tmpTarFile.getParentFile().exists())
//          tmpTarFile.getParentFile().mkdirs();
//        int a = 35;
//        if (Tosmallerpic(originFile, tmpTarFile, photoTypePath, imgvName, a * 5, a * 4,
//            (float) 0.7)) {
//          logger.info("压缩图片保存成功");
//        } else {
//          logger.info("压缩图片保存失败");
//        }
//
//        // 上传图片信息数据入库
//        image.setOrderId(orderId);
//        image.setPhotoName(imgName);
//        image.setVphotoName(imgvName);
//        image.setIsDel('0');
//        image.setInDate(new Date());
//        image.setEditDate(new Date());
//        image.setEditUser(image.getInUser());
//        imageDao.PhotoUpload(image);
//      }
//    }
//
//    logger.info("MultipartFile图片文件上传-Service-End");
//  }

  /**
   * 
   * @Title: uploadImage
   * @Description: 上传单张图片
   * @param caseId
   * @param file
   * @return String 文件路径
   * @throws Exception
   * 
   */
  public String uploadPatientHeader(int flagId, MultipartFile file) throws Exception {

    if (file.isEmpty()) {
      logger.error("待上传的文件为空-->" + file.getSize());
      throw new HttpStatus400Exception("图片上传","","待上传图片大小为0，请确认后重新上传","");
    }

    String IMAGE_TYPE = "PatientHeader";
    String imgName = flagId + ".JPG";
    String imgUrl = ftpUpload.fileUpload(file, IMAGE_TYPE, imgName);
    return imgUrl;
  }
  
  /**
   * 
  * @Title: uploadFollowupPlanDetailImage 
  * @Description: 
  * @param @param followupPlanDetailId
  * @param @param file
  * @param @return
  * @param @throws Exception    设定文件 
  * @return String    返回类型 
  * @throws
   */
  public String uploadPaperImage(int paperId, MultipartFile file) throws Exception{
   
    if (file.isEmpty()) {
      logger.error("待上传的文件为空-->" + file.getSize());
      throw new HttpStatus400Exception("图片上传","","待上传图片大小为0，请确认后重新上传","");
    }
    
    String IMAGE_TYPE = "FllowupPlan";
    Calendar cal = Calendar.getInstance();
    String imgName = paperId + "_"+cal.getTimeInMillis() + ".JPG";
    String uploadUrl = ftpUpload.fileUpload(file, IMAGE_TYPE, imgName);
    if(uploadUrl != null && !uploadUrl.isEmpty())
      return imgName;
    else
      return null;
  }
  
  public String uploadImage(String name, int type, MultipartFile file) throws Exception {

	    if (file.isEmpty()) {
	      logger.error("待上传的文件为空-->" + file.getSize());
	      throw new HttpStatus400Exception("图片上传","","待上传图片大小为0，请确认后重新上传","");
	    }

	    String IMAGE_TYPE = "";
	    String imgName = "";
	    if(type ==1){
	      IMAGE_TYPE = "EducationFile/image";//FllowupPlan
	      Calendar cal = Calendar.getInstance();
	      imgName = name + "_" + cal.getTimeInMillis() + ".JPG";
	    }	    
	    String imgUrl = ftpUpload.fileUpload(file, IMAGE_TYPE, imgName);
	    return imgUrl;

	  }
  
	public String uploadFile(String name, int type, File file) throws Exception {
		String path = "";
		if (type == 2) {
			path = "EducationFile/post";//FllowupPlan
		}
		String fileUrl = ftpUpload.fileUpload(file, path, name);
		return fileUrl;
	}
	
	public boolean deleteFile(String path,String name) throws Exception{
		return ftpUpload.deleteFile(path,name);
	}
  /**
   * 缩略图片列表
   * 
   * @param orderId
   * @param itemType
   * @param photoType
   * @return
   * @throws Exception
   */
//  public List<ConsultationPhotoItemModel> GetImageList(String orderId, char itemType, int photoType)
//      throws Exception {
//    logger.info("缩略图片列表入参  orderId = " + orderId);
//    logger.info("缩略图片列表入参  itemType = " + itemType);
//    logger.info("缩略图片列表入参  photoType = " + photoType);
//    List<ConsultationPhotoItemModel> resultList = new ArrayList<ConsultationPhotoItemModel>();
//
//    List<ConsultationPhotoItemModel> tmpList = imageDao.GetImageList(orderId, itemType, photoType);
//    if (tmpList != null && tmpList.size() != 0) {
//      // 设置缩略图地址
//      for (ConsultationPhotoItemModel photo : tmpList) {
//        DictionaryModel dic = dictionaryDao.getDictionaryById(photo.getPhotoType());
//        String photoTypePath = dic == null ? "" : dic.getNote();
//        String photoTypeName = dic == null ? "" : dic.getItemValue();
//        if (photoTypePath != null) {
//          photo.setPhotoTypeName(photoTypeName);
//          if (!"".equals(photoTypePath)) {
//            photo.setUrl(ImageConfig.GetImageServer(photoTypePath, photo.getPhotoName()));
//            photo.setVUrl(ImageConfig.GetImageServer(photoTypePath, photo.getVphotoName()));
//            System.out.println("---" + photo.getUrl());
//            System.out.println("+++" + photo.getVUrl());
//          }
//          resultList.add(photo);
//        }
//      }
//    }
//    return resultList;
//  }

  /**
   * 多文件图片删除
   * 
   * @param id
   * @throws Exception
   */
//  public void deleteMultipartImage(ImageIdModel list, ConsultationPhotoItemModel image)
//      throws Exception {
//    imageDao.deleteMultipartImage(list, image);
//  }

  /**
   * 图片删除
   * 
   * @param id
   * @throws Exception
   */
  public void DeleteImage(int id) throws Exception {
    //imageDao.DeleteImage(id, image);
  }
}
