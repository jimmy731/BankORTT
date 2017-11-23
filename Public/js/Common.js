function DateToString(pValue, pFormat = 'yyyy/mm/dd' , pLanguage = 'zh-TW'){
	if(pValue){
	   if(pValue instanceof Date){
		  return $.fn.datepicker.DPGlobal.formatDate(pValue, pFormat, pLanguage);
	   }else{
		  if(new Date(pValue) == "Invalid Date"){
			  return '不是日期';
		  }
		  
		  return $.fn.datepicker.DPGlobal.formatDate(new Date(pValue), pFormat, pLanguage);
	   }
	}else{
	  return '';
	}
}
			
function DecimalToString(pValue, pN = 2) {
	if(pValue){
		if(isNaN(pValue)){
			return '不是數字';
		}
		
		var sValue = pValue.toString();
		var sDot = sValue.indexOf('.');   
		if (sDot < 0) {     
			sValue += '.';   
		} 
		for(var i = sValue.length - sValue.indexOf('.'); i <= pN; i++){
		  sValue += "0";
		}
		return sValue;
	}else{
		return '';
	}
}

function CurrencyFormat(pValue) {
	if(pValue){	
		var sCurrency = (pValue+'').split('.'); 
		if (sCurrency[0].length > 3) {
			sCurrency[0] = sCurrency[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		}
		return sCurrency.join('.'); 
	}else{
		return '';
	}
}