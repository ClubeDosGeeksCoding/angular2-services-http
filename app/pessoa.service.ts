import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Headers } from 'angular2/http';

@Injectable()
export class PessoaService {

	 private apiUrl = 'api/pessoas';  // URL para web api

	 constructor(private http: Http) { }

	 getPessoas(){
	 	return this.http.get(this.apiUrl)
	 	.toPromise()
	 	.then(response => response.json().data)
	 	.catch(this.handleError);
	 }

	 salvar(pessoa: Array){
	 	console.log(JSON.stringify(pessoa))
	 	let headers = new Headers({'Content-Type': 'application/json'});
	 	console.log(headers)

    	return this.http
               .post(this.apiUrl, JSON.stringify(pessoa), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
	 }
}