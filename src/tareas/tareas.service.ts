import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareasService {
  constructor(private prisma: PrismaService) {}

  async create(createTareaDto: CreateTareaDto) {
    return this.prisma.tarea.create({
      data: {
        ...createTareaDto,
        fecha_creacion: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.tarea.findMany();
  }

  async findOne(id: number) {
    const tarea = await this.prisma.tarea.findUnique({
      where: { id },
    });
    
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    try {
      return await this.prisma.tarea.update({
        where: { id },
        data: updateTareaDto,
      });
    } catch (error) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.tarea.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
  }
}
