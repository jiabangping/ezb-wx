!function () {
    //  laydate.skin('yalan'); //切换皮肤，请查看skins下面皮肤库

} ();

//====================================原有身份证验证逻辑========================================
function isIdCardNo(num) {
	num = num.toUpperCase();
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
            return false;
        }
    }
    else {        //length is 15
        //check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            return false;
        }
    }
    return true;
}
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
}
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}

function verifyCode(verifyCode) {
	if(verifyCode.length !=6) {
		return false;
	}
	return true;
}
function verifyAge(age) {
	if(isNaN(age)) {
		return false;
	}
	if(age == '' ) {
		return false;
	}
	if(age *1 <1 || age*1 > 100) {
		return false;
	}
	return true;
}
function verifyOverSeaPhone(phone) {
	if(phone == null || phone == '' || phone == undefined || phone.length != 11) {
		return false;
	}
	return true;
}


function validIntro(intro){
	if(intro.length <20) {
		return false;
	}
	return true;
}
function validPasswd(passwd){
	if(passwd.length<6||passwd.length>20){
		return false;
	}
	return true;
}

//====================================2015-07-15身份证验证逻辑========================================
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];// 加权因子  
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];// 身份证验证位值.10代表X  

function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");// 得到身份证数组  
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/** 
 * 判断身份证号码为18位时最后的验证位是否正确 
 * @param a_idCard 身份证号码数组 
 * @return 
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量  
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作  
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];// 加权求和  
    }
    valCodePosition = sum % 11;// 得到验证码所位置  
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/** 
 * 验证18位数身份证号码中的生日是否是有效生日 
 * @param idCard 18位书身份证字符串 
 * @return 
 */
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题  
    if (temp_date.getFullYear() != parseFloat(year)
          || temp_date.getMonth() != parseFloat(month) - 1
          || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/** 
 * 验证15位数身份证号码中的生日是否是有效生日 
 * @param idCard15 15位书身份证字符串 
 * @return 
 */
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法  
    if (temp_date.getYear() != parseFloat(year)
            || temp_date.getMonth() != parseFloat(month) - 1
            || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格  
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//============================================================================

var mainlayerIndex;

/*$(document).ajaxStart(function () {
    mainlayerIndex = layer.load(0);
});
$(document).ajaxComplete(function () {
    layer.close(mainlayerIndex);
});*/
//定义中文消息
var cnmsg = {
    required: "必填项",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    verifyCode:"请输入正确6位验证码",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.format("请输入一个长度最多是 {0} 的字符串"),
    minlength: jQuery.format("请输入一个长度最少是 {0} 的字符串"),
    rangelength: jQuery.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
    range: jQuery.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: jQuery.format("请输入一个最大为 {0} 的值"),
    min: jQuery.format("请输入一个最小为 {0} 的值")
};
jQuery.extend(jQuery.validator.messages, cnmsg);
jQuery.validator.addMethod("time", function (value, element) {
        var tel = /^([0-9]|[0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    
    return tel.test(value);
}, "24小时制格式：HH:mm");
jQuery.validator.addMethod("isIdCardNo", function (value, element) {
    return this.optional(element) || IdCardValidate(value);
}, "请正确输入您的身份证号码");
jQuery.validator.addMethod("mobile", function (value, element) {
    var tel = /^[1][0-9]{10}$/;
    return this.optional(element) || tel.test(value);
}, "无效的手机号码");
jQuery.validator.addMethod("num", function (value, element) {
    var tel = /^\d$/;
    return tel.test(value);
}, "必须填写数字");


jQuery.validator.addMethod("verifyCode", function (value, element) {
    return verifyCode(value);
}, "请输入正确6位验证码");

jQuery.validator.addMethod("intro", function (value, element) {
    return validIntro(value);
}, "请输入最少20字的自我介绍");

jQuery.validator.addMethod("passwd", function (value, element) {
    return validPasswd(value);
}, "请输入6-15个长度密码");
 
jQuery.validator.addMethod("age", function (value, element) {
    return verifyAge(value);
}, "请输入(1-100)数值格式年龄");

jQuery.validator.addMethod("overseaPhone", function (value, element) {
    return verifyOverSeaPhone(value);
}, "请输入11位数字(美国用户请输入国家码+手机号码)");

