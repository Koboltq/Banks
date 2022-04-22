import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../domain/entities/currency';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getNBPCurrencies(){
    return this.http.get<any>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
  }

  getNBPCurrenciesByDate(date: string) {
    return this.http.get<any>(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`)
  }
}
