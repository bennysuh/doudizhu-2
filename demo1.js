var CommonUtil = {
	format : function(){    
		var args = arguments;    
		return this.replace(/\{(\d+)\}/g,                    
			function(m,i){    
				return args[i];    
		});    
	},    

	 $id : function(id,e){
		e = e || document;
		return e.getElementById(id);
	},

	$class : function(_class, e){
		e = e || document;
		return e.getElementsByClassName(_class);
	},
	
	bubbleSort: function(dataArray, cmpFunc){
		var length = dataArray.length, temp, data1 ,data2, ret=0;
	����for(var i = 0; i < length - 1; i++){
		����for (var j = length -1; j >=1;j--) {
				
				data1 = dataArray[j], data2 = dataArray[j-1];
				ret = cmpFunc(data1, data2);
				if(ret > 0){
					temp = data1;
					dataArray[j] = data2;
					dataArray[j-1] = temp;
				}					
		����}
	����}
	����return dataArray;
	},
	
	fire: function (elem, type){  
		var evt;  
		if(document.createEventObject){// IE�����֧��fireEvent����  
			elem.fireEvent('on'+type);  
		}else{// ������׼�����ʹ��dispatchEvent����  
			evt = document.createEvent('HTMLEvents');  
			// initEvent����3��������  
			// �¼����ͣ��Ƿ�ð�ݣ��Ƿ���ֹ�������Ĭ����Ϊ  
			evt.initEvent(type, true, true);  
			elem.dispatchEvent(evt);  
		}  
	},
	
	print: function(text){
		alert(text);
	}
}

var PaiTypeConstants = {
	type:[0, 1, 2,3, 4, 5, 6, 7, 8, 9, 10, 11,12, 13, 14],
	name:['˫��ը��', '����ը��','�Ĵ�������','�Ĵ�һ��','�Ĵ�����', '����', '����', '����','����','���Ų���','���Ŵ�һ','���Ŵ���','�ɻ�����','�ɻ�������','�ɻ�����']
}

var PaiTypeJudger = function(sortedPaiArray){
	this.judger = ShuangWang;
	this.sortedPaiArray = sortedPaiArray || [];
}
PaiTypeJudger.prototype.doJudge = function(){
	this.judger.doJudge(this);
}

var ShuangWang = {
	doJudge: function(paiTypeJudger){		
		var paiArray = paiTypeJudger.sortedPaiArray, length = paiArray.length, paiType;
		if(length == 2 && (paiArray[0][0].cardSeq + paiArray[1][0].cardSeq == 29)){
			paiType = 0;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = FourBomb;
			paiTypeJudger.doJudge();
		}
	}	
}

var FourBomb = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, length = paiArray.length, paiType;
		if(length == 1 && paiArray[0].length == 4){
			paiType = 1;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = Four11;
			paiTypeJudger.doJudge();
		}
	}
}

var Four11 = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, length = paiArray.length, paiType;
		if(length == 3 && paiArray[0].length == 4 && paiArray[1].length == 1 && paiArray[2].length == 1){
			paiType = 2;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = Four2;
			paiTypeJudger.doJudge();
		}
	}
}

var Four2 = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, length = paiArray.length, paiType;
		if(length == 2 && paiArray[0].length == 4 && paiArray[1].length == 2){
			paiType = 3;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = Four22;
			paiTypeJudger.doJudge();
		}
	}
}

var Four22 = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, length = paiArray.length, paiType;
		if(length == 3 && paiArray[0].length == 4 && paiArray[1].length == 2 && paiArray[2].length == 2){
			paiType = 4;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = SinglePai;
			paiTypeJudger.doJudge();
		}
	}
}

var SinglePai = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
			length = paiArray.length, paiType, 
			start = paiArray[0];
		if(length == 1 && start.length == 1){
			paiType = 5;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = SingleDui;
			paiTypeJudger.doJudge();
		}		
	}
}

var SingleDui = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
			length = paiArray.length, paiType, 
			start = paiArray[0];
		if(length == 1 && start.length == 2){
			paiType = 6;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = LianPai;
			paiTypeJudger.doJudge();
		}		
	}
}

