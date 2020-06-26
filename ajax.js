window.onload = function() {

document.querySelector("button").addEventListener('click', loadText);

function loadText(){
      
    let xhr = new XMLHttpRequest();
	
	console.log(Math.round(Math.random()*10%10));

    xhr.open('GET', 'http://localhost:3000/myJSON', true);
	  
    xhr.onreadystatechange = function(){
		
		if(this.readyState == 4 && this.status == 200){
			
			//let pieces = JSON.parse(this.responseText);
			
			
			
			document.getElementById('randomPiece').innerHTML = this.responseText; //pieces[Math.floor(Math.random()*10)].text;
		}
		else if(this.status = 404){
			document.getElementById('randomPiece').innerHTML = 'Not Found';
		}
	}

    xhr.send();
    }
}