import { Table, Column, Model, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "cartao_user"
})

export class CreditCard extends Model<CreditCard> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    numero_cartao: string;

    @Column
    hash_cartao: string;
 
    @Column
    data_validade: string;

    @Column
    nome_cartao: string;

    @Column
    bandeira: string;

    @Column
    id_usuario: string;


}