import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';


describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: {}, // Provide a mock value for the model
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Este test verifica que el método deletePost se defina en el servicio
  it('should have a deletePost method', () => {
    expect(service.deletePost).toBeDefined();
  });

  //Este test verifica que el método deletePost sea llamado con los parámetros correctos
  it('should call deletePost method with correct parameters', async () => {
    const postId = 'testId';
    service.deletePost = jest.fn().mockResolvedValue({});
    
    await service.deletePost(postId);
    
    expect(service.deletePost).toHaveBeenCalledWith(postId);
  });
});
