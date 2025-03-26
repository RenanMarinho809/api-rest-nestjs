import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly cars : Car[] =[]
  create(createCarDto: CreateCarDto) {
    const newCar = {
      id : Math.random() * 100 ,
      brand: createCarDto.brand,
      model : createCarDto.model,
      year : createCarDto.year
    };
    this.cars.push(newCar);
    return newCar;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if(!car){throw new NotFoundException('Carro não encontrado');}
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);
   
   if (updateCarDto.brand !== undefined) {
     car.brand = updateCarDto.brand;
   }
   if (updateCarDto.model !== undefined) {
     car.model = updateCarDto.model;
   }
   if (updateCarDto.year !== undefined) {
     car.year = updateCarDto.year;
   }

    return;
  }

  remove(id: number) {

    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
      throw new BadRequestException('Carro nao encontrado');
    }
    this.cars.splice(carIndex, 1);
    return;
  }
}
