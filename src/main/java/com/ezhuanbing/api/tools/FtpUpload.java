package com.ezhuanbing.api.tools;

import java.io.File;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Component
public class FtpUpload {
  
  @Autowired
  FtpUtil ftpUtil;
	public String fileUpload(MultipartFile mfile, String path, String imgName) throws Exception {

		boolean flag = false;

		flag = ftpUtil.connectFtp(path);

		try {

			CommonsMultipartFile cf = (CommonsMultipartFile) mfile;
			DiskFileItem df = (DiskFileItem) cf.getFileItem();
			File f = df.getStoreLocation();
			// 把文件上传在ftp上
			flag = ftpUtil.upload(f, imgName);

		} catch (Exception e) {
			throw new Exception("文件上传失败！");
		}

		// 关闭连接
		ftpUtil.closeFtp();

		if (flag)
			return ImageConfigInfo.GetImageServer(path, imgName);
		else
			throw new Exception("文件上传失败！");
	}
	
	
	public String fileUpload(File file, String path, String imgName) throws Exception {

		boolean flag = false;
		
		flag = ftpUtil.connectFtp(path);
		try {
			flag = ftpUtil.upload(file, imgName);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 关闭连接
		ftpUtil.closeFtp();

		if (flag) {
			return ImageConfigInfo.GetImageServer(path, imgName);
		} else
			throw new Exception("文件上传失败！");
	}
	/**
	 * 删除服务器上文件
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public boolean deleteFile(String path,String file) throws Exception{
		boolean flag = false;
		flag = ftpUtil.connectFtp(path);
		if(flag){
			try {
				flag = ftpUtil.removeFile(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return flag;
	}
}
