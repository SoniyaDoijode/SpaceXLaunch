import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'spaceX';
  yearData;
  launchSuccessArr = ["True", "False"];
  landingSuccessArr = ["True", "False"]
  missionName: any;
  missionIds: any;
  loadingData : boolean;
  launchYear: any;
  finalData: any;
  data: any;
  fetchedData: any;
  yearArr = [];
  allData = true;
  launchSuccessData: Object;
  yearContent: boolean;
  launch_success: boolean;
  land_success: boolean;
  launchSuccess: any;
  landSuccessData: Object;
  error: any;

  constructor(private http: HttpClient){  }

   async ngOnInit(){
   this.fetchedData = await this.getData().subscribe(res =>{
    this.loadingData = true;
    this.allData = true;
     this.data = res;
    this.data.filter(obj =>{
      if(this.yearArr.indexOf(obj.launch_year) > 0){
        return;
      }
      this.yearArr.push(obj.launch_year);
      console.log(this.yearArr);
    });
    });

    //  console.log("------------",obj.launch_year,obj.launch_success,obj.rocket.first_stage.cores[0].land_success);



    //  console.log("-----finalData----",this.finalData);
    //  this.data.filter(item => {

    //   return item.rocket.first_stage.cores[0].land_success;
    //  })
    //  console.log("landsucees", landSuccess)
  }

yearClick(launchYear){
  this.allData = false;
  this.yearContent = true;
  this.launch_success=false;
  this.land_success=false;

  return this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_year="+`${launchYear}`).subscribe(resYear =>{

  this.data = resYear;
  if(this.data.length==0){
    console.log("no data found");
    return;
  }
    console.log("this.yearData", this.data)
  }

)
}

launchSuccessClick(launchSuccess){
  this.allData = false;
  this.yearContent = false;
  this.launch_success=true;
  this.land_success=false;
  launchSuccess = launchSuccess.toLowerCase();
  this.launchSuccess = launchSuccess;
  console.log("https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+`${launchSuccess}`);
  return this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+`${launchSuccess}`).subscribe(res =>{

  this.data = res;
  if(this.data.length==0){
    console.log("no data found");
    return;
  }
    console.log("this.launchSuccessData",this.data)
  })
}

landSuccessClick(landSuccess){
  this.allData = false;
  this.launch_success=false;
  this.yearContent = false;
  this.land_success=true;
  landSuccess = landSuccess.toLowerCase()
  console.log("https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+`${this.launchSuccess}`+"&land_success="+`${landSuccess}`);
  return this.http.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+`${this.launchSuccess}`+"&land_success="+`${landSuccess}`).subscribe(res =>{

    this.data = res;
    if(this.data.length==0){

      console.log("no data found");
      return;
    }
    console.log("this.landSuccessData",this.data)
  })
}

  getData(){
     return this.http.get("https://api.spaceXdata.com/v3/launches?limit=100");
  }

}
