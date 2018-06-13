Highcharts.setOptions({ global: { useUTC: false } });
$(document).ready(function () {
    Highcharts.setOptions({
        colors: ['#15B26D', '#B5DA57', '#ECF0BD', '#BCDB9F', '#7DC7BB', '#7EC8d5', '#BDE0C2', '#E0F1FB', '#B4DCE6', '#7DCAF4']
    });
     var BaseUrl = "http://localhost:9000/app";
    var requestUrl =BaseUrl+"/netstat";
    $.get(requestUrl, function (data, textStatus) {
        if (textStatus == "success") {
            var dataSet = data[0];

            $("#netname").html(dataSet.name);
            $("#ip4").html(dataSet.ipAddress[0]);
            if (dataSet.ipAddress.length == 2) { $("#ip6").html(dataSet.ipAddress[1]); $(".ip6").css("display", "block"); }
            $("#send").html(dataSet.bytesSentPersec + "bytes");
            $("#receive").html(dataSet.bytesReceivedPersec + "bytes");
        }
    }, 'jsonp');


    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
    }

    $('#NETWORK_Biao').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var requestUrl = BaseUrl+ "/netstat";
                        $.get(requestUrl, function (data, textStatus) {
                            if (textStatus == "success") {
                                var dataSet = data[0];
                                $("#send").html(dataSet.bytesSentPersec + "bytes");
                                $("#receive").html(dataSet.bytesReceivedPersec + "bytes");
                                var x = (new Date()).getTime(); // current time
                                var y = parseInt(dataSet.bytesReceivedPersec);
                                series.addPoint([x, y], true, true);
                                activeLastPointToolip(chart)
                            }
                        }, 'jsonp');

                    }, 10000);
                }
            }
        },
        title: {
            text: '网络吞吐量'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '网络吞吐量(bytes)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br/>' + this.series.name
                    + ':' +
                    Highcharts.numberFormat(this.y, 2) + 'bytes';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '吞吐量',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -9; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    }, function (c) {
        activeLastPointToolip(c)
    });

    $('#CPU_Biao').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var requestUrl = BaseUrl + "/cpustat";
                        $.get(requestUrl, function (data, textStatus) {
                            if (textStatus == "success") {
                                var dataSet = data;
                                $("#cpuValue").html(dataSet.usedPercent + "%");
                                $("#processCount").html(dataSet.processCount);
                                $("#threadCount").html(dataSet.threadCount);
                                $("#handleCount").html(dataSet.handleCount);
                                var x = (new Date()).getTime(); // current time
                                var y = parseInt(dataSet.usedPercent);
                                series.addPoint([x, y], true, true);
                                activeLastPointToolip(chart)
                            }
                        }, 'jsonp');
                    }, 10000);
                }
            }
        },
        title: {
            text: 'CPU利用率'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'CPU利用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br/>' + this.series.name
                    + ':' +
                    Highcharts.numberFormat(this.y, 2) + '%';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'CPU利用率',
            data: (function () { //设置默认数据，
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -9; i < 0; i++) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    });

    $('#MEMORY_Biao').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var requestUrl = BaseUrl+ "/memstat";
                        $.get(requestUrl, function (data, textStatus) {
                            if (textStatus == "success") {
                                var dataSet = data;
                                $("#usedGB").html(dataSet.usedGB + "GB");
                                $("#availableGB").html(dataSet.availableGB + "GB");
                                $("#cpuusedPercent").html(dataSet.usedPercent + '%');
                                //$("#handleCount").html(dataSet.handleCount);
                                var x = (new Date()).getTime(); // current time
                                var y = parseInt(dataSet.usedPercent);
                                series.addPoint([x, y], true, true);
                                activeLastPointToolip(chart)
                            }
                        }, 'jsonp');
                    }, 10000);
                }
            }

        },
        title: {
            text: '内存使用率'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '内存使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br/>' + this.series.name
                    + ':' +
                    Highcharts.numberFormat(this.y, 2) + '%';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '内存使用率',
            data: (function () { //设置默认数据，
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -9; i < 0; i++) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    });

    $('#STORAGE_Biao').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var requestUrl = BaseUrl + "/diskstat";
                        $.get(requestUrl, function (data, textStatus) {
                            if (textStatus == "success") {
                                var dataSet = data;
                                $("#totalGB").html(dataSet.totalDiskInfo.sizeGB + "GB");
                                $("#freeGB").html(dataSet.totalDiskInfo.freeSpaceGB + "GB");
                                $("#memPercent").html(parseInt(dataSet.totalDiskInfo.usedPercent) + "%");
                                $("#readBytes").html(dataSet.diskRW.readBytes + "bytes/s");
                                $("#readBytes").html(dataSet.diskRW.readBytes + "bytes/s");
                                $("#writeBytes").html(dataSet.diskRW.writeBytes + "bytes/s");
                                //$("#handleCount").html(dataSet.handleCount);
                                var x = (new Date()).getTime(); // current time
                                var y = parseInt(dataSet.totalDiskInfo.usedPercent);
                                series.addPoint([x, y], true, true);
                                activeLastPointToolip(chart)
                            }
                        }, 'jsonp');
                    }, 10000);
                }
            }

        },
        title: {
            text: '磁盘使用率'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '磁盘使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br/>' + this.series.name
                    + ':' +
                    Highcharts.numberFormat(this.y, 2) + '%';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '磁盘使用率',
            data: (function () { //设置默认数据，
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -9; i < 0; i++) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    });
    $(".highcharts-credits").css("display", "none");



});

var index = {

    // 初始化
    init: function () {
        var me = this;


    },

};