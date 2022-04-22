import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Currency } from 'src/app/domain/entities/currency';
import { Rate } from 'src/app/domain/entities/rate';
import { BankService } from 'src/app/services/bank.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public rates: Rate[] = [];
  public first = 0;
  public rows = 10;
  public filterDate?: Date | null;
  public msg?: Message[] | null;
  public selectedTheme: string = 'saga-blue';
  constructor(private bankService: BankService, private themeService: ThemeService, private datepipe: DatePipe) { 
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bankService.getNBPCurrencies().subscribe(
      cur => this.parseData(cur),
      err => this.errorNotify(err));
  }

  clearFilters() {
    this.filterDate = null;
    this.loadData();
  }

  onChangeFilterDate() {
    const date = this.datepipe.transform(this.filterDate, 'yyyy-MM-dd');
    if (date === null || date === undefined ) {
      this.errorNotify('Incorrect date. Please enter a valid date format.')
      return;
    }
    this.bankService.getNBPCurrenciesByDate(date).subscribe(
      cur => this.parseData(cur),
      err => this.errorNotify(err.statusText)
    );
  }

  onChangeTheme() {
    this.themeService.switchTheme(this.selectedTheme);
  }

  errorNotify(error: string) {
    this.msg = [  {severity:'error', summary:'Error', detail: error} ];
  }

  parseData(data: any) {
    this.msg = null;
    const currency: Currency[] = JSON.parse(JSON.stringify(data));
    this.rates = currency[0].rates;
  }
}
