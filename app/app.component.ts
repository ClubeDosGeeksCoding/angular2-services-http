import { Component, Input} from 'angular2/core';
import { HTTP_PROVIDERS }    from 'angular2/http';

// Services
import { PessoaService } from './pessoa.service';

@Component({
	selector:    'my-app',
	templateUrl: 'app/view.html',
	providers: [
		PessoaService,
		HTTP_PROVIDERS
	]
})

/**
* Classe AppComponent
*/
export class AppComponent {
	/**
	* Atributos
	*/
	private id: number;
	private nome, email: string;
	private pessoas: Array[];
	private pessoa: AppComponent = {};

	/**
	* Método construtor
	* @param _service: PessoaService
	*/
	constructor(private _service: PessoaService){
		this.getPessoas();
	}

	/**
	* Listando pessoas
	*/
	getPessoas(){
		this._service.getPessoas()
      		.then(pessoas => {this.pessoas = pessoas});
	}

	/**
	* Salvar pessoa
	*/
	salvar(){
		if(this.pessoa.id){
			this._service.editar(this.pessoa).then(res => {
				this.getPessoas();
				$('#myModal').modal('hide');
			});
		}else{
			this._service.novo(this.pessoa).then(res => {
				this.getPessoas();
				$('#myModal').modal('hide');
			});
		}
	}

	/**
	* Editar pessoa
	* @param item: Array
	*/
	editar(item){
		this.pessoa = item;
		$('#myModal').modal('show');
	}

	/**
	* Excluir pessoa
	* @param item: Array
	*/
	excluir(item){
		if(confirm("Você tem certeza que deseja excluir?")){
			this._service.excluir(item.id).then(res => {
				this.getPessoas();
			});
		}
	}

	/**
	* Cancelar Cadastro
	*/
	cancelar(){
		this.pessoa = {};
		$('#myModal').modal('hide');
	}
}