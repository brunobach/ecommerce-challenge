import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1618603357041 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '50',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'profile_url',
        type: 'varchar',
        length: '2000',
        isUnique: false,
        isNullable: true,
      },
      {
        name: 'isActive',
        type: 'boolean',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'confirmation_email',
        type: 'boolean',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
