var temp = 30;
var hum  = 40;
var tes = 0;
// fuzzy temperature
var tempMin = [15, 20, 25, 30, 35];
var tempMax = [25, 30, 35, 40, 50];
var strTemp = ["Dingin", "Sejuk", "Normal", "Hangat", "Panas"];

// fuzzy humidity
var humMin = [0, 25, 60];
var humMax = [40, 75, 100];
var strHum = ["Kering", "Sedang", "Basah"];

// fuzzy soil moisture
var soilMin = [0, 35, 55, 75];
var soilMax = [45, 65, 85, 100];
var strSoil = ["Kulemb", "Selemb", "Culemb", "Telemb"];


// fuzzy rule
var ruleMin = [0, 1, 2.5, 3.75, 5, 7, 8];
var ruleMax = [2, 3, 5, 6.25, 7.5, 9, 10];
var rulePeak= [1, 2, 3.75, 5, 6.25, 8, 9];
var strRule = ["SSdkt", "Sdkt", "ASdkt", "Sedang", "ABnyk", "Bnyk", "SBnyk"];

 calculateFuzzy = function(temp, hum){
	//var temp = document.getElementById("datatemp").value;
	//var hum = document.getElementById("datahum").value;
	console.log("Temp : "  + temp);
	console.log("Hum : " + hum);
	// var valTemp; var strValTemp; var statusTemp;
	
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
		var hasilHum = searchHum1(0);
		var valHum = hasilHum[0]; var strValHum = hasilHum[1]; var statusHum = hasilHum[2];
	} else if (hum >= humMax[1]){
		var hasilHum = searchHum1(2);
		var valHum = hasilHum[0]; var strValHum = hasilHum[1]; var statusHum = hasilHum[2];
	} else if (hum >= humMax[0] && hum <= humMin[2]){
		var hasilHum = searchHum1(1);
		var valHum = hasilHum[0]; var strValHum = hasilHum[1]; var statusHum = hasilHum[2];
	} else {
		var valHum=[]; var strValHum=[]; var statusHum;
		var hasilHum = searchHum2(hum);
		strValHum[0] = hasilHum[0]; valHum[0] = hasilHum[1]; strValHum[1]=hasilHum[2]; valHum[1]=hasilHum[3]; statusHum = hasilHum[4];
	}


			console.log(valHum+' '+strValHum+' '+statusHum);
	
	//perhitungan
	console.log("\nPerhitungan");
	console.log(statusTemp+" "+statusHum);
	var sumZxA=0; var sumA = 0;
	var index=[]; var rule=[]; var valRule=[]; var z=[];
	// console.log(strValTemp[0]+' '+strValTemp[1]);
	// console.log(valTemp[0]+' '+valTemp[1]);
	if(statusTemp == 1 && statusHum == 1){
		var hasilSearch = searchRule(strValTemp, valTemp, strValHum, valHum, 1, 10);
		index = hasilSearch[0]; rule = hasilSearch[1]; valRule = hasilSearch[2]; z = hasilSearch[3];
		console.log(rule + " : " + valRule + " -> z= " + z);
		sumSZxA = sumZxA + (z*valRule);
		sumA = sumA + (valRule)*1;
		
	} else if(statusTemp == 1 && statusHum == 2){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp, valTemp, strValHum[i], valHum[i], 2, i);
			index[i] = hasilSearch[0]; rule[i] = hasilSearch[1]; valRule[i] = hasilSearch[2]; z[i] = hasilSearch[3];
			console.log(rule[i] + " : " + valRule[i] + " -> z= " + z[i]);
			sumZxA = sumZxA + (z[i]*valRule[i]);
			sumA = sumA + (valRule[i])*1;
		}
	} else if(statusTemp == 2 && statusHum == 1){
		for (var i=0; i<=1; i++){
			var hasilSearch = searchRule(strValTemp[i], valTemp[i], strValHum, valHum, 2, i);
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

 searchRule = function(strTempInp, valTemp, strHumInp, valHum, type, pos){
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

// var tes = calculateFuzzy(30, 50);
tes = Math.round((calculateFuzzy(temp, hum))*50);
console.log(tes);