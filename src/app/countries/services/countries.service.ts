import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/contries';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiURL:string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {term:'', countries :[]},
    byCountries: {term:'', countries :[]},
    byRegion: {region:'', countries :[]}

  }
  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore))
  }

  private loadToLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

   private getCountries(url:string):Observable<Country[]>
   {
    return this.http.get<Country[]>(url).pipe(
      catchError(
        () => of([])
      )
    );
   }

  searchCountryById(term:string):Observable<Country[]>{
    const url =`${this.apiURL}/alpha/${term}`
    return this.getCountries(url);
  }

  searchCapital(term:string):Observable<Country[]>{
    const url =`${this.apiURL}/capital/${term}`
    return this.getCountries(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term: term,countries: countries} ),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchCountry(term:string):Observable<Country[]>{
    const url = `${this.apiURL}/name/${term}`
    return this.getCountries(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term: term,countries: countries} ),
      tap(() => this.saveToLocalStorage()),
    );

  }

  searchRegion(term:Region):Observable<Country[]>{
    const url = `${this.apiURL}/region/${term}`
    return this.getCountries(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region: term,countries: countries} ),
      tap(() => this.saveToLocalStorage()),
    );
  }
}
