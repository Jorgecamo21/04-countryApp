import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/contries';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public countries:Country[] = [];
  public regions:Region[] = ['Africa','Americas','Asia','Europe','Oceania','Antarctic',''];
  public selectedRegion?: Region;
  public estaCargando:boolean = false;
  constructor(private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term:Region):void{
    this.selectedRegion=term;
    this.estaCargando = true;
    this.countriesService.searchRegion(term).subscribe(
      countries =>{
        this.countries = countries;
        this.estaCargando = false;
      }
       );

  }
}
