import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private httpService: HttpService,private route:ActivatedRoute) { }
 
  Name:any;
  data:any;
  profileArr:any[]=[];

  ngOnInit(): void {
    this.getAllProfiles();

  }


  getAllProfiles(){
    this.httpService.getAllProfiles().subscribe((res: any) => {
      console.log(res);
      this.profileArr.push('getAllProfiles',res.data);
      this.data= res.data;
    });
  }
}
