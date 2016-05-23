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

export class AppComponent implements OnInit {
	id: number;
	nome, email: string;
	pessoas: Array[];
	pessoa: AppComponent = {};
	constructor(private _service: PessoaService){
		this.getPessoas();
	}

	getPessoas(){
		this._service.getPessoas()
      		.then(pessoas => this.pessoas = pessoas);
	}

	salvar(){
		this._service.salvar(this.pessoa).then(pessoa=>{
			this.getPessoas();
		})
	}
}
