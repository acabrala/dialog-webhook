import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: "validacao_cadastro"
})

export class ValidacaoCadastro extends Model<ValidacaoCadastro> {

    @Column({primaryKey: true, autoIncrement: true})
    id: number; 

    @Column
    session_usuario: string;

    @Column
    token: number;

    @Column
    ativo: boolean;

    @Column
    ativado: boolean;

}
	