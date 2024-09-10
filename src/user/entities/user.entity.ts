// import { BlogEntity } from './../../blog/entities/blog.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   OneToMany,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { ProfileEntity } from './profile.entity';

// @Entity()
// export class UserEntity {
//   @PrimaryGeneratedColumn('increment')
//   id: number;
//   @Column()
//   first_name: string;
//   @Column()
//   last_name: string;
//   @Column()
//   email: string;
//   @Column({ nullable: true })
//   profileId: number;
//   @Column()
//   age: number;
//   @CreateDateColumn()
//   created_at: Date;
//   @OneToMany(() => BlogEntity, (blog) => blog.user)
//   blogs: BlogEntity[];
//   @OneToOne(() => ProfileEntity, (profile) => profile.user, {
//     onDelete: 'SET NULL',
//     nullable: true,
//   })
//   @JoinColumn({ name: 'profileId' })
//   profile: ProfileEntity;
// }
