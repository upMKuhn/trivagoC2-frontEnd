export class Utils {


    public static test(){
        alert("a");
    }


    public static getOrDefault(value, defaultVal)
    {
        return value == null || value == undefined ? defaultVal : value;
    }

    /**
     * 
     * @param this_ 
     * @param func 
     * @param args 
     */
    public static  makeCallback(this_, func, ...otherArgs:any[])
    {
        if (func == undefined)
            console.error("Can't make a call back without a function");

        var template = function (...directArgs:any[]) {

            return func.apply(this_, directArgs.concat(otherArgs));
        }
        template.bind({ func: func, this_: this_ });
        return template;
    }


    public static  reverseArray(ar)
    {
        var other = [];
        for (var i = ar.length; i >= 0; i--)
        {
            other.push(ar[i])
        }
        return other;
    }

    public static  jsonHelper(obj)
    {
        return JSON.stringify(obj, function (k, v) {
            if (v instanceof Array)
                return JSON.stringify(v);
            return v;
        }, 2);
    }


    public static  sphericalToCartesian(radius, azimuth, elevation) {
        var x = radius * Math.sin(elevation) * Math.cos(azimuth)
        var y = radius * Math.sin(elevation) * Math.sin(azimuth)
        var z = radius * Math.cos(elevation)
        return [x, y, z];
    }


    public static pluralizeIfNeeded(num:number, singular:string):string{ return num > 1 ? singular + 's' : singular; }
    
    public static dateToTimeSince(theDate:Date, currentTime?:Date){
      var now = currentTime ? currentTime : new Date();
      var subtracted = new Date((now.getTime() - theDate.getTime()));
      var yearsAgo = Math.floor(subtracted.getFullYear() - 1970);
      var monthAgo = Math.floor(subtracted.getMonth());
      var weeksAgo = Math.floor(subtracted.getUTCDate() / 7);
      var daysAgo =  Math.floor(subtracted.getUTCDate());
      var hoursAgo = Math.floor(subtracted.getHours());
      var minutesAgo = Math.floor(subtracted.getMinutes());
        
      var returnable = "";
      if(yearsAgo > 0){
        returnable = yearsAgo + " " + Utils.pluralizeIfNeeded(yearsAgo, 'year')+ " ago";
      } else if(monthAgo > 1){
          returnable = monthAgo + " " + Utils.pluralizeIfNeeded(monthAgo, 'month')+ " ago";
      }else if(weeksAgo > 1){
          returnable = weeksAgo + " " + Utils.pluralizeIfNeeded(weeksAgo, 'week')+ " ago";
      }else if(daysAgo > 1){
          returnable = daysAgo + " " + Utils.pluralizeIfNeeded(daysAgo, 'day')+ " ago";
      }else if(hoursAgo > 1){
          returnable = hoursAgo + " " + Utils.pluralizeIfNeeded(hoursAgo, 'hour')+ " ago";
      }else if(minutesAgo < 5){
          returnable = "just now";
      }
      else if(minutesAgo > 1){
          returnable = minutesAgo + " minutes ago";
      }

      return returnable;
  }

}
