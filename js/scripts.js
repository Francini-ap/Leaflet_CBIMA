// Mapa Leaflet
var mapa = L.map('mapid').setView([9.9, -84.05], 12);

// Definición de capas base

//Primer capa base

var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Segunda capa base
var capa_hot = L.tileLayer(
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
   {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
   }
).addTo(mapa);

// Tercera capa base
var capa_esri = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	{
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}
	).addTo(mapa);	
	
// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "OSM Forest" : capa_hot,
  "ESRI": capa_esri
  
};  
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);


// Capa vectorial poblados CBIMA en formato GeoJSON
$.getJSON("https://francini-ap.github.io/datos_tarea02/poblados/poblados_cbima.geojson", function(geodata) {
  var capa_poblados = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#f4f80d", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Comunidades</strong>: " + feature.properties.NOMBRE;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_poblados, 'Comunidades');

});	

// Capa vectorial rios en formato GeoJSON
$.getJSON("https://francini-ap.github.io/datos_tarea02/rios/rios_cbima.geojson", function(geodata) {
  var capa_rios = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': " #093af1 ", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre</strong>: " + feature.properties.NOMBRE;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_rios, 'Ríos');

});	

// Capa vectorial trama verde en formato GeoJSON
$.getJSON("https://francini-ap.github.io/datos_tarea02/tramaverde/tramaverde_cbima.geojson", function(geodata) {
  var capa_tramaverde = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': " #8cf00d  ", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Categoría</strong>: " + feature.properties.categoria+ "<br>" + "<strong>Clase</strong>: " + feature.properties.clase;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_tramaverde , 'Trama verde');

});	

// Capa vectorial límite cbima formato GeoJSON
$.getJSON("https://francini-ap.github.io/datos_tarea02/cbima/limite_cbima.geojson", function(geodata) {
  var capa_limite = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#f02108", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>CBI</strong>: " + feature.properties.nombre_cb;
      layer.bindPopup(popupText);
    }
	
  }).addTo(mapa);

  control_capas.addOverlay(capa_limite , 'Límite CBIMA');


});	

// Control de escala
   L.control.scale ({position:'topright', imperial: false}).addTo(mapa)
   