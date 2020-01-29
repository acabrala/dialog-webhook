import { Table, Column, Model, CreatedAt, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "session_chat"
})

export class SessionChat extends Model<SessionChat> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    id_usuario: string;

    @Column({ allowNull: true })
    nome: string;

    @Column
    cpf: string;

    @Column
    email: string;

    @Column
    session: string;

}