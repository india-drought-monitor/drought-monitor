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
    }).addTo(map);

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
    });

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

    var imageUrl1 = "https://docs.google.com/uc?id=1GVU14sfowcy2SYcq39mRI_xG5ZdEy-X7",
        imageBounds1 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image1 = L.imageOverlay(imageUrl1, imageBounds1, {
        attribution: "Ending on: " + addDays(date, 0)
    }).addTo(map);

    var imageUrl2 = "https://docs.google.com/uc?id=16WN3ZNz1zdLyRgTHLVdYVR6W54uRG-kD",
        imageBounds2 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image2 = L.imageOverlay(imageUrl2, imageBounds2, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUrl3 = "https://docs.google.com/uc?id=1AtJ63X9DoiQ_rgLxyiPCpdkUDHqxV4Ur",
        imageBounds3 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image3 = L.imageOverlay(imageUrl3, imageBounds3, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUrl4 = "https://docs.google.com/uc?id=1BIQZBQkb6SErPNakag885Mp2GXrJFWIT",
        imageBounds4 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image4 = L.imageOverlay(imageUrl4, imageBounds4, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUrl6 = "https://docs.google.com/uc?id=1q9iSvZOYycZByu-eGOAGzdZEMmGUQmXO",
        imageBounds6 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image6 = L.imageOverlay(imageUrl6, imageBounds6, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUrl9 = "https://docs.google.com/uc?id=1FGLJNMbbeUas_ZcI1zhqU546zcb1djVc",
        imageBounds9 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image9 = L.imageOverlay(imageUrl9, imageBounds9, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUrl12 = "https://docs.google.com/uc?id=1vVnFlkLAfuGA9g4uhdiIFrROeFpuGGvw",
        imageBounds12 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image12 = L.imageOverlay(imageUrl12, imageBounds12, {
        attribution: "Ending on: " + addDays(date, 0)
    })

    var imageUr24 = "https://docs.google.com/uc?id=1V_BrrwQvAvaTH9uCTUlm83ElE2jixgkP",
        imageBounds24 = [[5.9484095274736717, 98.3478180095000880], [37.9663826133689355, 60.8240580598229599]];
    var Image24 = L.imageOverlay(imageUr24, imageBounds24, {
        attribution: "Ending on: " + addDays(date, 0)
    })


    // layer control
    var baseLayers = {
        "1 Month": Image1,
        "2 Month": Image2,
        "3 Month": Image3,
        "4 Month": Image4,
        "6 Month": Image6,
        "9 Month": Image9,
        "12 Month": Image12,
        "24 Month": Image24,
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
