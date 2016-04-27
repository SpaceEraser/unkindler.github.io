$(function(){
    var convertCapsCsv = function(csvStr){
        var allTextLines = csvStr.split(/\r\n|\n/);//<- crowd of sunbros

        //extract headers
        var columnHeaders = allTextLines.shift().split(',');

        //convert to matrix
        var allLines = allTextLines.map(function(line){
            return line.split(',');
        });

        var linesHeight = allLines.length;
        var linesWidth = allLines[0].length;

        var attributeGrowths = {
            labels:[],
            attributes:{}
        };


        // collect the labels
        for(var y=0;y<linesHeight;y++){
            attributeGrowths.labels.push(allLines[y][0]);
        }


        for(var x=1;x<linesWidth;x++){
            var attribute = columnHeaders[x];
            var attributeGrowth = [];

            for(var y=0;y<linesHeight;y++){
                attributeGrowth.push(allLines[y][x]);
            }

            attributeGrowths.attributes[attribute] = attributeGrowth;
        }

        return attributeGrowths;
    }

    var chartElId = 'chart';
    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    var byLevelAjax = $.ajax({
        type: "GET",
        url: "byLevel.csv",
        dataType: "text"
    });

    var totalAjax = $.ajax({
        type: "GET",
        url: "totalGained.csv",
        dataType: "text"
    });

    $.when(byLevelAjax,totalAjax).done(function(levelCsv,totalCsv){
        var attributeGrowthsByLevel = convertCapsCsv(levelCsv[0]);
        var attributeGrowthsTotal = convertCapsCsv(totalCsv[0]);

        var attributeGrowths = {
            labels: attributeGrowthsByLevel.labels,
            attributesTotal: attributeGrowthsTotal.attributes,
            attributesLevel: attributeGrowthsByLevel.attributes
        };

        var dropdownOptions = '';

        $.each(attributeGrowths.attributesLevel,function(attr,attrValues){
            dropdownOptions += '<option value="'+attr+'">'+attr+'</option>';
        });

        var capsChart;

        var updateChart = function(){
            var viewType = $('input[name=viewType]:checked').val();
            var attribute = $('#chartViewChanger').val();

            var chartTitleSuffix = viewType == 'attributesTotal' ? '(total gained)' : '(gained per point)';

            if(capsChart){
                capsChart.destroy();

                $('#chart').replaceWith('<canvas id="chart"></canvas>');
            }

            capsChart = new Chart(document.getElementById(chartElId), 
                {
                    type: 'line',
                    data: {
                    labels: attributeGrowths.labels,
                    datasets: [{
                        label: attribute+chartTitleSuffix,
                        data: attributeGrowths[viewType][attribute]
                    }]
                },
                options: chartOptions
            });
        }

        $('#chartViewChanger').html(dropdownOptions).change(updateChart);
        $('input[name=viewType]').click(updateChart);

        updateChart();
    });
});