package com.ezhuanbing.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/zbwx/v1/doctor/")
public class PatientFollowUpPlanController {

	private Logger log = LoggerFactory.getLogger(getClass());
	
	
	//访问：http://localhost:8080//zbwx/v1/doctor//test/11
    @RequestMapping(value = "/test/{id}", method = RequestMethod.GET)
    public ModelAndView getPatientFollowUpPlans(
          @PathVariable("id") Integer id,
          @RequestParam(value = "doctorid", required = false) Integer doctorid,
          @RequestParam(value = "pageIndex", required = false, defaultValue = "1") Integer pageIndex,
          @RequestParam(value = "pageSize", required = false) Integer pageSize,
            HttpServletRequest request) throws Exception  {
	   
        
        try {
         return new ModelAndView("/index");
      } catch (Exception e) {
          log.error(e.getMessage(),e);
          throw e;
      }
        
    }
 
}