var LianPai = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
			length = paiArray.length, paiType, 
			start = paiArray[0],  endIndex = length -1 ;
		if(length >= 5 && (start.length == 1) && (endIndex != (start.cardSeq - paiArray[endIndex].cardSeq ) ) ){
			paiType = 7;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = LianDui;
			paiTypeJudger.doJudge();
		}		
	}
}
var LianDui = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
			length = paiArray.length, paiType, 
			start = paiArray[0],  endIndex = length -1 ;
		if(length >= 3 && (start.length == 2) && (endIndex == (start[0].cardSeq - paiArray[endIndex][0].cardSeq ) ) ){
			paiType = 8;
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}else{
			paiTypeJudger.judger = ThreeeX;
			paiTypeJudger.doJudge();
		}		
	}
}

var ThreeeX = {
	doJudge : function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
				length = paiArray.length, paiType = -1, 
				start = paiArray[0],  endIndex = length -1 ;
			if(start.length == 3){
				switch(length){
					case 1:{
						paiType = 9;break;
					}						
					case 2:{
						var daiLength = paiArray[1].length;
						if(daiLength == 1){
							paiType = 10;
						}else if(daiLength == 2){
							paiType = 11;
						}
						break;
					}					
				}
			}
			if(paiType == -1){
				paiTypeJudger.judger = FeiJi;
				paiTypeJudger.doJudge();
			}else{
				CommonUtil.print(PaiTypeConstants.name[paiType]);
			}
		}
}

var FeiJi = {
	doJudge: function(paiTypeJudger){
		var paiArray = paiTypeJudger.sortedPaiArray, 
			length = paiArray.length, paiType = -1, 
			start = paiArray[0],  endIndex = length -1 , 
			curArray, threeCount = 0, otherCount = 0;
			
		if(start.length == 3){
			for(var i = 1; i < length; i++){
				curArray = paiArray[i];
				if(curArray.length == 3){
					threeCount++;				
				}else{
					break;
				}				
			}
			if( (start[0].cardSeq - paiArray[threeCount][0].cardSeq ) != threeCount){
				threeCount = 1;
			}else{
				threeCount++;
			}
			
			for(var i = threeCount; i < length; i++){
				otherCount += paiArray[i].length;
			}		
			if(threeCount >= 2){
				if(otherCount == 0){
					paiType = 12;				
				}else if(otherCount == threeCount){
					paiType = 13;				
				}else if(otherCount == (threeCount + threeCount)){
					paiType = 14;				
				}
			}
		}else{
			paiType = -1;			
		}
		if(paiType == -1){
			CommonUtil.print('�Ƿ�����');
			var  mapCard;
			for(var i = 0; i < length; i++){
				curArray = paiArray[i];
				for(var j = 0 , k = curArray.length; j < k; j++ ){
					mapCard = curArray[j];
					mapCard.dead = false;	
					CommonUtil.fire(mapCard.mapImg, 'click');				
				}
				
			}
		}else{
			CommonUtil.print(PaiTypeConstants.name[paiType]);
		}
	}	
}




var Player = function(opt){
	opt = opt || {};
	this.cardArray = opt.cardArray;	
	this.areaObj = CommonUtil.$id(opt.areaId);
	this.chupaiId = opt.chupaiId;
	this.selectPaiArray = [];	
}

Player.prototype.registeSelectCardAction = function(){
	var cardImgs = CommonUtil.$class('card_img', this.areaObj), curImg;	
	for(var i = 0, j = cardImgs.length; i < j; i++){
		curCard = this.cardArray[i];		
		curImg = cardImgs[i];		
		curImg.mapCard = this.cardArray[parseInt(curImg.getAttribute('index'))];
		curImg.mapCard.mapImg = curImg;
		curImg.addEventListener('click', function(){
			var s = this.style, selectOffset = 10, top;
			if(this.selected){
				top = parseFloat(s.top) + selectOffset + 'px';
				this.selected = false;
			}else{
				this.selected = true;
				top = parseFloat(s.top) - selectOffset + 'px';
			}
			s.top = top;
		});
	}
}

Player.prototype.registeChupaiAction = function(){
	var that = this,  chupaiBtn = CommonUtil.$id(this.chupaiId);	
	chupaiBtn && chupaiBtn.addEventListener('click', function(){		
		that.judgeChupaiType();		
		ddz.placeCards();		
	});
}

