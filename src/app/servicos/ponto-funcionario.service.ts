import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { PontoFuncionario } from '../back/pontoFuncionario';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PontoFuncionarioService {
  
  private BASE_URL:string = 'http://localhost:8080/api/ponto-funcionario/';
  private BASE_URL_DIA:string = 'http://localhost:8080/api/ponto-funcionario-dia/';
  private BASE_URL_MES:string = 'http://localhost:8080/api/ponto-funcionario-mes/';

    constructor(
	        private http: Http
	) { }

	
	public getPontoFunc(body: PontoFuncionario) {
		return this.http.get(this.BASE_URL_DIA + body.cpf.toString() + "/" + body.dia)
			.map(response => response.json());
	}
	
	
	public getFuncPontoMes(cpf: string, mes: string) {
		return this.http.get(this.BASE_URL_MES + cpf + "/" + mes)
			.map(response => response.json());
	}


	public addEntrada(body: PontoFuncionario){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.put('http://localhost:8080/api/ponto-funcionario-entrada/',JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	public addIdaIntervalo(body: PontoFuncionario){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.put('http://localhost:8080/api/ponto-funcionario-idaintervalo/',JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	public addVoltaIntervalo(body: PontoFuncionario){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.put('http://localhost:8080/api/ponto-funcionario-voltaintervalo/',JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	public addSaida(body: PontoFuncionario){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.put('http://localhost:8080/api/ponto-funcionario-saida/',JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}


	/*public updatePontoFunc(body: PontoFuncionario){
		let urlSearchParams = new URLSearchParams();
			urlSearchParams.append('cpf', body.cpf.toString());
			urlSearchParams.append('dia', body.dia.toString());
			let bodyCompleto = urlSearchParams.toString();
			
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.put('${this.BASE_URL}${bodyCompleto}',JSON.stringify(bodyCompleto), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}*/
	

	addURLParm(name, value) {
    var re = new RegExp("([?&]" + name + "=)[^&]+", "");

		if (this.BASE_URL.indexOf("?") === -1) {
			this.BASE_URL += "?" + name + "=" + encodeURIComponent(value);
		} else {
			if (re.test(this.BASE_URL)) {
				this.BASE_URL = this.BASE_URL.replace(re, "$1" + encodeURIComponent(value));
			} else {
				this.BASE_URL += "&" + name + "=" + encodeURIComponent(value);
			}
		}
	}

}
