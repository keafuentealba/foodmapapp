var map = L.map('map').fitWorld();//consumiendo api de geolocalizacion leaveleft

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(map);

function onLocationFound(e) {
	var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map)
	drawPlaces();
}

function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

window.drawPlaces = (filter) => {
	lat = -33.4883118;
	long = -70.5100325;
		var greenIcon = L.icon({
	    iconUrl: 'img/leaf-green.png',
      shadowUrl: 'img/leaf-shadow.png',
      iconSize:     [38, 95],
	    shadowSize:   [50, 64],
	    iconAnchor:   [22, 94],
	    shadowAnchor: [4, 62],
	    popupAnchor:  [-3, -76]
	});

	const points = getPlaces(filter);

	points.forEach((point) => {
		L.marker({lat: point.lat, lng: point.lng}, {icon: greenIcon}).addTo(map).on('click', (e) => {
			//se ejecuta al hacer click en el mapa
			let points = getPlaces().filter((point) => {return point.lat == e.target._latlng.lat && point.lng == e.target._latlng.lng})
			point = points[0];
			document.getElementById("restaurantInfo").innerHTML = point.description;
			document.getElementById("restaurantName").innerHTML = point.title;
			$('#selectedRestaurant').modal({show: true})
		});
	});

};

window.getPlaces = (filter) => {
	let points = [
		{lat: -33.4227084, lng: -70.6126471, title: 'El Huerto', description: 'Restaurant de comida vegetariana', type: 'Vegetariana'},
		{lat: -33.4337536, lng: -70.685727, title: 'Casa Oriental', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4434129, lng: -70.6568968, title: 'Restaurante Chino Kam Cheng', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4770278, lng: -70.7255482, title: 'Buenos Chinos', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4337536, lng: -70.685727, title: 'Xing Fu', description: 'Restaurant de comida china', type: 'China'},
		{lat:-33.4181889, lng: 	-70.6651911, title: 'Nueva China', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4242757, lng: -70.657123, title: 'Foodlays', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4231949, lng:-70.6596767, title: 'Restaurant China', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4240554, lng: -70.6717644, title: 'Restaurante Hao Hwa', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4252126, lng: -70.6574013, title: 'Los Chinos', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4252126, lng:-70.6574013, title: 'China Wok', description: 'Restaurant de comida china', type: 'China'},
		{lat: -33.4424559, lng:	-70.6613808, title: 'Panda Junior', description: 'Restaurant de comida china', type: 'China'},

		{lat: -33.442451, lng: -70.6613808, title: 'La Piccola Italia', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.442451, lng: -70.6613808, title: 'Pasta Pazza', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: 33.4294151, lng: -70.6358891, title: 'Rivoli', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4220367, lng: -70.6203966, title: 'Signore', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4318275, lng: -70.6362606, title: 'Squadritto Ristorante', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4312815, lng: -70.6349545, title: 'Lucila de Nosotros (Da Noi)', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4424224, lng: -70.6558232, title: 'Italissimo', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4428057, lng: -70.640972, title: 'IL Montrone', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4453569, lng: -70.6368835, title: 'Sole Mio', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.427164, lng: -70.619889, title: 'Fortunata Bistró', description: 'Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4240479, lng: -70.6140096, title: 'Da Renzo', description: 'Restaurant de comida Italiana', type: 'Italiana'},

		{lat: -33.4102274, lng: -70.6686062, title: 'El Cántaro de Oro', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4287426, lng: -70.6432182, title: 'La Gloria Sanguchería Peruana', description: 'RSanguchería Peruana', type: 'Peruana'},
		{lat: -33.4335797, lng: -70.6489081, title: 'El Ají Seco', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat:	-33.4245698,lng: 	-70.6588588, title: 'Ché Peruano', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4398386, lng: -70.6409837, title: 'Tambo (Lastarria)', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4388985, lng: -70.6357373, title: 'El Templo Del Inka', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4349771, lng: -70.6490732, title: 'El Encuentro Peruano', description: 'Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4352188, lng: -70.6486655, title: 'Restaurante Victoria', description: 'Restaurant de comida Peruana', type: 'Peruan'},
		{lat: -33.437663, lng: -70.6532896, title: 'D\' leite', description: 'Restaurant de comida Peruana', type: 'Peruana'},
			//falta Tailandesa, parrilladas, chilena, cafes, arabe.
		{lat: -33.4378688, lng: -70.6550062, title: 'Anverbach', description: '<b></b><br>Restaurant de parrilladas', type: 'Parilladas'},
		{lat: -33.437439, lng: -70.6545395, title: 'La Casona del Centro', description: '<b></b><br>Restaurant ', type: 'Parilladas'},
		{lat: -33.4416114, lng: -70.6522015, title: 'El Novillero', description: '<b></b><br>Restaurant ', type: 'Parilladas'},
		{lat: -33.4434129, lng:-70.6472283, title: 'El Cordobes', description: '<b></b><br>Restaurant de comida china', type: 'Parilladas'},
		{lat: -33.4409208, lng: -70.641745 ,title: 'Restaurant La Parrilla del Chef', description: '<b></b><br>Restaurant', type: 'Parilladas'},
		{lat: -33.4442517, lng: -70.6363935, title: 'Parrilladas Argentina Hipodromo', description: '<b></b><br>Restaurant', type: 'Parilladas'},
		{lat: -33.4469828, lng: -70.6482208, title: 'VIKINGOS RESTAURANT', description: '<b></b><br>Restaurant ', type:'Parilladas'},

	];

	if(filter){
		points = points.filter((point) => { return point.type === filter})
	}

	return points

};

 window.changePages = () => {
  let inicio = document.getElementById("firtsScreen");
  let paginaPincipar = document.getElementsByClassName("secondScreen");

  firtsScreen.classList.add("hide");
  secondScreen.classList.remove("hide");
};

window.filter = () => {
	let tipo = document.getElementById('tipo').value;


};


window.filterRestaurants = () => {
	const selectedType = document.getElementById('tipo').value;
	console.log(Object.values(map._layers));
	Object.values(map._layers).forEach((ml) => {
		if (ml instanceof L.Marker && ml.options.icon.options.iconUrl == 'img/leaf-green.png'){
			map.removeLayer(ml);
		}
		drawPlaces(selectedType)
	});
}