Player.prototype.getSelectedCards = function(){
	var selectCards = [];
	var cardImgs = CommonUtil.$class('card_img', this.areaObj), curImg;
	for(var i = 0, j = cardImgs.length; i < j; i++){
		curImg = cardImgs[i];
		if(curImg.selected){
			selectCards.push(curImg.mapCard);
		}
	}
	return selectCards;
}


Player.prototype.getSortedPaiArray = function(cardArray, cmpFunction){
	var cards = cardArray || [];
	if(cards.length == 0) return;
	var curCard = cards[0], curSeq = curCard.cardSeq;
	var cardCount = cards.length, mapCardArray = [curCard], paiArray = [mapCardArray];	
	
	curCard.dead = true;
	for(var i = 1; i < cardCount; i++){
		curCard = cards[i];
		curCard.dead = true;
		if(curCard.cardSeq == curSeq){			
			mapCardArray.push(curCard);
		}else{	
			curSeq = curCard.cardSeq;
			mapCardArray = [curCard];			
			paiArray.push(mapCardArray);			
		}
	}		
	var sortedArray = CommonUtil.bubbleSort(paiArray,cmpFunction);
	return sortedArray;
	
}
Player.prototype.judgeChupaiType = function(){
	var selectCards = this.getSelectedCards();
	var sortedArray = this.getSortedPaiArray(selectCards, this.chupaiCmpFunction);
	var judger = new PaiTypeJudger(sortedArray);
	return judger.doJudge(sortedArray);
}

/*
 �ҳ�һ������ֻ�����һ�����͵��ƣ�3�������ӣ�����Ϊһ�����͡�����˼������һ���ƺ�ʣ�����е��κ�һ����û����ϵ��
 */
Player.prototype.findAlonePai = function(){		
	var array =  this.getSortedPaiArray(this.cardArray, this.findPaiCmpFunction), array = array || [];	
	var i = 0, size = array.length;
	if(size <= 2) return ;
	
	var aloneArray = [], lianPaiArray = [];
	var curPai = array[0], pai0Seq = curPai[0].cardSeq;
	//����
	if(pai0Seq == 15){
		i++;
		if(array[1][0].cardSeq == 14){
			i++;
		}else{
			aloneArray.push(curPai);			
		}
	}else if(pai0Seq == 14){
		i++;
		aloneArray.push(curPai);
	}	
	if(i < size){
		var lianxuCount = 1,curPai = array[i], preSeq = curPai[0].cardSeq, curSeq,tmp = [curPai];
		for(i++; i < size ; i++){
			curPai = array[i], curSeq = curPai[0].cardSeq;
			
			if(preSeq == (curSeq + 1)){
				lianxuCount++;
				tmp.push(curPai);				
			}else{
				var arrayToUse = lianPaiArray;
				if(lianxuCount < 5){
					arrayToUse = aloneArray;					
				}
				for(var p = 0, q = tmp.length; p < q; p++){				
					arrayToUse.push(tmp[p]);
				}					
				
				tmp = [curPai];
				lianxuCount = 1;
			}
			preSeq = curSeq;
		}	
		arrayToUse = lianPaiArray;
		if(lianxuCount < 5){
			arrayToUse = aloneArray;
		}
		for(var p = 0, q = tmp.length; p < q; p++){				
			arrayToUse.push(tmp[p]);
		}		
	}
	
	//�ӵ���5����aloneArray���ҳ����ţ�����
	var  oneArray = [], threeArray = [];
	for(i = 0, size = aloneArray.length; i < size; i++){
		curPai = aloneArray[i];		
		switch(curPai.length){
			case 1:
				oneArray.push(curPai);break;
			case 3:			
				threeArray.push(curPai);break;
		}
	}
	
	
	//�ӵ���5����aloneArray���ҳ�����3���Ķ���
	lianxuCount = 0, twoArray = [], lianDuiArray = [];
	for(i = 0, size = aloneArray.length; i < size; i++){
		curPai = aloneArray[i];
		if(curPai.length == 2){
			lianxuCount++, i++;
			preSeq = curPai[0].cardSeq;
			break;
		}
	}
	if(lianxuCount == 1){
		tmp = [curPai];
		for(; i < size; i++){
			curPai = aloneArray[i];			
			if(curPai.length == 2){
				curSeq = curPai[0].cardSeq;
				if(preSeq == (curSeq + 1)){
					lianxuCount++;
					tmp.push(curPai);
				}else{
					arrayToUse = lianDuiArray;	
					if(lianxuCount < 3){
						arrayToUse = twoArray;
					}
					for(var p = 0, q = tmp.length; p < q; p++){				
						arrayToUse.push(tmp[p]);
					}					
					
					tmp = [curPai];
					lianxuCount = 1;
				}
			}				
			preSeq = curSeq;				
		}
		
		arrayToUse = lianDuiArray;	
		if(lianxuCount < 3){
			arrayToUse = twoArray;
		}
		for(var p = 0, q = tmp.length; p < q; p++){				
			arrayToUse.push(tmp[p]);
		}		
	}
	aloneArray = null, tmp = null;
	return {
		oneArray:oneArray, 
		twoArray: twoArray, 
		threeArray: threeArray, 
		lianPaiArray:lianPaiArray, 
		lianDuiArray:lianDuiArray		
	};
}

