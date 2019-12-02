var board = new Array(10);
var buttons = new Array(10);
var k=1;
for(var i=0;i<3;i++){
	for(var j=0;j<3;j++){
		buttons[k++] = i+'b'+j
	}
}
for(var i=1;i<10;i++)
		board[i] = 2;
var player = 3;
var opponent = 5;
var turn = 0;

function make2(){
	if(board[5] == 2)
		return 5;
	else{
		if(board[2] == 2)
			return 2;
		else if(board[6] == 2)
			return 6;
		else if(board[8] == 2)
			return 8;
		else
			return 4;
	}
}

function evaluate(){
	for(var i=1;i<10;i+=3){
		if(board[i]*board[i+1]*board[i+2] == 27)
			return 1;
	}
	for(var i=1;i<4;i+=1){
		if(board[i]*board[i+3]*board[i+6] == 27)
			return 1;
	}
	if(board[1]*board[5]*board[9] == 27)
		return 1;
	if(board[3]*board[5]*board[7] == 27)
		return 1;
	return 0;
}

function possWin(p){
	var val = (p == 'X')?18:50
	for(var i=1;i<10;i+=3){
		if(board[i]*board[i+1]*board[i+2] == val){
			if(board[i] == 2)
				return i;
			else if(board[i+1] == 2)
				return i+1;
			else
				return i+2;
		}
	}
	for(var i=1;i<4;i+=1){
		if(board[i]*board[i+3]*board[i+6] == val){
			if(board[i] == 2)
				return i;
			else if(board[i+3] == 2)
				return i+3;
			else
				return i+6;
		}
	}
	if(board[1]*board[5]*board[9] == val){
		if(board[1] == 2)
			return 1;
		else if(board[5] == 2)
			return 5;
		else
			return 9;
	}
	if(board[3]*board[5]*board[7] == val){
		if(board[3] == 2)
			return 3;
		else if(board[5] == 2)
			return 5;
		else
			return 7;
	}
	return 0;
}

function setUpButton(button,text){
	button.innerHTML = text;
	button.disabled = true;
}

function go(n){
	if(turn%2==0){
		board[n] = 5;
		setUpButton(document.getElementById(buttons[n]),'O');
	}
	else{
		board[n] = 3;
		setUpButton(document.getElementById(buttons[n]),'X');
	}
}

function search(id){
	for(var i=1;i<10;i++){
		if(buttons[i] == id)
			return i
	}
}

function empty(){
	for(var i=1;i<10;i++){
		if(board[i] == 2)
			return i;
	}
}

function callPopup(title,message){
	document.getElementById("pop-title").innerHTML = title;
	document.getElementById("pop-message").innerHTML = message;
	$('#GameEnd').modal('show');
}

function user(id){
	turn+=1;
	n = search(id);
	go(n);
	if(evaluate() == 1)
		callPopup("You Win!","Congratulations!! You beat the AI.");
	else if(turn == 9)
		callPopup("Game Drawn!","Better luck next time.");
	else
		cpu();
}

function cpu(){
	turn+=1;
	if(turn == 2){
		if(board[5] == 2)
			go(5);
		else
			go(1);
	}
	else if(turn == 4){
		var poss = possWin('X');
		if(poss!=0)
			go(poss);
		else
			go(make2());
	}
	else if(turn == 6){
		var posso = possWin('O');
		var possx = possWin('X');
		if(posso!=0){
			go(posso);
			callPopup("You Lose!","AI beat you.Better Luck next time!");
		}
		else if(possx!=0)
			go(possx);
		else
			go(make2());
	}
	else if(turn == 8){
		var posso = possWin('O');
		var possx = possWin('X');
		if(posso!=0){
			go(posso);
			callPopup("You Lose!","AI beat you.Better Luck next time!");
		}
		else if(possx!=0)
			go(possx);
		else
			go(empty());
	}
}