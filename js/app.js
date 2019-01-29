/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	
	var minutes = 0;
	var seconds = 0;
	
	function startTimer(receivedMinutes, receivedSeconds){
		
		minutes = receivedMinutes;
		seconds = seconds;
		
		setInterval(function(){
			showTimer();
			}, 1000);
		
	}
	
	function showTimer(){
		
		//display
		//update 
		
	}
	
	function updateTime(){
		
		seconds = seconds - 1;
		
		if(seconds === -1){
			minutes = minutes - 1;
			seconds = 59;
		}
		
		if(minutes === 0 && seconds === -1){
			finishTimer();
		}
	}
	
	function finishTimer(){
		//clearInterval
		//vibrate
	}
	
	function pauseTimer(){
		clearInterval();
	}
	
	function resumeTimer(){
		setInterval(function(){
			showTimer();
			}, 1000);
	}
}());