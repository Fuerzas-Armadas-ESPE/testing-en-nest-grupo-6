import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            getAllPosts: jest.fn().mockResolvedValue([]),
            getPost: jest.fn().mockResolvedValue({ id: '1', title: 'Test post' }),
            createPost: jest.fn().mockResolvedValue({ id: '1', title: 'Test post' }),
            updatePost: jest.fn().mockResolvedValue({ id: '1', title: 'Updated post' }),
            deletePost: jest.fn().mockResolvedValue({ message: 'Post deleted successfully' }),
          },
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should return an array of posts', async () => {
    expect(await postsController.getAllPosts()).toEqual([]);
  });

  it('should return a single post', async () => {
    const result = { id: '1', title: 'Test post' };
    expect(await postsController.getPost('1')).toEqual(result);
  });

  it('should create a post', async () => {
    const result = { id: '1', title: 'Test post' };
    expect(await postsController.createPost(result)).toEqual(result);
  });

  it('should update a post', async () => {
    const result = { id: '1', title: 'Updated post' };
    expect(await postsController.updatePost('1', result)).toEqual(result);
  });

  it('should delete a post', async () => {
    const result = { message: 'Post deleted successfully' };
    expect(await postsController.deletePost('1')).toEqual(result);
  });
});