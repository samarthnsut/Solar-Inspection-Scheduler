const express =require('express')
const app=express();
const path= require('path')
const port=80;
const db = require("./config/mongoose");
const Drone = require("./models/Drones");
const History= require("./models/History")
const Request= require('request')
const SunCalc = require('suncalc');
const cron=require('node-cron')
const Func=require('./functions');
const today= new Date
app.use(express.json())

app.set("view engine",'ejs')
app.set('views',path.join(__dirname, 'views'))
app.use(express.urlencoded())

app.listen(port,function(err){
    if(err)
    console.log("error")

    console.log("server running")
})
app.get('/',function(req,res){
    return res.render('index.ejs')
})
var v=23
cron.schedule(`0 1 ${v} * * *`,function(){
    var apid= "76ca4a920fcf8f5f0a68e5b4f46d1b7d";
    var lat=0;
    var lon=0;
    var url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apid}`
    Request(url,function(error,response,body){
     //  var weather_data= JSON.parse(body)
     if(error){console.log("this is error",error)}
     let weather_json= JSON.parse(body)
       console.log("weather data is :",weather_json)
    if(weather_json.rain)
    {
        return obj={
            message:"weather conditions in your region are not suitable",
            staus: "fail"
        }
    }
    var sunPos=SunCalc.getPosition(new Date(),lat,lon)
    Drone.find({},function(err,drones){
        if(err){
            throw err;
        }
        return obj={
          staus: "success",
          drone: drones,
          sunPosition:sunPos
      }
    })
 })

})


app.post('/schedule',function(req,res){
    var ftime=Func.parseTime(req.body.timedata)
    var fdate=Func.dateParse(req.body.datedata);
    var scdate= ftime.hh+':'+ftime.mm+" " +fdate.d+ '/'+fdate.m+'/'+fdate.y;
    // var ctime = {
    //     hh:today.getHours(),
    //     mm: today.getMinutes()
    // } 
    //calculating current  date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var cdate = today.getHours()+':'+today.getMinutes()+" "+ mm+'/'+dd+'/'+yyyy;

    // var date1 = new Date(cdate);
    // var date2 = new Date(fdate);
    // var diffDays = date2.getDate() - date1.getDate(); 
    // var secs = diffDays*24*60*60;
    // var dateobj=Func.dateParse(fdate);
 
    // var sec= Func.calctime(ctime,ftime,cdate,fdate);
    // secs=secs+sec;
    // console.log("seconds:" , secs)
    // var obj=Func.schduling(secs);
    History.create({
        username: req.body.username,
        request_time:cdate,
        notes: req.body.notes,
        area:reqq.body.area,
        inspection_time:sctime
    })
    var obj;
    cron.schedule(`0 ${ftime.mm} ${ftime.hh} ${fdate.d} ${fdate.m} *`,function(){
        console.log("running cron")
        var apid= "76ca4a920fcf8f5f0a68e5b4f46d1b7d";
        var lat=0;
        var lon=0;
        var url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apid}`
        Request(url,function(error,response,body){
         //  var weather_data= JSON.parse(body)
         if(error){console.log("this is error",error)}
         let weather_json= JSON.parse(body)
           console.log("weather data is :",weather_json)
        if(weather_json.rain)
        {
             obj={
                message:"weather conditions in your region are not suitable",
                staus: "fail"
            }
        }

        var sunPos=SunCalc.getPosition(new Date(),lat,lon)
        Drone.find({},function(err,drones){
            if(err){
                throw err;
            }
              obj={
              staus: "success",
              drone: drones,
              sunPosition:sunPos
          }
          console.log("obj",obj)
          return res.send(obj);
        })
       
     })
         
    })
    

})
app.get('/immediate',function(req,res){
    var apid= "76ca4a920fcf8f5f0a68e5b4f46d1b7d";
    var lat=0;
    var lon=0;
    var url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apid}`
    Request(url,function(error,response,body){
        //  var weather_data= JSON.parse(body)
        if(error){console.log("this is error",error)}
        let weather_json= JSON.parse(body)
        console.log("weather data is :",weather_json)
        if(weather_json.rain)
        {
            return JSON({
                message:"weather conditions in your region are not suitable",
                staus: "fail"
            })
        }
        var sunPos=SunCalc.getPosition(new Date(),lat,lon)
        Drone.find({},function(err,drones){
                if(err){
                    throw err;
                }
            return res.json({
                staus: "success",
                drone: drones,
                sunPosition:sunPos,
                time: 0
            })
        })  
    })
})