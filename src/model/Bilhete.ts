import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: "bilhete_unico"
})

export class Bilhete extends Model<Bilhete> {

    @Column({primaryKey: true})
    id: string; 

    @Column
    id_usuario: string;

    @Column
    numero: string;

    @Column
    flag_bilhete_unico: boolean;

    @Column
    apelido: string

}

	

		
	