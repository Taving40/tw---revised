window.onload = function(){
	
	let loginDate = new Date();
	let timeObjLogin = {timeLogin:loginDate.getTime()};
	let timeObjCurrent = {timeNow:loginDate.getTime()};
	timeObjCurrent.timeDiff = 0;
	setInterval(function(){ 
		let temp = new Date();
		timeObjCurrent.timeNow = temp.getTime();
		timeObjCurrent.timeDiff = timeObjCurrent.timeNow - timeObjLogin.timeLogin;
	}, 1000);
	
	setInterval(function(){
		if (timeObjCurrent.timeDiff > Math.pow(10,6)*3.6)
			alert("You've been logged on for more than an hour! Consider taking a break.");
	}, 10000);
	
	if (document.title === "First page"){
		let buttonAdd = document.getElementById("buttonPadding").children[0];
		let buttonRemove = document.getElementById("buttonPadding").children[3];

		buttonAdd.addEventListener("click", addInsp);
		buttonRemove.addEventListener("click", removeInsp);
		
		function updateInspo()
		{
			let inspArray;
			
			if (localStorage.getItem("inspArray") === null)
			{
				inspArray = [];
			}
			else 
			{
				inspArray = JSON.parse(localStorage.getItem("inspArray"));
			}
			
			let count = inspArray.length;
			let pictures = Array.from(document.getElementsByClassName("gallery"));
			pictures.forEach(function(img){img.style.display = "none";});
			pictures.forEach(function(img, i){
				if (i+1<=count)
					{img.style.display = "block";}
			});
		}
		
		function addInsp(e)
		{
			let inspArray;
			
			if (localStorage.getItem("inspArray") === null)
			{
				inspArray = [];
			}
			else 
			{
				inspArray = JSON.parse(localStorage.getItem("inspArray"));
			}
			let count = inspArray.length;
			
			if (count <= 5)
				{inspArray.push("test");}
			else
				{alert("No more photos available");}
			
			localStorage.setItem("inspArray", JSON.stringify(inspArray));
			updateInspo();
		}
		function removeInsp(e)
		{
			localStorage.removeItem("inspArray");
			updateInspo();
		}
		
			
	}
	else if(document.title === "Second page")
	{ 
		let portrait1 = document.getElementById("Poe").getElementsByTagName("img")[0];
		portrait1.onmouseover = function(){portrait1.title = "Edgar Allan Poe";};
		portrait1.onmouseout = function(){portrait1.title = "";};
		
		let portrait2 = document.querySelector("div:nth-child(odd)").getElementsByClassName("vert")[0];
		portrait2.onmouseover = function(){portrait2.title = "Lucian Blaga";};
		portrait2.onmouseout = function(){portrait2.title = "";};
		
		let portrait3 = document.querySelector("#Dickinson p img");
		portrait3.onmouseover = function(){portrait3.title = "Emily Dickinson";};
		portrait3.onmouseout = function(){portrait3.title = "";};
		
		let portrait4 = document.querySelector("div:nth-of-type(4)").children[1].children[0];
		portrait4.onmouseover = function(){portrait4.title = "Ion Barbu";};
		portrait4.onmouseout = function(){portrait4.title = "";};
	}
	
	else if(document.title === "Third page")
	{
		function isScrolledIntoView(img) {
			let dist = img.getBoundingClientRect();
			let imgTop = dist.top;
			let imgBottom = dist.bottom;

			let isVisible = (imgTop >= 0) && (imgBottom <= window.innerHeight);

			return isVisible;
		}
		
		let animated = Array.from(document.getElementsByClassName("floaty")); 
		animated.forEach(function(img) {
			img.classList.add("at_scroll"); //presupun ca adaug la mai multe elemente prin tot DOM-ul acea clasa, pentru a adauga un criteriu dupa care sa le modific
		}); //util in cazul in care nu am doar 3 imagini pe care vreau sa le modific, ci le selectez dupa mai multe criterii diferite
		
		animated = Array.from(document.getElementsByClassName("at_scroll"));
		
		let nthAnimation = 1;
		function checkAnimation(){
			animated = Array.from(document.getElementsByClassName("at_scroll"));
			animated.forEach(function(img, i) {
			if(isScrolledIntoView(img)){
				img.classList.add("img"+String(nthAnimation++)); //face animatia sa ruleze
				img.classList.remove("at_scroll");
			}
		});
		}
		
		window.addEventListener("scroll", checkAnimation);
		
	}
	
	else if(document.title === "Fourth page")
	{	
		let inTabelArray = document.querySelector(".nested");
		inTabelArray = Array.from(inTabelArray.children);
		
		var interval;
		
		function changeColor(e){
			interval = setInterval(function(toChange){
				returnColor = toChange.backgroundColor;
				if(toChange.backgroundColor === "lightskyblue")
					toChange.backgroundColor = "white";
				else
					toChange.backgroundColor = "lightskyblue";
			}, 500, e.target.style);
		}
		
		function changeColorStop(e){
			clearInterval(interval);
			
			let index = inTabelArray.findIndex(function(elem){return elem==e.target});
			if (index%4 == 2 || index%4 == 1)
				e.target.style.backgroundColor = "lightskyblue";
			else 
				e.target.style.backgroundColor = "white";
				
		}
		
		inTabelArray.forEach(function(div){
			div.addEventListener("mouseenter", changeColor, true); 
			div.addEventListener("mouseleave", changeColorStop, true);
		});
		
		document.querySelector("form").addEventListener("submit", changeAnimation);
		
		function changeTable1(target, color){
			if (target.tagName == "TR")
			{
				for (let i = 0; i < target.children.length; i++)
				{
					target.children[i].innerHTML = `<div style=` + `color:${color.toLowerCase()}` + `>` + target.children[i].textContent +  `</div> `; 
				}					
			}
			else 
			{
				target.innerHTML = `<div style=` + `background-color:${color.toLowerCase()}` + `>` + target.textContent +  `</div> `; 
			}
		}
		function changeTable2(target, color){
			if (target.tagName == "TR")
			{
				for (let i = 0; i < target.children.length; i++)
				{
					target.children[i].innerHTML = `<div style=` + `background-color:${color}` + `>` + target.children[i].textContent +  `</div> `; 
				}					
			}
			else 
			{
				target.innerHTML = `<div style=` + `color:${color}` + `>` + target.textContent +  `</div> `; 
			}
		}
		
		function rollback(unchangedTable)
		{
			let changedTable = document.getElementById("table");
			changedTable.parentNode.removeChild(changedTable);
			document.body.appendChild(unchangedTable);
		}
		
		function changeAnimation(e){
			e.preventDefault(); 
			let color = document.querySelector("form").children[13].value;
			let activation = document.querySelector("form").firstChild.nextSibling.checked;
			let type;
			if (document.querySelector("form").children[4].checked)
				type = 1;
			else if(document.querySelector("form").children[7].checked)
				type = 2;
			else 
				type = 0;
			
			if (activation === true && type != 0 & color != "")
			{	
				let tr = document.createElement('tr');
				let td = document.createElement('td');
				tr.appendChild(td);
				td = document.createElement('td');
				td.appendChild(document.createTextNode('Remove all changes'));
				td.style = "text-align:center";
				tr.appendChild(td);
				td = document.createElement('td');
				tr.appendChild(td);
				
				let unchangedTable = document.querySelector("#table").cloneNode(true);
				
				if(document.querySelector("#table").children[0].children.length == 8)
				{
					document.querySelector("#table").children[0].appendChild(tr);
					document.querySelector("#table").children[0].lastChild.addEventListener("click", function(){ rollback(unchangedTable); });
				}
				
				
				if (type == 1)
				{	
					let tableRows = document.querySelectorAll("#table tr");
					for (let i = 0; i < tableRows.length; i++)
					{
						tableRows[i].addEventListener("click", function(){changeTable1(tableRows[i], color);}, true);
						for (let j = 0; j < tableRows[i].children.length; j++)
							tableRows[i].children[j].addEventListener("click", function(){changeTable1(tableRows[i].children[j], color);}, true);
					}
				}
				else if (type == 2)
				{
					let tableRows = document.querySelectorAll("#table tr");
					for (let i = 0; i < tableRows.length; i++)
					{
						tableRows[i].addEventListener("click", function(){changeTable2(tableRows[i], color);}, true);
						for (let j = 0; j < tableRows[i].children.length; j++)
							tableRows[i].children[j].addEventListener("click", function(){changeTable2(tableRows[i].children[j], color);}, true);
					}
				}
			}
				
			
		}
		
		
		
	}

};