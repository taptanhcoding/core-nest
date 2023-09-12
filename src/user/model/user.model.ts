import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Role } from 'src/roles.decorator';

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    toJSON: {
        getters: true,
    },
})
export class User {
    @Prop({
        required: true,
        unique: true,
        minlength: 4
    })
    username: string;

    @Prop({
        required: true,
        minlength: 6
    })
    password: string;

    @Prop()
    fullname: string;

    @Prop()
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)