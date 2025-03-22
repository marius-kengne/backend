import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */

    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Le nom de la tâche est requis');
    }

    try {
      return await this.taskRepository.save({
        id: dto.id || undefined,
        name: dto.name,
      });
    } catch (error) {
      throw new Error(`Erreur d'enregistrement de la tâche : ${error.message}`);
    }
    
    return null;
  }
}
