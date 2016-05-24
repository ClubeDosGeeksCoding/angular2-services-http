import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Headers,RequestOptions } from 'angular2/http';

@Injectable()
export class PessoaService {

	 private apiUrl = 'api/pessoas';  // URL para web api

	 constructor(private http: Http) { }

	 getPessoas(){
	 	return this.http.get(this.apiUrl)
	 	.toPromise()
	 	.then(response => response.json())
	 	.catch(this.handleError);
	 }

	 novo(pessoa: Array){
	 	let body = JSON.stringify(pessoa);
	 	let headers = new Headers({'Content-Type': 'application/json'});
	 	let options = new RequestOptions({ headers: headers });

    	return this.http.post(this.apiUrl, body, options)
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
	 }

	 editar(pessoa: Array){
		 let id = pessoa.id;
		 delete pessoa.id;
		 let body = JSON.stringify(pessoa);
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });

		 let url = this.apiUrl + '/' + id;

		 return this.http.put(url, body, options)
			 .toPromise()
			 .then(res => res.json().data)
			 .catch(this.handleError);
	 }

	 excluir(id: number){
		 let url = this.apiUrl + '/' + id;
		 return this.http.delete(url)
			 .toPromise()
			 .then(res => res.json().data)
			 .catch(this.handleError);
	 }
}