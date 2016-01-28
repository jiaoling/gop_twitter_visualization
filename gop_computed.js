function Vis(){
         // Populate candidate_data variable with info for " Candidate Bio" component.
                var candidate_data = [
                {id: "01", last_name: "Trump", first_name: "Donald", age: "69", 
                birthplace: "Queens, NYC, NY", resides: "Manhattan, NYC, NY", 
                profession: "Chairman and President of The Trump Organization",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/trump.jpg", negative: 448, positive: 226, neutral: 115
                },
                {id: "02", last_name: "Bush", first_name: "Jeb", age: "62", 
                birthplace: "Midland, TX", resides: "Coral Gables, FL", 
                profession: "Former Governor of Florida",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/bush.jpg", negative: 362, positive: 17, neutral: 26
                },
                {id: "03", last_name: "Walker", first_name: "Scott", age: "47", 
                birthplace: "Colorado Spings, CO", resides: "Maple Bluff, WI", 
                profession: "Governor of Wisconsin",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/walker.jpg", negative: 66, positive: 8, neutral: 14
                },
                {id: "04", last_name: "Huckabee", first_name: "Mike", age: "60", 
                birthplace: "Hope, AR", resides: "Santa Rosa Beach, FL", 
                profession: "Former Governor of Arkansas",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/huckabee.jpg", negative: 146, positive: 14, neutral: 49
                },
                {id: "05", last_name: "Carson", first_name: "Ben", age: "64", 
                birthplace: "Detroit, MI", resides: "West Friendship, MD", 
                profession: "Retired Pediatric Neurosurgeon",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/carson.jpg", negative: 78, positive: 70, neutral: 17},
                {id: "06", last_name: "Cruz", first_name: "Ted", age: "44", 
                birthplace: "Calgary, Alberta, Canada", resides: "Houston, TX", 
                profession: "United States Senator from Texas",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/cruz.jpg", negative: 115, positive: 103, neutral: 36},
                {id: "07", last_name: "Rubio", first_name: "Marco", age: "44", 
                birthplace: "Miami, FL", resides: "Miami, FL", 
                profession: "United States Senator from Florida",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/rubio.jpg", negative: 33, positive: 17, neutral: 15},
                {id: "08", last_name: "Paul", first_name: "Rand", age: "52", 
                birthplace: "Pittsburgh, PA", resides: "Bowling Green, KY", 
                profession: "United States Senator from Kentucky",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/rand.jpg", negative: 44, positive: 7, neutral: 13},
                {id: "09", last_name: "Christie", first_name: "Chris", age: "53", 
                birthplace: "Newark, NJ", resides: "Princeton, NJ", 
                profession: "Governor of New Jersey",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/christie.jpg", negative: 83, positive: 10, neutral: 11},
                {id: "10", last_name: "Kasich", first_name: "John", age: "63", 
                birthplace: "McKees Rocks, PA", resides: "Genoa Township, OH", 
                profession: "Governor of Ohio",
                picture: "http://www.unc.edu/~jiaoling/690_visual_analytics/gop_profile/kasich.jpg", negative: 23, positive: 43, neutral: 16},
                ];
      
      var candidate_color = d3.scale.category10();
      var formatTime = d3.time.format("%H:%M");

      

      //Trendline Initiation
      //to prevent more than one trendline box from appearing, 
      //I put the following part outside the reder_trendline function
      var margin = {top: 20, right: 20, bottom: 50, left: 50};
      var width = 960 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

      var svg = d3.select("#trend_line").append("svg")
              .attr("class", "trend_line_box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      //CANDIDATE SELECTION BOXES 
      //SOME COMMENTS:
      //the candidate_data variable is a global variable above, I think we dont need to pass that, you can use that whenever you can
      //so i pass the "data" variable, which is the data we get from csv, we need that when we call the function of trendline
      this.render_selection_boxes = function (data) {
        //var margin = {top: 20, right: 20, bottom: 50, left: 50};
        var section_width = 960;
        var box_spacing = 0;
        var box_width = ((section_width - 6*box_spacing)/5);
        var section_height = ((box_width+box_spacing)+2);
        console.log(box_width);

        //var y = d3.scale.linear()
        //.domain([0, 10])
        //.range([box_width, 0]);
       

        var selection_svg = d3.select("#cand_select").append("svg")
              .attr("width", section_width)
              .attr("height", section_height);

        //draw groups
        var selection_boxes = selection_svg.selectAll(".select_box").data(candidate_data)
          .enter().append("g")
            .attr("class", "select_box")
            .attr("transform", function(d,i) {
              if (i >= 0 && i<5) {
              return "translate("+(box_spacing + ((box_spacing + box_width)*i))+","+box_spacing+")";
            }
            else {
              return "translate("+(box_spacing + ((box_spacing + box_width)*(i-5)))+","+(2*box_spacing + box_width/2)+")";
            }
            });

        // Draw background.
        var rect_box = selection_boxes.append("rect")
          .attr("x",0)
          .attr("y",0)
          .attr("width",box_width)
          .attr("height",box_width/2)
          .style("fill", function(d) { return candidate_color(d.first_name+" "+d.last_name); })  
        //.style("fill","#f28e93")
          .style("stroke", "#05314e")
          .style("stroke-width", 1);

        // Add candidate names
        var text_box = selection_boxes.append("text")
          .attr("x", 2.8*box_width/4)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .attr("class", "h3")
          .attr("fill", "#ffffff")
          .text(function(d) { return d.first_name+" "+d.last_name;});
          
        // Add positive sentiment percentages
        var pos_percent = selection_boxes.append("text")
          .attr("x", (2.8*box_width/4)-25)
          .attr("y", 60)
          .attr("text-anchor", "middle")
          .attr("class", "h3")
          .attr("fill", "#ffffff")
          .text(function(d) { 
              var pos = d.positive/(d.positive+d.negative);
              var pos = Math.round(pos*100);
              return "+" + pos + "%";
        });

        // Add negative sentiment percentages
        var neg_percent = selection_boxes.append("text")
          .attr("x", (2.8*box_width/4)+25)
          .attr("y", 60)
          .attr("text-anchor", "middle")
          .attr("class", "h3")
          .attr("fill", "#ffffff")
          .text(function(d) { 
              var neg = d.negative/(d.positive+d.negative);
              var neg = Math.round(neg*100);
              return "-" + neg + "%";
        });
          
          
        //establish picture size  
        var picture_height = box_width/2.5;
        var picture_width = box_width*0.6989;
    

        // Add pictures
        var image_box = selection_boxes.append("svg:image")
          .attr("xlink:href", function(d) { return d.picture;})
          .attr("x", -22)
          .attr("y", ((box_width/2) - picture_height)/2)
          .attr("width", picture_width)
          .attr("height", picture_height);
        //click_id is used to track the current clicked candidate
        var click_id = "00";
        selection_boxes
        .on("mouseover", function(d,i) {
            var id = candidate_data[i].id;
            //When one candidate is clicked, his color will not grey out until the next candidate is clicked
            selection_boxes.selectAll("rect").style("opacity", function (d) {
                if (d.id == click_id) {
                  return 1;
                }
                else if (d.id == id){
                  return 1;
                }
                else{
                  return 0.5;
                }
              })
            })
        .on("click", function(d,i) {
            var id = candidate_data[i].id;
            var selected_candidate = d.first_name+" "+d.last_name;
            click_id = id;
            console.log("candidate selected: "+ selected_candidate);
            selection_boxes.selectAll("rect").style("opacity", function (d) {
                return d.first_name+" "+d.last_name == selected_candidate ? 1 : 0.5;})
            // since this.render_selection_boxes is not within the trendline function, 
            //we have to call the trendline function to make the trendline change based on our selection
            // here selected_candidate corresponds to _candidate variable in the trendline function
            // flag is used to clean the previous trendline(My understanding is that since selection_box is a seperate function from trendline function, 
            //we cannot use .exit().remove() for updating data. If you find a way, please help!)
            var flag = true;
            this_vis.render_trendline(selected_candidate,data,flag)
            // console.log(selected_candidate)
          })
     
          document.getElementById("home").onclick = function() {show_all_candidates()};

          function show_all_candidates() {
            this_vis.render_trendline("all_candidates", data, false);
          }

      }


      //TRENDLINE SECTION
      this.render_trendline= function(_candidate,data, flag){    
       
       //set scale and axis
        var x = d3.time.scale()
                .domain([formatTime.parse("21:03"), formatTime.parse("23:04")])
                .range([0, width])

        //filter out the "none candidate field"
        data_10_candidates = data.filter(function(d){return (d.key != "No candidate mentioned")})
        var y = d3.scale.linear()
                .domain([d3.min(data_10_candidates, function(d) { return d3.min(d.values, function (d) { return d.sentiment_value; }); }), 
                          d3.max(data_10_candidates, function(d) { return d3.max(d.values, function (d) { return d.sentiment_value; }); })])
                .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.minutes,4)
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
           .selectAll("text")
          .attr("y", 0)
          .attr("x", 6)
          .attr("dy", ".35em")
          .attr("transform", "rotate(90)")
          .style("text-anchor", "start")




        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            // .text("sentiment index");



        if (flag == true){
        svg.selectAll(".line").style("stroke", function(d){
                                    if (d.key == _candidate){
                                      console.log(candidate_color(d.key))
                                      return candidate_color(d.key)

                                    } 
                                    else if (d.key !=_candidate){
                                      return "grey"
                                    }})
        svg.selectAll(".line").style("opacity", function(d){
                                    if (d.key == _candidate){
                                      return 1

                                    } 
                                    else if (d.key !=_candidate){
                                      return 0.1
                                    }})

        } 
        var data_subset = data
            if (_candidate != "all_candidates"){
              data_subset = data.filter(function(d){return (d.key == _candidate);})
              }
            else{
              data_subset = data.filter(function(d){return (d.key != "No candidate mentioned");})
            }


        var candidates = svg.selectAll(".candidates")
                            .data(data_subset, function(d) { return d.key; })
                            .enter().append("g")
                            .attr("class", "candidate");
        var line = d3.svg.line()
                    // .interpolate("linear")
                    .x(function(d) { return x(d.bin_time); })
                    .y(function(d) { return y(d.sentiment_value); });

        //formats time to be hour:minute am/pm, where hour is on a 12hour (not 24         hour) cycle
        var format_time = d3.time.format("%I:%M %p");

        // TOOL TIP
        var tool_tip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([0,0])
                        .html(function(data_subset) {
                              //I couldn't get the time and sentiment directly from the data because we
                              //nested it, so instead I pulled the mouse location and inverted the scale
                              //to find the original values
                              var x0 = format_time(new Date(x.invert(d3.mouse(this)[0]))); //bin time
                              var y0 = Math.round(y.invert(d3.mouse(this)[1])); //sentiment value
                              
                              var d = data_subset;
                              
                              //tool tip contents
                              var html = "<table>"
                                          +"<tr><th>Candidate:</th><td>"+d.key+"</td></tr>"
                                          +"<tr><th>Time:</th><td>"+x0+"</td></tr>"
                                          +"<tr><th>Sentiment:</th><td>"+y0+"</td></tr>"
                                          +"</table>";
                               return html;
                        });

        svg.call(tool_tip);

        candidates.append("path")
                  .attr("class", "line")
                  .attr("d", function(d) { return line(d.values); })
                  .on("mouseover", tool_tip.show)
                  .on("mouseout", tool_tip.hide)
                  .style("stroke", function(d) { return candidate_color(d.key); });
        
        svg.append("line")
            .attr("x1", x(formatTime.parse("21:03")))
            .attr("x2", x(formatTime.parse("23:04")))
            .attr("y1", y(0))
            .attr("y2", y(0))
            .style("stroke", "black")
            .style("stroke-width",2)
            .attr("class", "zero_line")

        
      }

    this.render_cluster = function(cluster_data, candidate_data){
        
        var margin = {top: 20, right: 50, bottom: 20, left: 50};
        var width = 960 - margin.left - margin.right;
        var height = 600 - margin.top - margin.bottom;

        var plot_width = 70;
        var plot_spacing = 20;

        // Define a scale for the y axis
        var x = d3.scale.linear()
            .domain([0, 100])
            .range([0, plot_width]);
        var y = d3.scale.linear()
            .domain([10, 0])
            .range([plot_width,0]);


        var svg = d3.select("#cluster_diagram").append("svg")
            .attr("class", "cluster_box")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", function(d,i) {
          return "translate("+(plot_spacing + ((plot_spacing+plot_width)*i))+","+plot_spacing+")";
        })


        // This is the "math" side of the cluster diagram.
        // If you use your debugger here, you should see a multi-dimensional list created
        // of 12 lists that contain a total of 1263 data points.
        var numeric_cluster = ss.ckmeans(cluster_data, 10);
        console.log(numeric_cluster)

        var topic_dic = ["LGBT", "Job&Economy", 
                         "Healthcare", 
                         "Racial","Abortion",
                         "Women", "Religion",
                         "Foreign","Immigration"]

        // add topic name to each group   
        numeric_cluster[0].push(topic_dic[0])
        numeric_cluster[1].push(topic_dic[0])
        numeric_cluster[2].push(topic_dic[1])
        numeric_cluster[3].push(topic_dic[2])
        numeric_cluster[4].push(topic_dic[3])
        numeric_cluster[5].push(topic_dic[4])
        numeric_cluster[6].push(topic_dic[5])
        numeric_cluster[7].push(topic_dic[6])
        numeric_cluster[8].push(topic_dic[7])
        numeric_cluster[9].push(topic_dic[8])


        var clusters = svg.selectAll(".cluster_g")
                      .data(numeric_cluster)
                      .enter().append("g")
                      .attr("class", "cluster_g")
                      .attr("transform", function(d,i) {
                          return "translate("+(plot_spacing + ((plot_spacing+plot_width)*i))+","+plot_spacing+")";
                       });
        

        // Draw a gray background.
        var cluster_background= clusters.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("width",plot_width)
            .attr("height",1000)
            .style("fill","#f4f4f4")
        var cluster_dic=[]

        var r=4
        var clustery=0
        clusters.selectAll(".clustercircle").data(function(d){return d})
                  .enter()
                  .append("circle")
                  .attr("r", function(d,i){
                    if (d[i]!=d[i-1]){
                        r=4
                        cluster_dic[i]=r
                        return cluster_dic[i]
                    }else if (d[i]==d[i-1])
                    {
                        cluster_dic[i] = r+0.001
                        r= r+0.001
                        return cluster_dic[i]
                    }
                  })
                  .attr("cx", function(d){
                    return x(plot_width)
                  })
                  .attr("cy", function(d,i){
                    if (i==0){
                      clustery=0
                    }
                    if (d[i]!=d[i-1]){
                      clustery=0
                      return y(clustery)
                    }else
                    {
                      clustery= clustery+1.1
                      return y(clustery)
                    }
                  })
                  .style("fill", function(d) { return candidate_color(d); })
                  .attr("class", "clustercircle");

          // Add candidate names
        var text_box = clusters.append("text")
          .attr("x", 1.8*plot_width/4)
          .attr("y", 520)
          .attr("text-anchor", "middle")
          .attr("class", "h3")
          .attr("fill", "black")
          .text(function(d) { return d[d.length-1]});
          
         


    }


        //EVERYTHING BELOW THIS LINE IS DATA LOADIG AND ORGANIZATION
        var this_vis = this;
        d3.csv("data_computed.csv",
          function(d){
           return {
              candidate: d.Candidate,
              bin_time: formatTime.parse(d.Time),
              sentiment_value: +d.Value
           };
          },
          function(error, data){
             if (error!=null){
                console.log(error);
                alert("Error!");
             }
             else{
                console.log("Load "+data.length+" records.");
                
                //nest data by candidate
                var data = d3.nest()
                     .key(function(d){return d.candidate;})
                     .sortKeys(d3.ascending)
                     .entries(data);
                console.log(data);

                var flag = false
              this_vis.render_selection_boxes(data);
              this_vis.render_trendline("all_candidates",data, false);
              
              // For now, I'm not calling the cluster diagram. Too afraid it will mess things
              // up. You're welcome to uncomment on your own and try it out. But I'm not passing
              // anything in yet, so nothing will happen at the moment!
              this_vis.render_cluster(cluster_data, candidate_data);
            }
          });
}
