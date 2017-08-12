import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'search-input',
  template: `
    <input type="text" [value]="text" [formControl]="searchControl" [placeholder]="placeholder">
  `
})
export class SearchInputComponent implements AfterViewInit, OnDestroy {

  searchControl = new FormControl();
  sub: Subscription;

  @Input() placeholder: string;
  @Input() debounce = 250;
  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();

  ngAfterViewInit() {

    this.sub = this.searchControl.valueChanges
      .debounceTime(this.debounce)
      .distinctUntilChanged()
      .subscribe((text: string) => {
        this.textChange.emit(text);
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

