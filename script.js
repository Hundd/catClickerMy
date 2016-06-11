var model = {
	cats: [
		{
			name: 'Sam',
			clicks: 0,
			img: "img/cat1.jpg"
		},
		{
			name: 'Bob',
			clicks: 0,
			img: "img/cat2.jpg"
		},
		{
			name: 'Marta',
			clicks: 0,
			img: "img/cat3.jpg"
		},
		{	
			name: 'Penny',
			clicks: 0,
			img: "img/cat4.jpg"
		}
	],
	currentCat:  null
	
}

var view = {
	currentCat: null,
	catBox: null,
	adminElem: null,
	init: function () {
		 this.catBox = document.getElementById('main');
		 this.adminElem = document.getElementById('admin');
		 this.showMenu();
		 this.render();
		 this.adminButton();
	},
	showMenu: function (argument) {
		  var names = octopus.getCatsNames();
		  var catsList = document.getElementById('listOfCats');
		  catsList.innerHTML = '';
		  for(var i = 0; i < names.length; i+=1) {
		  	var catItem = document.createElement('li');
		  	catItem.textContent = names[i];
		  	catsList.appendChild(catItem);
		  	catItem.addEventListener('click', octopus.catSelected(i));
		  }
	},

	render: function () {
		this.catBox.innerHTML = '';
		this.currentCat = octopus.getCurrentCat();

		 var catName = document.createElement('h2');
		 catName.textContent = this.currentCat.name;
		 this.catBox.appendChild(catName);

		 var catImg = document.createElement('img');
		 catImg.src=this.currentCat.img;
		 catImg.addEventListener('click', octopus.catClicked);		 
		 this.catBox.appendChild(catImg);

		 var catClicks = document.createElement('p');
		 catClicks.textContent = this.currentCat.clicks;
		 this.catBox.appendChild(catClicks);
		 if(view.adminMenuShown === true) view.adminMenu();
		 
	},
	adminButton: function () {
		 view.adminMenuShown = false;
		 var container = view.adminElem;
		 container.textContent = '';
		 var adminButton = document.createElement('button');
		 adminButton.type="button";
		 adminButton.textContent = "Admin";
		 container.appendChild(adminButton);
		 adminButton.addEventListener('click', view.adminMenu);
		 //view.adminMenuShown = false;
	},
	adminMenu: function () {
		 view.adminMenuShown = true;
		 var container = view.adminElem;
		 container.textContent = '';
		 var form = document.createElement('form');
		 container.appendChild(form);
		 var p = document.createElement('span');
		 p.textContent = "Name: ";
		 form.appendChild(p);
		 var name = document.createElement('input');
		 name.type = "text";
		 form.appendChild(name);
		 name.value = octopus.getCurrentCat().name;
		 name.addEventListener('change', function () {
		 	 view.newCat.name = this.value;
		 })

		 form.appendChild(document.createElement('br'));
		 p = document.createElement('span');
		 p.textContent = "Clicks: ";
		 form.appendChild(p);
		 var clicks = document.createElement('input');
		 clicks.type = "number";
		 form.appendChild(clicks);
		 clicks.value = octopus.getCurrentCat().clicks;
		 clicks.addEventListener('change', function () {
		 	 view.newCat.clicks = this.value;
		 })

		 form.appendChild(document.createElement('br'));
		 p = document.createElement('span');
		 p.textContent = "Image: ";
		 form.appendChild(p);
		 var imageURL = document.createElement("input");
		 imageURL.type = "text";
		 imageURL.value = octopus.getCurrentCat().img;
		 form.appendChild(imageURL);
		 imageURL.addEventListener('change', function () {
		 	 view.newCat.img = this.value;
		 })
		 form.appendChild(document.createElement('br'));

		 var cancel = document.createElement('button');
		 cancel.textContent = "Cancel";
		 cancel.type="button";
		 form.appendChild(cancel);
		 cancel.addEventListener('click', view.adminButton);

		 var submitBtn = document.createElement('button');
		 submitBtn.type="button";
		 submitBtn.textContent= "Submit";
		 form.appendChild(submitBtn);
		 view.newCat={};
		 view.newCat.name=name.value;
		 view.newCat.clicks=clicks.value;
		 view.newCat.img=imageURL.value;
		 
		 submitBtn.addEventListener('click',function(){
		 	octopus.saveNewData(view.newCat);
		 });

	}
}

var octopus = {
	changeCat: function (numberOfCat) {
		 model.currentCat = model.cats[numberOfCat];
	},
	getCurrentCat: function () {
		 return model.currentCat;
	},
	init: function () {
		model.currentCat = model.cats[0];
		view.init();
	},
	catClicked: function () {
		 model.currentCat.clicks = +model.currentCat.clicks+1;
		 view.render();
	},
	getCatsNames: function () {
		 var catsNames = [];
		 for(var i = 0; i < model.cats.length; i += 1) {
		 	catsNames.push(model.cats[i].name);
		 }
		 return catsNames;
	},
	catSelected: function (catIndex) {
	
			return function () {
				 model.currentCat = model.cats[catIndex];
				 view.render(); 
			}	
	},
	saveNewData(newCat){
		var indexOfCurrentCat = model.cats.indexOf(model.currentCat);
		model.cats[indexOfCurrentCat] = newCat;
		model.currentCat= newCat;
		view.showMenu();
		view.render();
		view.adminButton();

	}
}
octopus.init();