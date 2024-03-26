import {  Component, Input } from '@angular/core';
import { Country } from '../../interfaces/contries';

@Component({
    selector: 'countries-country-table',
    templateUrl: './countryTable.component.html',
    styles: `
    img{ width:25px}
  `,
})
export class CountryTableComponent {

@Input()
public countries: Country[] = [];
}
