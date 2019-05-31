// set the dimensions and margins of the graph
var margin = {top: 50, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/dati.json",function(error,data){
    
    V1Scale = d3.scaleLinear().domain([0,d3.max(data,function(d){
        return d.v1;})]);

    V2Scale = d3.scaleLinear().domain([0,d3.max(data,function(d){
        return d.v2;})]);

    V3Scale = d3.scaleLinear().domain([0,d3.max(data,function(d){
        return d.v3;})]);
        
    suAsseX = V1Scale;
    suAsseY = V2Scale;
    fuoriBase = V3Scale;

    initPlot(data);    
    
});
function initPlot(data){

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom().scale(V1Scale.range([0,width])))
    .attr("id","asisX")
    .on("click",changeAxisX);

    svg.append("g")
    .call(d3.axisLeft().scale(V2Scale.range([height,0])))
    .on("click",changeAxisY)
    ;

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d){return V1Scale(d.v1)})
        .attr("cy", function(d){return V2Scale(d.v2)})
        .attr("fill",function(d){return d.color})
        .attr("r", 5)
        .attr("id","dot")
        .attr("stroke","black")

    svg.append('text')
        .attr("id","labelY")
        .attr('x', -10)
        .attr('y', -10)
        .attr('class', 'label')
        .text('V2');

    svg.append('text')
        .attr("id","labelX")
        .attr('x', width + 30)
        .attr('y', height + 5 )
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text("V1")
}
function changeAxisX(){

    d3.select(this)
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .call(d3.axisBottom().scale(fuoriBase.range([0,width])))
    ;
    
    svg.selectAll("#dot")
        .transition("onCx")
        .ease(d3.easeLinear)
        .duration(3000)
        .attr("cx", function(d){return sceltaFuoriBase(d)})   
        .attr("r", 5)
        .attr("id","dot")
     
        svg.select("#labelX")
        .text(sceltaLabel())
        temp = suAsseX;
        
        suAsseX = fuoriBase;
        fuoriBase = temp;
}

function changeAxisY(){

    d3.select(this)
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .call(d3.axisLeft().scale(fuoriBase.range([height,0])))
    ;
    
    svg.selectAll("#dot")
        .transition("onCy")
        .ease(d3.easeLinear)
        .duration(3000)
        .attr("cy", function(d){return sceltaFuoriBase(d)})
        .attr("r", 5)
        .attr("id","dot")
    
    svg.select("#labelY")
        .text(sceltaLabel())
            
        temp = suAsseY;
        suAsseY = fuoriBase;
        fuoriBase = temp;

        
}

function sceltaFuoriBase(d){
    if(fuoriBase == V1Scale)
        return fuoriBase(d.v1);
    if(fuoriBase == V2Scale)
        return fuoriBase(d.v2);
    if(fuoriBase == V3Scale)
        return fuoriBase(d.v3);
}

function sceltaLabel(){
    if(fuoriBase == V1Scale)
        return "V1";
    if(fuoriBase == V2Scale)
        return "V2";
    if(fuoriBase == V3Scale)
        return "V3";
}



