$(document).ready(function(){
	var val;
	var combo = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];
	var game_over = false;
	var arrX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	var arrO = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	var all_steps = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	var match = [];
	var el = [];
	var f_coin, arr_f, arr_fO, x, o, arr_x, arr_o;
	
	$(".newGame").click(function(){
		location.reload();
	});

	$("#X").click(function(){
		$("#X, #O").off();
		$(this).css("backgroundColor", "#8FBC9A");
		$("#O").css("backgroundColor", "#BEBEBE");
		console.log("clicked");
		x = "X";
		o = "O";
		arr_x = arrX;
		arr_o = arrO;
		gameStart(x,o, arr_x, arr_o);

	});
	$("#O").click(function(){
		$("#O, #X").off();
		$(this).css("backgroundColor", "#8FBC9A");
		$("#X").css("backgroundColor", "#BEBEBE");
		x = "O";
		o = "X";
		arr_x = arrO;
		arr_o = arrX;
		firstOstep();
		gameStart(x,o, arr_x, arr_o);
	});

	function gameStart(x,o, arr_x, arr_o){
		$("td").click(function(){
			val = $(this).html();
			if(val.length == 0){
				$(this).html(x);
				var n = $(this).attr("id");
				n = n[1];
				arr_x[n-1] = parseInt(n);
				all_steps[n-1] = parseInt(n);
				var arr_f = arr_x.filter((x) => x > 0);
				wonGame(arr_f);
			}
			if($(this).is("#c5")){
				alternativeStep(arr_o);
			}else if($(this).is("#c2, #c4, #c6, #c8, #c1, #c3, #c7, #c9") && game_over == false){
				if($("#c5").html().length == 0){
					setTimeout(function() {$("#c5").html(o);}, 1000);
					if(arr_o[4] === 0){
						arr_o[4] = 5;
						all_steps[4] = 5;
					}
				}else{
					var step = searchComb(arr_o);	
					if(typeof step != "undefined" && step != 0 && step != false && step != "undefined"){
						if($("#c" + step).text().length == 0){
							setTimeout(function() {console.log("step" + step); $("#c" + step).html(o);}, 1000);
							if(arr_o[step - 1] === 0){
								arr_o[step - 1] = parseInt(step);
								all_steps[step-1] = parseInt(step);
							}
							setTimeout(function() {console.log("step" + step); wonGame(arr_o);}, 1100);						
						}
					}else{
						var step = searchComb(arr_f);
						if($("#c" + step).text().length == 0 && typeof step !== "undefined"){
							setTimeout(function() { $("#c" + step).html(o);}, 1000);
							if(arr_o[step - 1] === 0){
								arr_o[step - 1] = parseInt(step);
								all_steps[step-1] = parseInt(step);
							}
							setTimeout(function() {wonGame(arr_o);}, 1100);					
						}else{
							alternativeStep(arr_o);
							setTimeout(function() {wonGame(arr_o);}, 1100);
						}
					}	
				}
			}
		});
		
	}
	
	function searchComb(arr){
		arr = arr.filter((x) => x > 0);
		first:  for(var i = 0; i < combo.length; i++){
					for(var j = 0; j < arr.length; j++){
						if(combo[i][0] == arr[j] || combo[i][1] == arr[j] || combo[i][2] == arr[j]){
							match = combo[i];
							f_coin = parseInt(arr[j]);
							for(k = 0; k < match.length; k++){
								for(m = 0; m < arr.length; m++){
									if((match[k] == arr[m]) && (arr[m] !== f_coin)){
										el.push(f_coin);
										el.push(parseInt(match[k]));
										var step = (el.indexOf(match[0]) == -1) ? match[0] : (el.indexOf(match[1]) == -1) ? match[1] : (el.indexOf(match[2]) == -1) ? match[2] : false;
										var step_game = $("#c" + step).text().length;
										if(step_game == 0){
											return step;
										}else{
											k = 0;
											m = 0;
											el = [];
											index = [];
											continue first;
										}
									}
								}
							}
						}
					}
				}
					
	}
	
	function alternativeStep(arr_o){
		var zero_steps = all_steps.map(function(x, i){ if(x == 0){ return i;}}).filter((x) => Boolean(x) == true);
		var rand = zero_steps[Math.floor(Math.random() * zero_steps.length)] + 1;
		if($("#c" + rand).text().length == 0){
			arr_o[rand - 1] = parseInt(rand);
			all_steps[rand - 1] = parseInt(rand);
			setTimeout(function() {console.log("rand " + rand); $("#c" + rand).text(o);}, 1000);
		}				
	}
	
	function wonGame(arr){
		arr = arr.filter((x) => x > 0);
		for(var i = 0; i < combo.length; i++){
			if(arr.indexOf(parseInt(combo[i][0])) != -1 && arr.indexOf(parseInt(combo[i][1])) != -1 && arr.indexOf(parseInt(combo[i][2])) != -1){
				match = combo[i];
				$("#c" + combo[i][0]).css("backgroundColor", "#8FBC9A");
				$("#c" + combo[i][1]).css("backgroundColor", "#8FBC9A");
				$("#c" + combo[i][2]).css("backgroundColor", "#8FBC9A");
				var arrO = [1, 1, 1, 1, 1, 1, 1, 1, 1];
				$("td").off();
				game_over = true;
			}
		}
	}
	
	function firstOstep(){
		var arr_for_first_step = all_steps.map(function(x, i){ return i;});
		var rand = arr_for_first_step[Math.floor(Math.random() * arr_for_first_step.length)] + 1;
		if($("#c" + rand).text().length == 0){
			arrX[rand - 1] = parseInt(rand);
			all_steps[rand - 1] = parseInt(rand);
			setTimeout(function() {console.log("rand " + rand); $("#c" + rand).text("X");}, 1000);
		}
	}
});


