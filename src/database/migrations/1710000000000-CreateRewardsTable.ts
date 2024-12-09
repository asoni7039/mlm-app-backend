import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRewardsTable1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rewards',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'referral_code_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'points',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['DOWNLINE', 'REGISTRATION'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );

    await queryRunner.createIndex('rewards', {
      name: 'IDX_rewards_user',
      columnNames: ['user_id']
    });

    await queryRunner.createIndex('rewards', {
      name: 'IDX_rewards_referral_code',
      columnNames: ['referral_code_id']
    });

    await queryRunner.createForeignKey(
      'rewards',
      new TableForeignKey({
        name: 'FK_rewards_user',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'rewards',
      new TableForeignKey({
        name: 'FK_rewards_referral_code',
        columnNames: ['referral_code_id'],
        referencedTableName: 'referral_codes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rewards', 'FK_rewards_user');
    await queryRunner.dropForeignKey('rewards', 'FK_rewards_referral_code');
    
    await queryRunner.dropIndex('rewards', 'IDX_rewards_user');
    await queryRunner.dropIndex('rewards', 'IDX_rewards_referral_code');
    
    await queryRunner.dropTable('rewards');
  }
} 