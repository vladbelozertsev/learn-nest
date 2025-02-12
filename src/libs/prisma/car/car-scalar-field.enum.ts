import { registerEnumType } from '@nestjs/graphql';

export enum CarScalarFieldEnum {
    id = "id",
    brand = "brand",
    model = "model",
    color = "color",
    price = "price",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(CarScalarFieldEnum, { name: 'CarScalarFieldEnum', description: undefined })
