import { Table, Column, Model, CreatedAt, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "usuario"
})

export class User extends Model<User> {

    @Column({primaryKey: true})
    id: string; 

    @Column
    email: string;

    @Column
    nome: string;

    @Column
    cpf: string

}

	

		
	