import { Table, Column, Model, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
    tableName: "bilhete_unico"
})

export class Bilhete extends Model<Bilhete> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER})
    id: number; 

    @Column
    id_usuario: string;

    @Column
    numero: string;

    @Column
    flag_bilhete_unico: boolean;

    @Column
    apelido: string;

    @Column({defaultValue: 'Bilhete Único'})
    tipo_cartao: string;

    @Column({defaultValue: 'SP'})
    estado: string;

    @Column({defaultValue: true })
    flag_carteira_comum: boolean

}

	

		
	