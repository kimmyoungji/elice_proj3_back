import { Column } from "typeorm";

export class verificationCode {
    @Column({ length: 50 })
    email: string;

    @Column({ length: 50 })
    code: string;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}