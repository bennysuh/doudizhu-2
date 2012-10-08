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
	
	fire:	function (elem, type){  
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
		that.selectPaiArray = [];
		var cardImgs = CommonUtil.$class('card_img', that.areaObj), curImg;
		for(var i = 0, j = cardImgs.length; i < j; i++){
			curImg = cardImgs[i];
			if(curImg.selected){
				that.selectPaiArray.push(curImg.mapCard);
			}
		}
		
		var paiType = that.judgeChupaiType();
		console.log(paiType);
		ddz.placeCards();		
	});
}


Player.prototype.judgeChupaiType = function(){
	var cards = this.selectPaiArray;
	if(cards.length == 0) return;
	//��ΪselectPaiArray�Ѿ�Ϊ������������������
	//cards = this.sortCards(cards);
	var cardArray = [], cardInfo = {}, cardCount = cards.length, cardArrayIndex = 0;
	var curSeq = (cardInfo.seq = cards[0].cardSeq), curCard;
	cardInfo.count = 1, cardInfo.mapCardArray = [cards[0]];//count���ܴ���1������������洢
	
	cardArray.push(cardInfo);
	cards[0].dead = true;
	for(var i = 1; i < cardCount; i++){
		curCard = cards[i];
		curCard.dead = true;
		if(curCard.cardSeq == curSeq){
			cardInfo.count++;
			cardInfo.mapCardArray.push(curCard);
		}else{	
			curSeq = curCard.cardSeq;
			cardInfo = {
				seq: curSeq,
				count: 1,
				mapCardArray:[curCard]
			}	
			cardArray.push(cardInfo);	
		}
	}	
	
	var ret = CommonUtil.bubbleSort(cardArray, this.chupaiCmpFunction), length = ret.length, paiType;
	
	var feifa = '�Ƿ�����',
		shuangwang = '˫��ը��', 
		sizhangzhadan = '����ը��',
		danzhang = '����',
		lianpai='����',
		dandui = '����',
		liandui='����',
		feiji='�ɻ�',
		sidai11='�Ĵ�������',
		sidai2 = '�Ĵ�һ��',
		sidai22 = '�Ĵ�����'
	
		
	if(length == 2 && (ret[0].seq + ret[1].seq == 29)){
		alert(shuangwang);
	}else{	
		var start = ret[0], endIndex = length -1 ;
		switch(start.count){
			//����
			case 1:{
				if(length < 5 || (endIndex != (start.seq - ret[endIndex].seq ) ) ){
					if(length == 1){
						alert(danzhang);
					}else{
						paiType = -1;
						alert(feifa);
					}
				}else{
					alert(lianpai);
				}
				break;
			}		
			//����
			case 2:{
				if(length < 3){	
					if(length == 1){
						alert(dandui);
					}else{
						paiType = -1;
						alert(feifa);
					}
				}else{
					var totalCount = 0;
					for(var i = 0; i < length; i++){
						totalCount += ret[i].count;						
					}
					if(totalCount != (length + length)){
						paiType = -1;
						alert(feifa);
					}else{
						alert(liandui);
					}				 
				}
				break;
			}
			//����
			case 3:{
				paiType = -1;
				alert(feifa);
				switch(length){
					case 1:break;
					default:
						break;
				}
				break;
			}
			//�Ĵ�
			case 4:{
				switch(length){
					case 1:{
						alert(sizhangzhadan);break;
					}
					case 2:{
						if( (ret[0].count + ret[1].count) == 6){
							alert(sidai2);
						}else{
							paiType = -1;
							alert(feifa);
						}
						break;
					}
					case 3:{
						var total = (ret[0].count + ret[1].count + ret[2].count);
						if(total == 6){
							alert(sidai11);
						}else if(total == 8){
							alert(sidai22);
						}else{
							paiType = -1;
							alert(feifa);
						}
						break;
					}
					default:
						paiType = -1;
						alert(feifa);					
				}
				break;
			}
			
		}		
	}
	if(paiType == -1){
		var mapCardArray, mapCard;
		for(var i = 0; i < length; i++){
			mapCardArray = ret[i].mapCardArray;
			for(var j = 0 , k = mapCardArray.length; j < k; j++ ){
				mapCard = mapCardArray[j];
				mapCard.dead = false;	
				CommonUtil.fire(mapCard.mapImg, 'click');				
			}
			
		}
	}
	return ret;
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
	if (pai1.count > pai2.count){
		return 1;
	}else if(pai1.count == pai2.count){
		if(pai1.seq > pai2.seq){
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
				player3_card.push(new Card(cards[i]));
				;break;
			case 1 :
				player2_card.push(new Card(cards[i]));
				player3_card.push(new Card(cards[i]));
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

