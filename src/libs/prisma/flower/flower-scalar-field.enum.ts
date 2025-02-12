import { registerEnumType } from '@nestjs/graphql';

export enum FlowerScalarFieldEnum {
    id = "id",
    name = "name",
    color = "color",
    price = "price",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(FlowerScalarFieldEnum, { name: 'FlowerScalarFieldEnum', description: undefined })
