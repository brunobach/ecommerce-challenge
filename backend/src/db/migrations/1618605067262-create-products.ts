import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProducts1618605067262 implements MigrationInterface {
  private table = new Table({
    name: 'products',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'description',
        type: 'varchar',
        length: '2000',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'price',
        type: 'decimal',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'product_url_image',
        type: 'jsonb',
        isArray: true,
        isUnique: false,
      },
      {
        name: 'is_on_sale',
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

  private foreignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'users',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('products', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', this.foreignKey);
    await queryRunner.dropTable(this.table);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
