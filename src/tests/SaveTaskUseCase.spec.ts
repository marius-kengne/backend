import { Test, TestingModule } from '@nestjs/testing';
import TaskRepository from '../Repositories/TaskRepository';
import { PrismaService } from '../PrismaService';

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskRepository,
        {
          provide: PrismaService,
          useValue: {
            task: {
              findMany: jest.fn(),
              delete: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find all tasks', async () => {
    const mockTasks = [
      {
        id: 1,
        name: 'Test Task',
        createdAt: new Date(), 
        updatedAt: new Date(), 
      },
    ];
    jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(mockTasks);
  
    const result = await taskRepository.findAll();
    expect(result).toEqual(mockTasks);
    expect(prismaService.task.findMany).toHaveBeenCalled();
  });
  
  it('should delete a task', async () => {
    const mockTask = {
      id: 1,
      name: 'Test Task',
      createdAt: new Date(), 
      updatedAt: new Date(),
    };
    jest.spyOn(prismaService.task, 'delete').mockResolvedValue(mockTask);
  
    const result = await taskRepository.delete(1);
    expect(result).toEqual(mockTask);
    expect(prismaService.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});