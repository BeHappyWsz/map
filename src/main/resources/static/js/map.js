var mapObj;
var marker = new Array();
var windowsArr = new Array();
function mapInit(data) {
    mapObj = new AMap.Map("map");//绑定页面渲染位置
    var MSearch;
    mapObj.plugin(["AMap.PlaceSearch"], function() {     
        MSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize:10,
            pageIndex:1,
            city:"021", //城市021上海
            level:15
        }); 
        AMap.event.addListener(MSearch, "complete", keywordSearch_CallBack);//返回地点查询结果
        MSearch.search(data); //关键字查询
    });
}
function keywordSearch_CallBack(data) {
    var poiArr = data.poiList.pois;
    var resultCount = poiArr.length;
    for (var i = 0; i < resultCount; i++) {
	    addmarker(i, poiArr[i]);
    }
    mapObj.setFitView();
}
function addmarker(i, d) {
    var lngX = d.location.getLng();
    var latY = d.location.getLat();
    var markerOption = {
	    map:mapObj,
        icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",
        position:new AMap.LngLat(lngX, latY)
    };
    var mar = new AMap.Marker(markerOption);          
    marker.push(new AMap.LngLat(lngX, latY));

    var infoWindow = new AMap.InfoWindow({
    	content:"<h3><font color=\"#00a6ac\">&nbsp;&nbsp;" + (i + 1) + ". " + d.name + "</font></h3>" + TipContents(d.type, d.address, d.tel),
        size:new AMap.Size(300, 0), 
        autoMove:true,  
		offset:new AMap.Pixel(0,-30)
    });
    windowsArr.push(infoWindow); 
    var aa = function (e) {infoWindow.open(mapObj, mar.getPosition());};
	AMap.event.addListener(mar, "click", aa);
}
function TipContents(type, address, tel) {  //窗体内容
    if (type == "" || type == null || typeof(type) == "undefined") {
        type = "暂无";
    }
    if (address == "" || address == null || typeof(address) == "undefined") {
        address = "暂无";
    }
    if (tel == "" || tel == null || typeof(address) == "tel") {
        tel = "暂无";
    }
    var str = "&nbsp;&nbsp;地址：" + address + "<br />&nbsp;&nbsp;电话：" + tel + " <br />&nbsp;&nbsp;类型：" + type;
    return str;
}

