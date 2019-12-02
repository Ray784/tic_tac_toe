var board = new Array(3); 
for(var i = 0; i < 3; i++)
    board[i] = new Array(3); 
for(var i=0;i<3;i++)
	for(var j=0;j<3;j++)
		board[i][j] = 0;
var player = 1;
var opponent = 2;
var turn = 0;

function max(a,b){
	return a>b?a:b;
}

function min(a,b){
	return a<b?a:b;
}

function isMovesLeft(){
	var i,j;
	for(i=0;i<3;i++)
		for(j=0;j<3;j++)
			if(board[i][j] == 0)
				return 1;
	return 0;
}

function evaluate(){
	var i;
	for(i=0;i<3;i++)
	{
		if(board[i][0] != 0 && board[i][0] == board[i][1] && board[i][0] == board[i][2]){
			if(board[i][0] == player)
				return 10;
			else
				return -10;
		}

		if(board[0][i] != 0 && board[0][i] == board[1][i] && board[0][i] == board[2][i]){
			if(board[0][i] == player)
				return 10;
			else
				return -10;
		}
	}
	if(board[0][0] != 0 && board[0][0] == board[1][1] && board[0][0] == board[2][2]){
		if(board[0][0] == player)
				return 10;
			else
				return -10;
	}
	if(board[0][2] != 0 && board[1][1] == board[0][2] && board[0][2] == board[2][0]){
		if(board[0][2] == player)
				return 10;
			else
				return -10;
	}
	return 0;
}

function minimax(depth, isMax){
	var score = evaluate();
	var best = 0,i,j;

	if(score == 10 || score == -10)
		return score;
	if(isMovesLeft() == 0)
		return 0;
	if(isMax == 1){
		best = -1000;
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				if(board[i][j] == 0){
					board[i][j] = player;
					best = max(best, minimax(depth+1,!isMax));
					board[i][j] = 0;
				}
			}
		}
		return best;
	}
	else{
		best = 1000;
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				if(board[i][j] == 0){
					board[i][j] = opponent;
					best = min(best, minimax(depth+1,!isMax));
					board[i][j] = 0;
				}
			}
		}
		return best;
	}
}

function findBestMove(){
	var bestMove = -1000,moveVal;
	var i,j,bi,bj;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			if(board[i][j] == 0){
				moveVal = -1000;
				board[i][j] = player;
				moveVal = minimax(0,false);
				board[i][j] = 0;
				if(moveVal > bestMove){
					bestMove = moveVal;
					bi = i;
					bj = j;
				}
			}
		}
	}
	var id = bi+'b'+bj;
	setUpButton(document.getElementById(id),'O');
	board[bi][bj] = player;
}

function callPopup(title,message){
	document.getElementById("pop-title").innerHTML = title;
	document.getElementById("pop-message").innerHTML = message;
	$('#GameEnd').modal('show');
}

function setUpButton(button,text){
	button.innerHTML = text;
	button.disabled = true;
	button.style.backgroundColor = "#CCCCCC";
}

function user(id){
	indx = id.split('b');
	turn += 1;
	board[indx[0]][indx[1]] = opponent;
	setUpButton(document.getElementById(id),'X');
	if(evaluate(board) == -10)
		callPopup("You Win!","Congratulations!! You beat the AI.");
	else if(turn == 9)
		callPopup("Game Drawn!","Better luck next time.");
	else
		cpu();
}

function cpu(){
	findBestMove();
	turn+=1;
	if(evaluate(board) == 10)
		callPopup("You Lose!","AI beat you.Better Luck next time!");
	else if(turn == 9)
		callPopup("Game Drawn!,Better luck next time.");
}