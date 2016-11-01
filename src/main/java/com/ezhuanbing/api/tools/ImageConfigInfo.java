package com.ezhuanbing.api.tools;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ezhuanbing.api.conf.ImageServerConfig;

@Component
public class ImageConfigInfo {
 
    private static String imageServer ="";
    private static String imagePath ="";
    
    @Autowired
    public ImageConfigInfo(ImageServerConfig imageServerInfo){
      imageServer = imageServerInfo.getImageserver();
      imagePath = imageServerInfo.getImagepath();
    }
    
	public static String GetImageServer(String directory, String photoName) {
	  return imageServer + directory + "/" + photoName;
	}

	public String GetImagePath(String directory, String photoName) {
	  if (photoName == null) {
	    return "";
	  }
	  if (photoName.trim().equals("")) {
	    return "";
	  }
	  File tempFile = new File(imagePath + "\\" + directory);
	  if (!tempFile.exists()) {
	    tempFile.mkdirs();
	  }
	  return imagePath + "\\" + directory + "\\" + photoName.trim();
	}
}
