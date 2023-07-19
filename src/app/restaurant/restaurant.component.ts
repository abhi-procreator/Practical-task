import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  data:any;
  profileArr:any[]=[]
  constructor(private httpService: HttpService,private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllRest();
  let  d =this.activate.snapshot.data;
  console.log(d);
  

  }

  getAllRest(){
    this.httpService.getAllrestaurant().subscribe((res: any) => {
      console.log(res);
      this.profileArr.push('getAllrestaurant',res.data);
      this.data= res.data;
    });
  }
}
