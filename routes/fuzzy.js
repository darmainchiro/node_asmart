// fuzzy temperature
var tempMin = [15, 20, 25, 30, 35];
var tempMax = [25, 30, 35, 40, 50];
var strTemp = ["Dingin", "Sejuk", "Normal", "Hangat", "Panas"];

// fuzzy humidity
var humMin = [0, 25, 60];
var humMax = [40, 75, 100];
var strHum = ["Kering", "Sedang", "Basah"];

// fuzzy soil moisture
var soilMin = [0, 40, 80];
var soilMax = [45, 85, 100];
var strSoil = ["Kulemb", "Culemb", "Telemb"];

// fuzzy air pressure
var airMin = [0, 95, 110];
var airMax = [95, 110, 160];
var strAir = ["Kurang", "Normal", "Lebih"];

// fuzzy rule
var ruleMin = [0, 1, 2.5, 3.75, 5, 7, 8];
var ruleMax = [2, 3, 5, 6.25, 7.5, 9, 10];
var rulePeak= [1, 2, 3.75, 5, 6.25, 8, 9];
var strRule = ["SSdkt", "Sdkt", "ASdkt", "Sedang", "ABnyk", "Bnyk", "SBnyk"];

 calculateFuzzy = function(temp, hum, soil, air){
	//var temp = document.getElementById("datatemp").value;
	//var hum = document.getElementById("datahum").value;
	console.log("Temp : "  + temp);
    console.log("Hum : " + hum);
    console.log("Soil : "  + soil);
    console.log("Air : " + air);
    
	//var valTemp; var strValTemp; var statusTemp;
	
	//temperature
	console.log("Temperature");
	if(temp <= tempMin[1]){
		var hasilTemp   = searchTemp1(0);
        var strValTemp  = hasilTemp.strValTemp; 
        var valTemp     = hasilTemp.valTemp; 
        var statusTemp  = hasilTemp.statusTemp;
	} else if (temp >= tempMax [3]){
		var hasilTemp   = searchTemp1(4);
        var strValTemp  = hasilTemp.strValTemp; 
        var valTemp     = hasilTemp.valTemp; 
        var statusTemp  = hasilTemp.statusTemp;
	} else if (temp == 25){
		var hasilTemp   = searchTemp1(1);
        var strValTemp  = hasilTemp.strValTemp; 
        var valTemp     = hasilTemp.valTemp; 
        var statusTemp  = hasilTemp.statusTemp;
	} else if (temp == 30){
		var hasilTemp   = searchTemp1(2);
        var strValTemp  = hasilTemp.strValTemp; 
        var valTemp     = hasilTemp.valTemp; 
        var statusTemp  = hasilTemp.statusTemp;
	} else if (temp == 35){
		var hasilTemp   = searchTemp1(3);
        var strValTemp  = hasilTemp.strValTemp; 
        var valTemp     = hasilTemp.valTemp; 
        var statusTemp  = hasilTemp.statusTemp;
	} else {
        var valTemp     =[]; 
        var strValTemp  =[]; 
        var statusTemp  =0;
		var hasilTemp   = searchTemp2(temp);
        strValTemp[0]   = hasilTemp[0]; 
        valTemp[0]      = hasilTemp[1], strValTemp[1]=hasilTemp[2], valTemp[1]=hasilTemp[3], statusTemp=hasilTemp[4];

	console.log(strValTemp[0]+' '+strValTemp[1]);
	console.log(valTemp[0]+' '+valTemp[1]);
	}
	
	//humidity
	console.log("\nHumidity");
	
	if (hum<=humMin[1]){
		var hasilHum    = searchHum1(0);
        var valHum      = hasilHum[0]; 
        var strValHum   = hasilHum[1]; 
        var statusHum   = hasilHum[2];
	} else if (hum >= humMax[1]){
		var hasilHum    = searchHum1(2);
        var valHum      = hasilHum[0]; 
        var strValHum   = hasilHum[1]; 
        var statusHum   = hasilHum[2];
	} else if (hum >= humMax[0] && hum <= humMin[2]){
		var hasilHum    = searchHum1(1);
        var valHum      = hasilHum[0]; 
        var strValHum   = hasilHum[1]; 
        var statusHum   = hasilHum[2];
	} else {
        var valHum=[]; 
        var strValHum=[]; 
        var statusHum;
		var hasilHum    = searchHum2(hum);
        strValHum[0]    = hasilHum[0]; 
        valHum[0]       = hasilHum[1]; 
        strValHum[1]    = hasilHum[2]; 
        valHum[1]       = hasilHum[3]; 
        statusHum       = hasilHum[4];
    }
    
			console.log(valHum+' '+strValHum+' '+statusHum);
    
    //soilmoisture
	console.log("\nSoilMoisture");
	
	if (soil<=soilMin[1]){
		var hasilSoil    = searchSoil1(0);
        var valSoil      = hasilSoil[0]; 
        var strValSoil   = hasilSoil[1]; 
        var statusSoil   = hasilSoil[2];
	} else if (soil >= soilMax[1]){
		var hasilSoil    = searchSoil1(2);
        var valSoil      = hasilSoil[0]; 
        var strValSoil   = hasilSoil[1]; 
        var statusSoil   = hasilSoil[2];
	} else if (soil >= soilMax[0] && soil <= soilMin[2]){
		var hasilSoil    = searchSoil1(1);
        var valSoil      = hasilSoil[0]; 
        var strValSoil   = hasilSoil[1]; 
        var statusSoil   = hasilSoil[2];
	} else {
        var valSoil=[]; 
        var strValSoil=[]; 
        var statusSoil;
		var hasilSoil    = searchSoil2(hum);
        strValSoil[0]    = hasilSoil[0]; 
        valSoil[0]       = hasilSoil[1]; 
        strValSoil[1]    = hasilSoil[2]; 
        valSoil[1]       = hasilSoil[3]; 
        statusSoil       = hasilSoil[4];
    }
    
			console.log(valSoil+' '+strValSoil+' '+statusSoil);
    
    //airpressure
	console.log("\nAir Pressure");
	
	if (air<=airMin[1]){
		var hasilAir    = searchAir1(0);
        var valAir      = hasilAir[0]; 
        var strValAir   = hasilAir[1]; 
        var statusAir   = hasilAir[2];
	} else if (air >= airMax[1]){
		var hasilAir    = searchAir1(2);
        var valAir      = hasilAir[0]; 
        var strValAir   = hasilAir[1]; 
        var statusAir   = hasilAir[2];
	} else if (air >= airMax[0] && air <= airMin[2]){
		var hasilAir    = searchAir1(1);
        var valAir      = hasilAir[0]; 
        var strValAir   = hasilAir[1]; 
        var statusAir   = hasilAir[2];
	} else {
        var valAir=[]; 
        var strValAir=[]; 
        var statusAir;
		var hasilAir    = searchAir2(air);
        strValAir[0]    = hasilAir[0]; 
        valAir[0]       = hasilAir[1]; 
        strValAir[1]    = hasilAir[2]; 
        valAir[1]       = hasilAir[3]; 
        statusAir       = hasilAir[4];
    }
    
        console.log(valAir+' '+strValAir+' '+statusAir);
            
	//perhitungan
	console.log("\nPerhitungan");
	console.log(statusTemp+" "+statusHum);
	var sumZxA=0; var sumA = 0;
	var index=[]; var rule=[]; var valRule=[]; var z=[];
	console.log(strValTemp[0]+' '+strValTemp[1]);
	console.log(valTemp[0]+' '+valTemp[1]);
	if(statusTemp == 1 && statusHum == 1 && statusSoil == 1 && statusAir == 1){
		var hasilSearch = searchRule(strValTemp, valTemp, strValHum, valHum, strSoil, valSoil, strAir, valAir, 1, 10);
		index = hasilSearch[0]; rule = hasilSearch[1]; valRule = hasilSearch[2]; z = hasilSearch[3];
		console.log(rule + " : " + valRule + " -> z= " + z);
		sumSZxA = sumZxA + (z*valRule);
		sumA = sumA + (valRule)*1;
		
	} else if(statusTemp == 1 && statusHum == 2 && statusSoil == 1 && statusAir == 1){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp, valTemp, strValHum[i], valHum[i], strSoil, valSoil, strAir, valAir, 2, i);
			index[i] = hasilSearch[0]; rule[i] = hasilSearch[1]; valRule[i] = hasilSearch[2]; z[i] = hasilSearch[3];
			console.log(rule[i] + " : " + valRule[i] + " -> z= " + z[i]);
			sumZxA = sumZxA + (z[i]*valRule[i]);
			sumA = sumA + (valRule[i])*1;
		}
	}else if(statusTemp == 1 && statusHum == 1 && statusSoil == 2 && statusAir == 1){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp, valTemp, strValHum, valHum, strValSoil[i], valSoil[i], strValAir, valAir, 2, i);
			index[i] = hasilSearch[0]; rule[i] = hasilSearch[1]; valRule[i] = hasilSearch[2]; z[i] = hasilSearch[3];
			console.log(rule[i] + " : " + valRule[i] + " -> z= " + z[i]);
			sumZxA = sumZxA + (z[i]*valRule[i]);
			sumA = sumA + (valRule[i])*1;
		}
	}else if(statusTemp == 1 && statusHum == 1 && statusSoil == 1 && statusAir == 2){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp, valTemp, strValHum[i], valHum[i], strValSoil, valSoil, strValAir[i], valAir[i], 2, i);
			index[i] = hasilSearch[0]; rule[i] = hasilSearch[1]; valRule[i] = hasilSearch[2]; z[i] = hasilSearch[3];
			console.log(rule[i] + " : " + valRule[i] + " -> z= " + z[i]);
			sumZxA = sumZxA + (z[i]*valRule[i]);
			sumA = sumA + (valRule[i])*1;
		}
	} else if(statusTemp == 2 && statusHum == 1 && statusSoil == 1 && statusAir == 1){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp[i], valTemp[i], strValHum, valHum, strValSoil, valSoil, strValAir, valAir, 2, i);
			index[i] = hasilSearch[0]; rule[i] = hasilSearch[1]; valRule[i] = hasilSearch[2]; z[i] = hasilSearch[3];
			console.log(rule[i] + " : " + valRule[i] + " -> z= " + z[i]);
			sumZxA = sumZxA + (z[i]*valRule[i]);
			console.log(sumA+valRule[i]);
			sumA = sumA + (valRule[i])*1;
		}
		
	} else if(statusTemp == 2 && statusHum == 2){
		var count=0;
		for(var i=0; i<=1; i++){
			for(var j=0; j<=1; j++){
				var hasilSearch = searchRule(strValTemp[i], valTemp[i], strValHum[j], valHum[j], 3, count);
				index[count] = hasilSearch[0]; 
				rule[count] = hasilSearch[1]; valRule[count] = hasilSearch[2]; 
				z[count] = hasilSearch[3];


				console.log(rule[count] + " : " + valRule[count]);
				console.log( " -> z : "+z[count]);
				
				sumZxA = sumZxA + (z[count]*valRule[count]);
				sumA = sumA + (valRule[count])*1;
				
				count++;
			}
		}
	}
	console.log(valRule);
	
	var zAkhir = (sumZxA / sumA).toFixed(2);
	console.log("Z akhir : " + sumZxA+"/"+sumA);
	console.log("Z akhir : " + zAkhir);
	return zAkhir;
	temp =0;
	hum =0;
	soil =0;
	air =0;
}

 searchTemp1 = function(i){
	var valTemp = 1; var strValTemp = strTemp[i];
	console.log(strValTemp + " : " + valTemp);
	var statusTemp = 1;
	return [valTemp, strValTemp, statusTemp];
}

 searchTemp2 = function(temp){
	var flag1 =0; var flag2=0;
	for(var i=0; i<=4; i++){
		//mencari temp bawah
		if (temp > tempMin[i] && temp < tempMax[i-1] && flag1 == 0){
			var Min = tempMin[i];
			var strValTempBawah = strTemp[i];
			console.log(strValTempBawah + " = " + Min);
			flag1=1;
		}
		
		//mencari temp atas
		if(temp < tempMax[i] && temp > tempMin[i+1] && flag2 == 0){
			var Max = tempMax[i];
			var strValTempAtas = strTemp[i];
			console.log(strValTempAtas + " = " + Max);
			flag2=1;
		}
	}
	
	var valTempAtas   = ((Max-temp)/(Max-Min)).toFixed(2);
	var valTempBawah  = ((temp-Min)/(Max-Min)).toFixed(2);
	var statusTemp = 2;
	
	console.log(strValTempAtas + " : " + valTempAtas + " " + strValTempBawah + " : " + valTempBawah);
	return [strValTempAtas, valTempAtas, strValTempBawah, valTempBawah, statusTemp];
}

 searchHum1 = function(i){
	var valHum = 1; var strValHum = strHum[i];
	console.log(strValHum + " : " + valHum);
	var statusHum = 1;
	return [valHum, strValHum, statusHum];
}

 searchHum2 = function(hum){
	var flag1=0; var flag2=0;
	for (var i=0; i<=2; i++){
		//mencari hum bawah
		if (hum > humMin[i] && hum < humMax[i-1] && flag1 == 0){
			var Min = humMin[i];
			var strValHumBawah = strHum[i];
			console.log(strValHumBawah + " = " + Min);
			flag1=1;
		}
		
		//mencari hum atas
		if(hum < humMax[i] && hum > humMin[i+1] && flag2 == 0){
			var Max = humMax[i];
			var strValHumAtas = strHum[i];
			console.log(strValHumAtas + " = " + Max);
			flag2=1;
		}
	}
	
	var valHumAtas   = ((Max-hum)/(Max-Min)).toFixed(2);
	var valHumBawah  = ((hum-Min)/(Max-Min)).toFixed(2);
	var statusHum = 2;
	
	console.log(strValHumAtas + " : " + valHumAtas + " ---- " + strValHumBawah + " : " + valHumBawah);
	return [strValHumBawah, valHumBawah, strValHumAtas, valHumAtas, statusHum];
};

