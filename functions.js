const Drone = require("./models/Drones");
const Request= require('request')
const SunCalc = require('suncalc');
const rp= require('request-promise')

const calctime= function(ctime,ftime,cdate,fdate){
    var hours= ftime.hh-ctime.hh;
    var mins= ftime.mm-ctime.mm;
  
    var secs =hours*60*60+mins*60;
    return secs;
  }
function   dateParse(s){
        var parts =s.split('-');
        var part=[];
        parts.forEach(element => {
            element=parseInt(element);
            part.push(element);
        });
        var obj={
            y:part[0],
            m:part[1],
            d:part[2]
        }
        return obj;
    }

const parseTime= function(s) {
        var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
        var hh = parseInt(part[1], 10);
        var mm = parseInt(part[2], 10);
        var ap = part[3] ? part[3].toUpperCase() : null;
        if (ap === "AM") {
            if (hh == 12) {
                hh = 0;
            }
        }
        if (ap === "PM") {
            if (hh != 12) {
                hh += 12;
            }
        }
        return { hh: hh, mm: mm };
    }


  module.exports={
      parseTime,
      dateParse,
      calctime,
      schduling
  }