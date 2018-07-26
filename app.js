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
			document.getElementById("restaurantInfo").innerHTML = point.description
			$('#selectedRestaurant').modal({show: true})
		});
	});

};

window.getPlaces = (filter) => {
	let points = [
		{lat: -33.4227084, lng: -70.6126471, description: '<b>El Huerto</b><br>Restaurant de comida vegetariana', type: 'vegetariana'},
		{lat: -33.4337536, lng: -70.685727, description: '<b>Casa Oriental</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4434129, lng: -70.6568968, description: '<b>Restaurante Chino Kam Cheng</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4770278, lng: -70.7255482, description: '<b>Buenos Chinos</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4337536, lng: -70.685727, description: '<b>Xing Fu</b><br>Restaurant de comida china', type: 'china'},
		{lat:-33.4181889, lng: 	-70.6651911, description: '<b>Nueva China</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4242757, lng: -70.657123, description: '<b>Foodlays</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4231949, lng:-70.6596767, description: '<b>Restaurant China</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4240554, lng: -70.6717644, description: '<b>Restaurante Hao Hwa</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4252126, lng: -70.6574013, description: '<b>Los Chinos</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4252126, lng:-70.6574013, description: '<b>China Wok</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4424559, lng:	-70.6613808, description: '<b>Panda Junior</b><br>Restaurant de comida china', type: 'china'},

		{lat: -33.442451, lng: -70.6613808, description: '<b>La Piccola Italia</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.442451, lng: -70.6613808, description: '<b>Pasta Pazza</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: 33.4294151, lng: -70.6358891, description: '<b>Rivoli</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4220367, lng: -70.6203966, description: '<b>Signore</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4318275, lng: -70.6362606, description: '<b>Squadritto Ristorante</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4312815, lng: -70.6349545, description: '<b>Lucila de Nosotros (Da Noi)</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4424224, lng: -70.6558232, description: '<b>Italissimo</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4428057, lng: -70.640972, description: '<b>IL Montrone</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4453569, lng: -70.6368835, description: '<b>Sole Mio</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.427164, lng: -70.619889, description: '<b>Fortunata Bistró</b><br>Restaurant de comida Italiana', type: 'Italiana'},
		{lat: -33.4240479, lng: -70.6140096, description: '<b>Da Renzo</b><br>Restaurant de comida Italiana', type: 'Italiana'},

		{lat: -33.4102274, lng: -70.6686062, description: '<b>El Cántaro de Oro</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4287426, lng: -70.6432182, description: '<b>La Gloria Sanguchería Peruana/b><br>RSanguchería Peruana', type: 'Peruana'},
		{lat: -33.4335797, lng: -70.6489081, description: '<b>El Ají Seco</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat:	-33.4245698,lng: 	-70.6588588, description: '<b>Ché Peruano</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4398386, lng: -70.6409837, description: '<b>Tambo (Lastarria)</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4388985, lng: -70.6357373, description: '<b>El Templo Del Inka</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4349771, lng: -70.6490732, description: '<b>El Encuentro Peruano</b><br>Restaurant de comida Peruana', type: 'Peruana'},
		{lat: -33.4352188, lng: -70.6486655, description: '<b>Restaurante Victoria</b><br>Restaurant de comida Peruana', type: 'Peruan'},
		

		{lat: -33.4434129, lng: -70.6568968, description: '<b>Chino</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4434129, lng: -70.6568968, description: '<b>Chino</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4434129, lng: -70.6568968, description: '<b>Chino</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4434129, lng: -70.6568968, description: '<b>Chino</b><br>Restaurant de comida china', type: 'china'},
		{lat: -33.4434129, lng: -70.6568968, description: '<b>Chino</b><br>Restaurant de comida china', type: 'china'},

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