Player.prototype.findPaiCmpFunction = function(pai1, pai2){	
	if(pai1[0].cardSeq > pai2[0].cardSeq){
		return 1;
	}else{
		return -1;
	}	
}

Player.prototype.cardCmpFunction = function(card1, card2){
	if (card1.cardSeq > card2.cardSeq){
		return 1;
	}else if(card1.cardSeq == card2.cardSeq){
		if(card1.cardType > card2.cardType){
			return 1;
		}
	}else{
		return -1;
	}
}

Player.prototype.chupaiCmpFunction = function(pai1, pai2){
	if (pai1.length > pai2.length){
		return 1;
	}else if(pai1.length == pai2.length){
		if(pai1[0].cardSeq > pai2[0].cardSeq){
			return 1;
		}
	}else{
		return -1;
	}
}

/*
cardType ָ���Ƶ�����
cardSeq ָ��ĳ�������ڵ����
*/	
var Card = function(index){
	if(index < 0 || index > 53){
		throw "�Ƿ���ŵ���";
	}
	this.index = index;
	
	var divide = Math.floor(index / 13), remain = index % 13,  type = '', cardChar = '';
	switch(divide){
		case 0: 
			type='fangkuai';break;
		case 1: 
			type='meihua';break;
		case 2: 
			type='hongxin';break;
		case 3: 
			type='heitao';break;
		case 4:
			type = 'wang';break;
		default:
			type='unknow';
	}
	
	this.cardType = divide;
	
	if(divide === 4){
		switch(remain){
		case 0:
			this.cardSrc = 'xiaowang.png';break;
		case 1:
			this.cardSrc = 'dawang.png'; break;
		default:
			throw '�Ƿ���ŵ���';
		}
		//Ϊ�˱��ڰ����������
		remain += 14;
	}else{
		switch(remain){
			case 10: 
				cardChar = 'J.png';break;
			case 11: 
				cardChar = 'Q.png';break;
			case 12: 
				cardChar = 'K.png';break;
			case 0: 
				cardChar = 'A.png';remain = 13; break;
			default:
				cardChar = remain + 1 + '.png';
		}	
		this.cardSrc = type + '/' + cardChar;
	}
	this.cardSeq = remain;
	
}


var ddz = {};
/*
 ����һ��ӵ��54��Ԫ�ص�һά�������θ�ֵΪ1------53�� ���54�Σ�ÿ�������һ�����֣��͵�i��λ�õ����ֽ���
*/
ddz.createRandomCards = function(){
	var d = [], ranPos, t;
	for(var i = 0; i < 54; i++){
		d.push(i);		
	}
	
	for(var i = 0; i < 54; i++){
		ranPos = Math.floor(Math.random() * 54);
		t = d[i];
		d[i] = d[ranPos];
		d[ranPos] = t;
	}
	return d;	
}

