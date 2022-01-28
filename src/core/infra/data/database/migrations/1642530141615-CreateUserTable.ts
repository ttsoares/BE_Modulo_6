import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1642530141615 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(new Table({
    name: 'users',
    columns: [
      {
        name: 'uid',
        type: 'integer',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '20',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '33',
        isNullable: false,
      }
    ]
  }));
}

public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropTable('users');
}
}
