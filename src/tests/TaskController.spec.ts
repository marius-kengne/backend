import { Test, TestingModule } from '@nestjs/testing';
import TaskController from '../Controllers/TaskController';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';

describe('TaskController', () => {
  let taskController: TaskController;
  let useCaseFactory: UseCaseFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: UseCaseFactory,
          useValue: {
            create: jest.fn().mockImplementation(() => ({
              handle: jest.fn().mockResolvedValue({ id: 1, name: 'Test Task' }),
            })),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    useCaseFactory = module.get<UseCaseFactory>(UseCaseFactory);
  });

  it('should create a task', async () => {
    const dto: SaveTaskDto = { id: null, name: 'Test Task' };
    const result = await taskController.create(dto);

    expect(result).toEqual({ id: 1, name: 'Test Task' });
    expect(useCaseFactory.create).toHaveBeenCalledWith(SaveTaskUseCase);
  });
});