ddz.assignCards = function(){
	var cards = this.createRandomCards(), t = 0;
	var player1_card = [], player2_card = [], player3_card = [], dipai = [];
	for(var i = 0; i < 51; i++){
		t = i % 3;
		switch(t){
			case 0 :
				player1_card.push(new Card(cards[i]) )
				//player3_card.push(new Card(cards[i]));
				break;
			case 1 :
				player2_card.push(new Card(cards[i]));
				//player3_card.push(new Card(cards[i]));
				break;
			case 2 :
				player3_card.push(new Card(cards[i]));break;			
		}
	}
	
	// dipai.push(new Card(cards[51])), 
	// dipai.push(new Card(cards[52])), 
	// dipai.push(new Card(cards[53]));
	
	player3_card.push(new Card(cards[51])), 
	player3_card.push(new Card(cards[52])), 
	player3_card.push(new Card(cards[53]));
	
	
	
	this.player1_card = player1_card, 
	this.player2_card = player2_card, 
	this.player3_card = player3_card, 
	this.dipai = dipai;
	
	player1_card = null,
	player2_card = null,
	player3_card = null, 
	dipai = null;	
	
	this.initPlayers();
}

ddz.initPlayers = function(){
	var player1 = new Player({
					cardArray:ddz.player1_card					
				});	
	var player2 = new Player({
					cardArray:ddz.player2_card					
				});	
	
	var player3 = new Player({
					cardArray:ddz.player3_card,
					chupaiId:'chupai',
					areaId:'player3_area'
				});	
	
	CommonUtil.bubbleSort(player1.cardArray, player1.cardCmpFunction);
	CommonUtil.bubbleSort(player2.cardArray, player2.cardCmpFunction);
	CommonUtil.bubbleSort(player3.cardArray, player3.cardCmpFunction);
	
	this.player1 = player1, this.player2 = player2, this.player3 = player3;
	player1 = null, player2 = null, player3 = null;
}

ddz.placeCards = function(){	
	var curPlayer = this.player1_card,  xOffset = 20, yOffset = 100, top=xOffset, left = 0,
		tStr, htmls = [],template = "<img class='card_img' index={3} src='{0}'style='position:absolute;top:{1}px;left:{2}px'>";
	var d = document, player_area = d.getElementById('player1_area');	
		
	for(var i = 0, j = curPlayer.length; i < j; i++){
		if(!curPlayer[i].dead){
			tStr = CommonUtil.format.call(template,curPlayer[i].cardSrc, top, left, i);
			htmls.push(tStr);
			left+= xOffset;	
		}		
	}
	player_area.innerHTML = htmls.join('');
	
	curPlayer = this.player2_card, 
	top += yOffset, left = 0;
	htmls = [], 
	player_area = d.getElementById('player2_area');	
	for(var i = 0, j = curPlayer.length; i < j; i++){
		if(!curPlayer[i].dead){
			tStr = CommonUtil.format.call(template,curPlayer[i].cardSrc, top, left, i);
			htmls.push(tStr);
			left+= xOffset;		
		}
	}
	player_area.innerHTML = htmls.join('');
	
	curPlayer = this.player3_card, 
	top += yOffset, left = 0;
	htmls = [], 
	player_area = d.getElementById('player3_area');	
	for(var i = 0, j = curPlayer.length; i < j; i++){
		if(!curPlayer[i].dead){
			tStr = CommonUtil.format.call(template,curPlayer[i].cardSrc, top, left, i);
			htmls.push(tStr);
			left+= xOffset;	
		}		
	}
	
	left = left - xOffset + 60;
	var btnTemplate = "<button id='chupai' style='position:absolute;top:{0}px;left:{1}px'>����</button>";
	tStr = CommonUtil.format.call(btnTemplate, top, left);
	player_area.innerHTML = htmls.join('')+ tStr;	
	
	this.player3.registeSelectCardAction();
	this.player3.registeChupaiAction();
}

/*
54������������㷨
*/
var ddz1 = {};

/*
��������0��53���β��������е����λ��
*/
ddz1.createRandomCard = function(){
	var card = [], rPos;
	for(var i = 0; i < 53; i++){
		rPos = Math.floor(Math.random() * 54);
		list.push();
	}
}


var ddz2 = {};
/*
1.�����Ҫ�����е�vector������������ֱ�Ӵ�ԭ�����������ǩ��˳����ӵ������飬��ɾ��ԭ�����б��鵽��Ԫ��

2..����ֱ�Ӵ�ԭvector����˳���ȡԪ�أ����õ��¶�̬�����е����λ��
*/
ddz2.createRandomCard = function(){
}

