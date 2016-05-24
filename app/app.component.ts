import { Component, Input} from 'angular2/core';
import { PessoaService } from './pessoa.service';
import { HTTP_PROVIDERS }    from 'angular2/http';


@Component({
	selector:    'my-app',
	templateUrl: 'app/view.html',
	providers: [
		PessoaService,
		HTTP_PROVIDERS
	]
})

export class AppComponent {
	private id: number;
	private nome, email: string;
	private pessoas: Array[];
	private pessoa: AppComponent = {};
	constructor(private _service: PessoaService){
		this.getPessoas();
	}

	getPessoas(){
		this._service.getPessoas()
      		.then(pessoas => {this.pessoas = pessoas});
	}

	salvar(){
		if(this.pessoa.id){
			this._service.editar(this.pessoa).then(res => {
				this.getPessoas();
				$('#myModal').modal('hide');
			})
		}else{
			this._service.novo(this.pessoa).then(res => {
				this.getPessoas();
				$('#myModal').modal('hide');
			});
		}
		
	}

	editar(item){
		this.pessoa = item;
		$('#myModal').modal('show');
	}

	excluir(item){
		if(confirm("Você tem certeza que deseja excluir?")){
			this._service.excluir(item.id).then(res => {
				this.getPessoas();
			});
		}
	}

	cancelar(){
		this.pessoa = {};
		$('#myModal').modal('hide');
	}
}
