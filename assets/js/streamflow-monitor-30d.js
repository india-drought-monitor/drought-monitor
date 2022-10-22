function setInitialMapZoom() {
    var viewportWidth = window.innerWidth;
    var mapZoom;
    if (viewportWidth <= [767]) {
        mapZoom = [4];
    } if (viewportWidth >= [768]) {
        mapZoom = [4.5];
    } if (viewportWidth >= [1600]) {
        mapZoom = [5];
    } if (viewportWidth >= [2000]) {
        mapZoom = [5.75];
    }
    return mapZoom;
}
var map = L.map('map', {
    zoomDelta: 0.25,
    zoomSnap: 0,
    minZoom: setInitialMapZoom(),
    maxZoom: 8,
    maxBounds: [[8, 98], [38, 68]],
    sleep: true,
    sleepTime: 7500,
    wakeTime: 850,
    sleepNote: false,
    hoverToWake: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
      title: "Fullscreen mode",
      titleCancel: "Exit fullscreen mode"
    }

})
map.setView([23, 78], setInitialMapZoom());

// Add Scale
L.control.scale({ position: 'bottomleft' }).addTo(map);
// Search Bar
L.Control.geocoder().addTo(map);
// State boundary
var stateBoundary = L.geoJson(AllStatesBoundary,
    {
        fillColor: "none",
        weight: 2,
        opacity: 1,
        color: "black",
        interactive: false,
    }).addTo(map);
map.fitBounds(stateBoundary.getBounds());

// District Boundary
function DistrictBoundaryStyle(feature) {
    return {
        fillColor: "black",
        fillOpacity: 0.00001,
        weight: 0.2,
        opacity: 1,
        color: "black",

    };
}
function onEachFeatureDistrict(feature, layer) {
    layer.bindPopup(feature.properties.District + ", " + feature.properties.STATE);
    layer.on('mouseover', function (e) {
        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });

}
var DistrictBoundary = L.geoJson(DistrictBoundary,
    {
        style: DistrictBoundaryStyle,
        onEachFeature: onEachFeatureDistrict
    })

// Basin Boundary
var basinBoundary = L.geoJson(AllRiverBasin,
    {
        fillColor: "none",
        weight: 2,
        opacity: 1,
        color: 'red',
        interactive: false,
    });

// Rivers
var majorRivers = L.geoJson(Rivers,
    {
        fillColor: "none",
        weight: 2,
        opacity: 0.9,
        color: 'cornflowerblue',
        interactive: false,
    }).addTo(map);

let dateDataUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLl3ffx0cSFNJ87ynXoxo7AlYkUlpYHMyFQsMtp_5SiZi-NNJukxoeg06oeZJJgw/pub?output=csv";

function dateValue(data) {
    data = data.data;
    var date = data[0].Var7 + "/" + data[0].Var8 + "/" + data[0].Var9;

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toDateString()
    }


    var imageUrl1 = "https://docs.google.com/uc?id=1VIocD6K6AiWmocNbbtDpevzKiKV1rark",
        imageBounds1 = [[6.6909658337074802, 97.6641444261154561], [37.2184103603517471, 67.9942123861746808]];
    var Image1 = L.imageOverlay(imageUrl1, imageBounds1, {
        attribution: "Observed: " + addDays(date, 0)
    }).addTo(map);

    var imageUrl2 = "https://docs.google.com/uc?id=1AogUVTNV4JScDMIrD5MvvjuxHJKffxRL",
        imageBounds2 = [[6.6909658337074802, 97.6641444261154561], [37.2184103603517471, 67.9942123861746808]];
    var Image2 = L.imageOverlay(imageUrl2, imageBounds2, {
        attribution: "Lead forecast till: " + addDays(date, 7)
    })

    var imageUrl3 = "https://docs.google.com/uc?id=15h8Rh8uMwkeO3RJ8dD4NA82F7Yg0O5LR",
        imageBounds3 = [[6.6909658337074802, 97.6641444261154561], [37.2184103603517471, 67.9942123861746808]];
    var Image3 = L.imageOverlay(imageUrl3, imageBounds3, {
        attribution: "Lead forecast till: " + addDays(date, 15)
    })

    var baseLayers = {
        "Observed (VIC Simulated)": Image1,
        "7 Days lead forecast": Image2,
        "15 Days lead forecast": Image3,
    };

    var overlays = {
        "States Boundary": stateBoundary,
        "District Boundary": DistrictBoundary,
        "River Basin Boundary": basinBoundary,
        "Rivers": majorRivers,
    };


    function setLayer() {
        var viewportWidth = window.innerWidth;
        var layerCollapesed;
        if (viewportWidth < [768]) {
            layerCollapesed = true;
        } else {
            layerCollapesed = false;
        }
        return layerCollapesed;
    }

    var options = {
        collapsed: setLayer(),
    };
    L.control.layers(baseLayers, overlays, options).addTo(map);
}


Papa.parse(dateDataUrl, {
    download: true,
    header: true,
    complete: dateValue,
});
