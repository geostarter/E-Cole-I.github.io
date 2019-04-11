//Based on the Scroller function from @sallar
var $content = $('header .content')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
 
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    $blur.css('background-image',$('header:first-of-type').css('background-image'));
  },


  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 2
      , opaScroll = 1.4 - currentScrollY / 400;
   if(currentScrollY > wHeight)
     $('nav').css('position','fixed');
   else
     $('nav').css('position','absolute');
    
    $content.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};


var scroller = new Scroller();  
scroller.init();

var myStyle = {
    "color": "#FF8819",
    "weight": 2,
    "opacity": 0.65
};


const onEachFeature = (feature, layer) => {
  // eslint-disable-line no-use-before-define
  const popupContent = `
  <table>
  <tr>
    <th>id:</th>
    <td>${feature.properties.ADMIN}</td>
  </tr>
  <tr>
    <th>shid:</th>
    <td>${features.properties}</td>
  </tr>
  <tr>
    <th>area:</th>
    <td>${feature.properties}</td>
  </tr>
  <tr>
    <th>pop-commute-drive_alone:</th>
    <td>${feature.properties["pop-commute-drive_alone"]}</td>
  </tr>
  <tr>
    <th>pop-commute-drive_carpool:</th>
    <td>${feature.properties["pop-commute-drive_carpool"]}</td>
  </tr>
  <tr>
    <th>pop-commute-public_transit:</th>
    <td>${feature.properties["pop-commute-public_transit"]}</td>
  </tr>
  <tr>
    <th>pop-commute-drive_alone:</th>
    <td>${feature.properties["pop-commute-walk"]}</td>
  </tr>
</table>`;

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}

var mymap2 = L.map('mapid2').setView([15,-45], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiY29sZWZ1c2lvbiIsImEiOiJjamc1aGNmMW0xYzkxMnJsamY0djQ2cmJzIn0.aenDPrx_dyONEil9ploDoQ'
}).addTo(mymap2);

$.getJSON("data/visit.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data,{style: myStyle, onEachFeature: onEachFeature}).addTo(mymap2);
  });