searchSoil1 = function(i){
	var valSoil = 1; var strValSoil = strSoil[i];
	console.log(strValSoil + " : " + valSoil);
	var statusSoil = 1;
	return [valSoil, strValSoil, statusSoil];
}

 searchSoil2 = function(soil){
	var flag1 =0; var flag2=0;
	for(var i=0; i<=4; i++){
		//mencari temp bawah
		if (soil > soilMin[i] && soil < soilMax[i-1] && flag1 == 0){
			var Min = soilMin[i];
			var strValSoilBawah = strSoil[i];
			console.log(strValSoilBawah + " = " + Min);
			flag1=1;
		}
		
		//mencari temp atas
		if(soil < soilMax[i] && soil > soilMin[i+1] && flag2 == 0){
			var Max = soilMax[i];
			var strValSoilAtas = strSoil[i];
			console.log(strValSoilAtas + " = " + Max);
			flag2=1;
		}
	}
	
	var valSoilAtas   = ((Max-soil)/(Max-Min)).toFixed(2);
	var valSoilBawah  = ((soil-Min)/(Max-Min)).toFixed(2);
	var statusSoil = 2;
	
	console.log(strValSoilAtas + " : " + valSoilAtas + " " + strValSoilBawah + " : " + valSoilBawah);
	return [strValSoilAtas, valSoilAtas, strValSoilBawah, valSoilBawah, statusSoil];
}

