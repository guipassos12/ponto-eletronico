import { Component, EventEmitter,Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Funcionario } from './back/funcionario';
import { FuncionarioService } from './servicos/funcionario.service';
import { PontoComponent } from './ponto.component';
import { AppComponent } from './app.component';
import { FuncionarioLogadoService } from './servicos/funcionario-logado.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [ FuncionarioService ]
})

export class LoginComponent implements OnChanges{

	public funcLogin:Funcionario = new Funcionario('','','','');
	public retorno:Funcionario = new Funcionario('','','','');
	
	@Output() onLogin = new EventEmitter<Funcionario>();
	
	constructor(private funcService: FuncionarioService, 
			    public router: Router, 
				private funcLogadoService: FuncionarioLogadoService){}
	
	ngOnChanges(changes: any){}

	login(){
		this.funcService.login(this.funcLogin.cpf, this.funcLogin.senha)
			.subscribe(result => this.retorno = result.funcionario[0]);

			if(this.retorno.cpf == "") {
				alert("Falha no login!");
			}else{
				this.funcLogadoService.funcionario = this.retorno;
				this.onLogin.emit(this.retorno);
				this.router.navigate(['/ponto']);
				alert("Bem-vindo " + this.retorno.nome);
			}	
	}

	cadastro(){
		this.router.navigate(['/cadastro']);
	}

}