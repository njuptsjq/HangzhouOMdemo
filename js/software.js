$(document).ready(function () {

    var baseUrl ='http://localhost:9000/app';
    var hosttUrl = baseUrl + '/host';


    $.get(hosttUrl, function (data, textStatus) {
        if (textStatus == "success") {
            var d = data;
            $("#hostname").html(d.hostname);
            $("#bootTime").html(d.bootTime);
            if (d.arch == "amd64") { d.arch = "64位"; }
            else { d.arch = "32位"; }
            $("#systemtype").html(d.os);
            $("#systemtype").html(d.platform + "(" + d.arch + ")");

            $("#systemversion").html(d.platformVersion);
        }
    },'jsonp');
    //if (config.iisUrl != config.agsUrl && config.iisUrl != config.dbUrl && config.agsUrl != config.dbUrl) {
    //    $("#zy").html("Web服务器");
    //}
    //else if (config.iisUrl == config.agsUrl && config.iisUrl != config.dbUrl) {
    //    $("#zy").html("Web服务器+GIS服务器");
    //}
    //else if (config.iisUrl == config.dbUrl && config.iisUrl != config.agsUrl) {
    //    $("#zy").html("Web服务器+数据库服务器");
    //}
    //else if (config.iisUrl == config.dbUrl && config.iisUrl == config.agsUrl) {
    //    $("#zy").html("Web服务器+数据库服务器+GIS服务器");
    //}
    $("#zy").html("Web服务器+数据库服务器+GIS服务器");
    var iisUrl = baseUrl + "/iis";
    $.get(iisUrl, function (data, textStatus) {
        if (textStatus == "success") {
            var d = data;

            var num = data.length;

            $("#iisname").html(d.displayName);

            if (d.arch == "x64") { d.arch = "64位"; }
            else { d.arch = "32位"; }

            $("#iisversion").html(d.displayVersion + "(" + d.arch + ")");

        }
    },'jsonp');

    var dbUrl =baseUrl+ "/db";
    $.get(dbUrl, function (data, textStatus) {
        if (textStatus == "success") {
            //
            var d = data;
            var num = d.length;
            if (num == 1) { $(".orcl2").html(""); $(".orcl3").html(""); }
            if (num == 2) {
                $(".orcl3").html(""); $(".orclheight").css("height", "150px");
                $("#AgsSoft").css("height", "150px");
            }
            if (num == 3) {
                $(".orclheight").css("height", "200px");
                $("#AgsSoft").css("height", "200px");
            }
            for (var i = 0; i < num; i++) {


                $("#orclname" + i).html(d[i].displayName);

                if (d[i].arch == "x64") { d[i].arch = "64位"; }
                else { d[i].arch = "32位"; }

                $("#orclversion" + i).html(d[i].displayVersion + "(" + d[i].arch + ")");

                $("#orclurl" + i).html(d[i].oracleHome);


            }

        }
    },'jsonp');
    var agsUrl = baseUrl + "/ags";
    $.get(agsUrl, function (data, textStatus) {
        if (textStatus == "success") {
            var d = data;

            var num = d.length;
            if (num == 1) { $(".ags2").html(""); }
            if (num == 2) {
                $(".orclheight").css("height", "200px");
                $("#AgsSoft").css("height", "200px");
            }
            if (num == 3) {
                $(".orclheight").css("height", "300px");
                $("#AgsSoft").css("height", "300px");
            }
            for (var i = 0; i < num; i++) {

                $("#arcgisname" + i).html(d[i].displayName);

                if (d[i].arch == "x64") { d[i].arch = "64位"; }
                else { d[i].arch = "32位"; }

                $("#arcgisversion" + i).html(d[i].displayVersion + "(" + d[i].arch + ")");



            }

        }
    },'jsonp');


    var requestUrl =baseUrl + "/serviceMonitor";
    $.get(requestUrl, function (data, textStatue) {
        if (textStatue == "success") {
            var dataSet = data;
            for (var i = 0; i < dataSet.length; i++) {
                var myDate = new Date();
                var d = myDate.toLocaleTimeString();
                var status = "";
                if (dataSet[i].started == "true") { status = "启动"; }
                else { status = "停止"; }
                var oneContent = '<tr><td>' + dataSet[i].displayName + '</td><td>' + status + '</td><td>' + d + '</td></tr>';
                $('#servicestatus tbody').append(oneContent);
                if ($('#servicestatus tbody tr').length > 10) {
                    $('#servicestatus tbody tr').eq(0).remove();
                }
            }
        }
    },'jsonp');
    requestUrl =baseUrl+ "/serviceMonitor";
    $.get(requestUrl, function (data, textStatue) {
        if (textStatue == "success") {
            var dataSet = data;
            for (var i = 0; i < dataSet.length; i++) {
                var myDate = new Date();
                var d = myDate.toLocaleTimeString();
                var status = "";
                if (dataSet[i].started == "true") { status = "启动"; }
                else { status = "停止"; }
                var oneContent = '<tr><td>' + dataSet[i].displayName + '</td><td>' + status + '</td><td>' + d + '</td></tr>';
                $('#servicestatus tbody').append(oneContent);
                if ($('#servicestatus tbody tr').length > 10) {
                    $('#servicestatus tbody tr').eq(0).remove();
                }
            }
        }
    },'jsonp');
    requestUrl =baseUrl+ + "/serviceMonitor";
    $.get(requestUrl, function (data, textStatue) {
        if (textStatue == "success") {
            var dataSet = data;
            for (var i = 0; i < dataSet.length; i++) {
                var myDate = new Date();
                var d = myDate.toLocaleTimeString();
                var status = "";
                if (dataSet[i].started == "true") { status = "已停止"; }
                else { status = "正在运行"; }
                var oneContent = '<tr><td>' + dataSet[i].displayName + '</td><td>' + status + '</td><td>' + d + '</td></tr>';
                $('#servicestatus tbody').append(oneContent);
                if ($('#servicestatus tbody tr').length > 10) {
                    $('#servicestatus tbody tr').eq(0).remove();
                }
            }
        }
    });
},'jsonp');