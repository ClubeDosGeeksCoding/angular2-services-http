import {Injectable}     from 'angular2/core';
import {Http, Headers,RequestOptions } from 'angular2/http';

@Injectable()

/**
* Service Pessoa
*/
export class PessoaService {

	private apiUrl = 'api/pessoas';  // URL para web api

	/**
	* Método construtor
	* @param http: Http
	*/
	constructor(private http: Http) { }

	/**
	* Listando pessoas
	*/
	getPessoas(){
	 	return this.http.get(this.apiUrl)
		 	.toPromise()
		 	.then(response => response.json())
		 	.catch(this.handleError);
	}

	/**
	* Nova pessoa
	* @param pessoa: Array
	* @return http POST
	*/
	novo(pessoa: Array){
	 	let body = JSON.stringify(pessoa);
	 	let headers = new Headers({'Content-Type': 'application/json'});
	 	let options = new RequestOptions({ headers: headers });

	 	return this.http.post(this.apiUrl, body, options)
		 	.toPromise()
		 	.then(res => res.json())
		 	.catch(this.handleError);
	}

	/**
	* Editar pessoa
	* @param pessoa: Array
	* @return http PUT
	*/
	editar(pessoa: Array){
	 	let id = pessoa.id;
	 	delete pessoa.id;
	 	let body = JSON.stringify(pessoa);
	 	let headers = new Headers({ 'Content-Type': 'application/json' });
	 	let options = new RequestOptions({ headers: headers });

	 	let url = this.apiUrl + '/' + id;

	 	return this.http.put(url, body, options)
		 	.toPromise()
		 	.then(res => res.json())
		 	.catch(this.handleError);
	}

	/**
	* Excluir pessoa
	* @param id: number
	* @return http DELETE
	*/
	excluir(id: number){
	 	let url = this.apiUrl + '/' + id;
	 	return this.http.delete(url)
		 	.toPromise()
		 	.then(res => res.json().data)
		 	.catch(this.handleError);
	}
}