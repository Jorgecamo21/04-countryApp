import { OnInit } from '@angular/core';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './searchBox.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent implements OnInit {

  private debouncer:Subject<string> =new Subject<string>();

@Input()
public placeholder:string = '';

@Input()
public initialValue:string = '';

// @ViewChild('txtInput')
// public tagInput!: ElementRef<HTMLInputElement>;

// buscar():void{
//   const busqueda = this.tagInput.nativeElement.value;
//   console.log(busqueda);

// }
@Output()
public onValue = new EventEmitter<string>();

@Output()
public onDebounce = new EventEmitter<string>();

ngOnInit(): void {
  this.debouncer
  .pipe(
    debounceTime(500)
  )
  .subscribe(value => {
    this.onDebounce.emit(value);

  })
}

buscar(valor :string ):void{
  this.onValue.emit(valor);
}

onKeyPress(Term:string){
this.debouncer.next(Term);

}
}