searchAir1 = function(i){
	var valAir = 1; var strValAir = strAir[i];
	console.log(strValAir + " : " + valAir);
	var statusAir = 1;
	return [valAir, strValAir, statusAir];
}

 searchAir2 = function(air){
	var flag1=0; var flag2=0;
	for (var i=0; i<=2; i++){
		//mencari hum bawah
		if (air > airMin[i] && air < airMax[i-1] && flag1 == 0){
			var Min = airMin[i];
			var strValAirBawah = strAir[i];
			console.log(strValAirBawah + " = " + Min);
			flag1=1;
		}
		
		//mencari hum atas
		if(air < airMax[i] && air > airMin[i+1] && flag2 == 0){
			var Max = airMax[i];
			var strValAirAtas = strAir[i];
			console.log(strValAirAtas + " = " + Max);
			flag2=1;
		}
	}
	
	var valAirAtas   = ((Max-air)/(Max-Min)).toFixed(2);
	var valAirBawah  = ((air-Min)/(Max-Min)).toFixed(2);
	var statusAir = 2;
	
	console.log(strValAirAtas + " : " + valAirAtas + " ---- " + strValAirBawah + " : " + valAirBawah);
	return [strValAirBawah, valAirBawah, strValAirAtas, valAirAtas, statusAir];
};

 searchRule = function(strTempInp, valTemp, strHumInp, valHum, strSoil, valSoil, strAir, valAir, type, pos){
	var str="";
	var i=0;
	var valRule=0;
	if (valHum > valTemp)
			valRule = valTemp;
	else valRule = valHum;
	console.log(strTempInp+' '+strHumInp);
	if (strTempInp == strTemp[0] && strHumInp == strHum[0]){ // Dingin Kering
		i=2;
	} else if (strTempInp == strTemp[1] && strHumInp == strHum[0]){ // Sejuk Kering
		i=3;
	} else if (strTempInp == strTemp[2] && strHumInp == strHum[0]){ // Normal Kering
		i=4;
	} else if (strTempInp == strTemp[3] && strHumInp == strHum[0]){ // Hangat Kering
		i=5;
	} else if (strTempInp == strTemp[4] && strHumInp == strHum[0]){ // Panas Kering
		i=6;
	} else if (strTempInp == strTemp[0] && strHumInp == strHum[1]){ // Dingin Lembab
		i=1;
	} else if (strTempInp == strTemp[1] && strHumInp == strHum[1]){ // Sejuk Lembab
		i=2;
	} else if (strTempInp == strTemp[2] && strHumInp == strHum[1]){ // Normal Lembab
		i=3;
	} else if (strTempInp == strTemp[3] && strHumInp == strHum[1]){ // Hangat Lembab
		i=4;
	} else if (strTempInp == strTemp[4] && strHumInp == strHum[1]){ // Panas Lembab
		i=5;
	} else if (strTempInp == strTemp[0] && strHumInp == strHum[2]){ // Dingin Basah
		i=0;
	} else if (strTempInp == strTemp[1] && strHumInp == strHum[2]){ // Sejuk Basah
		i=1;
	} else if (strTempInp == strTemp[2] && strHumInp == strHum[2]){ // Normal Basah
		i=2;
	} else if (strTempInp == strTemp[3] && strHumInp == strHum[2]){ // Hangat Basah
		i=3;
	} else if (strTempInp == strTemp[4] && strHumInp == strHum[2]){ // Panas Basah
		i=4;
	}
	
	var z;
	if (type == 1){ 
	z = rulePeak[i];
	} else {
		if (pos % 2 == 0) 		{
			z=((ruleMax[i] - (valRule * (ruleMax[i] - rulePeak[i])))).toFixed(2);
			console.log(valRule+" = ("+ruleMax[i]+"-"+z+")/("+rulePeak[i]+"-"+ruleMin[i]+")");
		}
		else if (pos % 2 == 1)	{
			z=((ruleMin[i] + (valRule * (rulePeak[i] - ruleMin[i])))).toFixed(2);
			console.log(valRule+" = ("+z+"-"+ruleMin[i]+")/("+rulePeak[i]+"-"+ruleMin[i]+")");
		}
	}
	
	str = strRule[i];
	return  [i, str, valRule, z];
}