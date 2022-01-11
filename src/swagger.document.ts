import { OpenAPIObject } from '@nestjs/swagger';

export const swaggerDocument: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Wish List API',
    description:
      'Wish List API is a backend API to post wishes, you can publish and keep track of them, recording the progress you make, until you fulfill them.',
    version: '0.0.1',
    contact: {
      name: 'JM Orbegoso',
      url: 'https://www.jmorbegoso.com/',
    },
  },
  paths: {
    '/api/login': {
      post: {
        operationId: 'Login',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginDto' },
            },
          },
        },
        responses: {
          200: {
            description: 'User login successfully.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthTokensDto' },
              },
            },
          },
          401: {
            description: 'User is invalid or the password is incorrect.',
          },
          400: { description: 'Bad Request.' },
          404: { description: 'User not found.' },
        },
        tags: ['Auth'],
      },
    },
    '/api/refresh': {
      post: {
        operationId: 'Refresh',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RefreshTokenDto' },
            },
          },
        },
        responses: {
          200: {
            description: 'Auth tokens successfully refreshed.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthTokensDto' },
              },
            },
          },
          400: { description: 'Refresh token is invalid.' },
          401: { description: 'Invalid user or refresh token.' },
        },
        tags: ['Auth'],
      },
    },
    '/api/verify': {
      get: {
        operationId: 'Verify',
        parameters: [
          {
            name: 'code',
            required: true,
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'User verified successfully.' },
          400: {
            description: 'Invalid verification code or invalid User.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Auth'],
      },
    },
    '/api/users': {
      get: {
        operationId: 'GetAllUsers',
        parameters: [],
        responses: {
          200: {
            description: 'Users found.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/OutputUserDto' },
                },
              },
            },
          },
        },
        tags: ['Users'],
      },
      post: {
        operationId: 'Register',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserDto' },
            },
          },
        },
        responses: {
          201: { description: 'User created successfully.' },
          400: { description: 'Something went wrong.' },
        },
        tags: ['Users'],
      },
    },
    '/api/users/{id}': {
      get: {
        operationId: 'GetUserById',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OutputUserDto' },
              },
            },
          },
          400: { description: 'Something went wrong.' },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
      },
      delete: {
        operationId: 'DeleteUser',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'User deleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users Management'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/email/{email}': {
      get: {
        operationId: 'GetUserByEmail',
        parameters: [
          {
            name: 'email',
            required: true,
            in: 'path',
            description: 'User email.',
            example: 'john@doe.com',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OutputUserDto' },
              },
            },
          },
          400: { description: 'Something went wrong.' },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
      },
    },
    '/api/users/username/{username}': {
      get: {
        operationId: 'GetUserByUsername',
        parameters: [
          {
            name: 'username',
            required: true,
            in: 'path',
            description: 'User UserName.',
            example: 'john_doe',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OutputUserDto' },
              },
            },
          },
          400: { description: 'Something went wrong.' },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
      },
    },
    '/api/users/profile/{id}': {
      patch: {
        operationId: 'UpdateProfile',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserProfileDto' },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/profile-picture/{id}': {
      patch: {
        operationId: 'UpdateProfilePicture',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                    description:
                      'User profile picture, in jpg format and 1 Mb max size.',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
          413: { description: 'File too large.' },
        },
        tags: ['Users'],
        security: [{ bearer: [] }],
      },
      delete: {
        operationId: 'DeleteProfilePicture',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User profile picture successfully deleted.',
          },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/update-password/{id}': {
      patch: {
        operationId: 'UpdatePassword',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserPasswordDto' },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/block/{id}': {
      patch: {
        operationId: 'BlockUser',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'User blocked successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users Management'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/unblock/{id}': {
      patch: {
        operationId: 'UnblockUser',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'User unblocked successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users Management'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/undelete/{id}': {
      patch: {
        operationId: 'UndeleteUser',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'User undeleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['Users Management'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes': {
      get: {
        operationId: 'GetAllWishes',
        parameters: [],
        responses: {
          200: {
            description: 'Wishes found.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/OutputWishDto' },
                },
              },
            },
          },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
      post: {
        operationId: 'Post',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateWishDto' },
            },
          },
        },
        responses: {
          201: { description: 'Wish created successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/public': {
      get: {
        operationId: 'GetPublicWishes',
        parameters: [],
        responses: {
          200: {
            description: 'Wishes found.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/OutputWishDto' },
                },
              },
            },
          },
        },
        tags: ['Wishes'],
      },
    },
    '/api/wishes/wisherId/{wisherId}': {
      get: {
        operationId: 'GetWishesByWisherId',
        parameters: [
          {
            name: 'wisherId',
            required: true,
            in: 'path',
            description: 'Wisher id.',
            example: '61872ad79452fa50b7b70f80',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Wishes found.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/OutputWishDto' },
                },
              },
            },
          },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/{id}': {
      get: {
        operationId: 'GetWishById',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Wish found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OutputWishDto' },
              },
            },
          },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
      patch: {
        operationId: 'Update',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateWishDto' },
            },
          },
        },
        responses: {
          201: { description: 'Wish updated successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
      delete: {
        operationId: 'DeleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Wish deleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/undelete/{id}': {
      patch: {
        operationId: 'UndeleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Wish undeleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/complete/{id}/{completionDate}': {
      patch: {
        operationId: 'CompleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
          {
            name: 'completionDate',
            required: true,
            in: 'path',
            description: 'Wish completion date in milliseconds.',
            example: '1638123780283',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Wish completed successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/uncomplete/{id}': {
      patch: {
        operationId: 'UncompleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Wish uncompleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/change-privacy-level/{id}/{privacyLevel}': {
      patch: {
        operationId: 'ChangeWishPrivacyLevel',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
            schema: { type: 'string' },
          },
          {
            name: 'privacyLevel',
            required: true,
            in: 'path',
            description: 'Wish privacy level.',
            example: 'Public',
            schema: { $ref: '#/components/schemas/PrivacyLevel' },
          },
        ],
        responses: {
          200: { description: 'Wish privacy level changed successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish not found.' },
        },
        tags: ['Wishes'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wish-stages': {
      post: {
        operationId: 'CreateWishStage',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateWishStageDto' },
            },
          },
        },
        responses: {
          201: { description: 'Wish stage created successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wish Stages'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wish-stages/{id}': {
      patch: {
        operationId: 'UpdateWishStage',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish stage id.',
            example: '61c4c0dec96d0f2ad6858ec9',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateWishStageDto' },
            },
          },
        },
        responses: {
          201: { description: 'Wish stage updated successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
        },
        tags: ['Wish Stages'],
        security: [{ bearer: [] }],
      },
      delete: {
        operationId: 'DeleteWishStage',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish stage id.',
            example: '61c4c0dec96d0f2ad6858ec9',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Wish stage deleted successfully.' },
          400: { description: 'Something went wrong.' },
          401: { description: 'User is not authenticated.' },
          403: {
            description:
              'This resource is prohibited for the authenticated user.',
          },
          404: { description: 'Wish stage not found.' },
        },
        tags: ['Wish Stages'],
        security: [{ bearer: [] }],
      },
    },
  },
  tags: [],
  servers: [],
  components: {
    securitySchemes: {
      bearer: { scheme: 'bearer', bearerFormat: 'JWT', type: 'http' },
    },
    schemas: {
      LoginDto: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'User UserName.',
            example: 'john_doe',
          },
          password: {
            type: 'string',
            description: 'User password.',
            example: 'Pa$$w0rd',
          },
        },
        required: ['username', 'password'],
      },
      AuthTokensDto: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            description: 'Access Token',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg3MmFkNzk0NTJmYTUwYjdiNzBmODAiLCJpYXQiOjE2Mzc4OTAxMTEsImV4cCI6MTYzNzg5MDE3MX0.nYTu6-9saedMCzPx76Y2bHVDgiH_kgybajJR7VB3584',
          },
          refresh_token: {
            type: 'string',
            description: 'Refresh Token',
            example: '61a0f44512c57626e239724a',
          },
        },
        required: ['access_token', 'refresh_token'],
      },
      RefreshTokenDto: {
        type: 'object',
        properties: {
          refresh_token: {
            type: 'string',
            description: 'Refresh Token',
            example: '61a0f44512c57626e239724a',
          },
        },
        required: ['refresh_token'],
      },
      OutputUserDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'john@doe.com',
          },
          username: {
            type: 'string',
            description: 'User Username.',
            example: 'john_doe',
          },
          isVerified: {
            type: 'boolean',
            description: 'User verification status.',
            example: true,
          },
          isBlocked: {
            type: 'boolean',
            description: 'User block status.',
            example: true,
          },
          firstName: {
            type: 'string',
            description: 'User first name.',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'User last name.',
            example: 'Doe',
          },
          birthday: {
            type: 'number',
            description: 'User birthday in milliseconds.',
            example: 1636128526164,
          },
          createdAt: {
            type: 'number',
            description: 'User createdAt date in milliseconds.',
            example: 1636128526164,
          },
          updatedAt: {
            type: 'number',
            description: 'User updatedAt date in milliseconds.',
            example: 1636128526164,
          },
          biography: {
            type: 'string',
            description: 'User biography.',
            example: 'A nice person.',
          },
          roles: {
            type: 'array',
            items: { type: 'string' },
            description: 'User roles.',
            example: ['Admin', 'Moderator'],
          },
          profilePicture: {
            type: 'string',
            description: 'User profile picture url.',
            example: 'https://www.example.com',
          },
          deletedAt: {
            type: 'number',
            description: 'User deletedAt date in milliseconds.',
            example: 1636128526164,
          },
        },
        required: [
          'id',
          'email',
          'username',
          'isVerified',
          'isBlocked',
          'firstName',
          'lastName',
          'birthday',
          'createdAt',
          'updatedAt',
          'biography',
          'roles',
          'profilePicture',
          'deletedAt',
        ],
      },
      CreateUserDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'john@doe.com',
          },
          username: {
            type: 'string',
            description: 'User UserName.',
            example: 'john_doe',
          },
          password: {
            type: 'string',
            description: 'User password.',
            example: 'Pa$$w0rd',
          },
          firstName: {
            type: 'string',
            description: 'User first name.',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'User last name.',
            example: 'Doe',
          },
          birthday: {
            type: 'number',
            description: 'User birthday in milliseconds.',
            example: 1636128526164,
          },
          biography: {
            type: 'string',
            description: 'User biography.',
            example: 'A nice person.',
          },
        },
        required: [
          'id',
          'email',
          'username',
          'password',
          'firstName',
          'lastName',
          'birthday',
          'biography',
        ],
      },
      UpdateUserProfileDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
          },
          firstName: {
            type: 'string',
            description: 'User first name.',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'User last name.',
            example: 'Doe',
          },
          birthday: {
            type: 'number',
            description: 'User birthday in milliseconds.',
            example: 1636128526164,
          },
          biography: {
            type: 'string',
            description: 'User biography.',
            example: 'A nice person.',
          },
        },
        required: ['id', 'firstName', 'lastName', 'birthday', 'biography'],
      },
      UpdateUserPasswordDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61872ad79452fa50b7b70f80',
          },
          password: {
            type: 'string',
            description: 'User password.',
            example: 'Pa$$w0rd',
          },
        },
        required: ['id', 'password'],
      },
      OutputWishStageDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish stage id.',
            example: '61c4c0dec96d0f2ad6858ec9',
          },
          title: {
            type: 'string',
            description: 'Wish stage title.',
            example: 'Found the best laptop model.',
          },
          description: {
            type: 'string',
            description: 'Wish stage description.',
            example: 'Find a nice laptop model to buy.',
          },
          createdAt: {
            type: 'number',
            description: 'Wish stage creation date in milliseconds.',
            example: 1636128526164,
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage urls.',
            example: [
              'https://www.example.com/0/',
              'https://www.example.com/1/',
            ],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage images.',
            example: [
              'https://www.example.com/0.jpg',
              'https://www.example.com/1.jpg',
            ],
          },
        },
        required: [
          'id',
          'title',
          'description',
          'createdAt',
          'urls',
          'imageUrls',
        ],
      },
      OutputWishDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
          },
          wisherId: {
            type: 'string',
            description: 'Wisher id.',
            example: '61872ad79452fa50b7b70f80',
          },
          title: {
            type: 'string',
            description: 'Wish title.',
            example: 'High-End Laptop',
          },
          description: {
            type: 'string',
            description: 'Wish description.',
            example: 'A nice laptop.',
          },
          privacyLevel: {
            $ref: '#/components/schemas/PrivacyLevel',
          },
          createdAt: {
            type: 'number',
            description: 'Wish creation date in milliseconds.',
            example: 1636128526164,
          },
          updatedAt: {
            type: 'number',
            description: 'Wish update date in milliseconds.',
            example: 1636128526164,
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish urls.',
            example: [
              'https://www.example.com/0/',
              'https://www.example.com/1/',
            ],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish images.',
            example: [
              'https://www.example.com/0.jpg',
              'https://www.example.com/1.jpg',
            ],
          },
          categories: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish categories.',
            example: ['Tech', 'Shopping'],
          },
          stages: {
            type: 'array',
            items: { $ref: '#/components/schemas/OutputWishStageDto' },
            description: 'Wish stages.',
          },
          deletedAt: {
            type: 'number',
            description: 'Wish delete date in milliseconds.',
            example: 1636128526164,
          },
          startedAt: {
            type: 'number',
            description: 'Wish started at date in milliseconds.',
            example: 1636128526164,
          },
          completedAt: {
            type: 'number',
            description: 'Wish completion date in milliseconds.',
            example: 1636128526164,
          },
        },
        required: [
          'id',
          'wisherId',
          'title',
          'description',
          'privacyLevel',
          'createdAt',
          'updatedAt',
          'urls',
          'imageUrls',
          'categories',
          'stages',
          'deletedAt',
          'startedAt',
          'completedAt',
        ],
      },
      PrivacyLevel: {
        type: 'string',
        enum: ['Public', 'JustFriends', 'OnlyMe'],
        description: 'Wish privacy level.',
        example: 'Public',
      },
      CreateWishDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
          },
          wisherId: {
            type: 'string',
            description: 'Wisher id.',
            example: '61872ad79452fa50b7b70f80',
          },
          title: {
            type: 'string',
            description: 'Wish title.',
            example: 'New Laptop',
          },
          description: {
            type: 'string',
            description: 'Wish description.',
            example: 'A brand new laptop.',
          },
          privacyLevel: {
            $ref: '#/components/schemas/PrivacyLevel',
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish urls',
            example: ['https://www.example.com'],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish image urls',
            example: ['https://www.example.com/1.jpg'],
          },
          categories: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish categories.',
            example: ['Tech'],
          },
          startedAt: {
            type: 'number',
            description: 'Wish started at date in milliseconds.',
            example: 1636128526164,
          },
          completedAt: {
            type: 'number',
            description: 'Wish completed at date in milliseconds.',
            example: 1636128526164,
          },
        },
        required: [
          'id',
          'wisherId',
          'title',
          'description',
          'privacyLevel',
          'urls',
          'imageUrls',
          'categories',
        ],
      },
      UpdateWishDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
          },
          title: {
            type: 'string',
            description: 'Wish title.',
            example: 'New Laptop',
          },
          description: {
            type: 'string',
            description: 'Wish description.',
            example: 'A brand new laptop.',
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish urls',
            example: ['https://www.example.com'],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish image urls',
            example: ['https://www.example.com/1.jpg'],
          },
          categories: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish categories.',
            example: ['Tech'],
          },
          startedAt: {
            type: 'number',
            description: 'Wish started at date in milliseconds.',
            example: 1636128526164,
          },
          completedAt: {
            type: 'number',
            description: 'Wish completed at date in milliseconds.',
            example: 1636128526164,
          },
        },
        required: [
          'id',
          'title',
          'description',
          'urls',
          'imageUrls',
          'categories',
        ],
      },
      CreateWishStageDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish stage id.',
            example: '61c4c0dec96d0f2ad6858ec9',
          },
          wishId: {
            type: 'string',
            description: 'Wish id.',
            example: '61c4c0fec96d0f2ad6858ecb',
          },
          title: {
            type: 'string',
            description: 'Wish stage title.',
            example: 'Found the best laptop model.',
          },
          description: {
            type: 'string',
            description: 'Wish stage description.',
            example: 'Find a nice laptop model to buy.',
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage urls.',
            example: ['https://www.example.com/1', 'https://www.example.com/2'],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage images.',
            example: [
              'https://www.example.com/1.jpg',
              'https://www.example.com/2.jpg',
            ],
          },
        },
        required: ['id', 'wishId', 'title', 'description', 'urls', 'imageUrls'],
      },
      UpdateWishStageDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish stage id.',
            example: '61c4c0dec96d0f2ad6858ec9',
          },
          title: {
            type: 'string',
            description: 'Wish stage title.',
            example: 'Found the best laptop model.',
          },
          description: {
            type: 'string',
            description: 'Wish stage description.',
            example: 'Find a nice laptop model to buy.',
          },
          urls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage urls.',
            example: [
              'https://www.example.com/new',
              'https://www.example.com/new',
            ],
          },
          imageUrls: {
            type: 'array',
            items: { type: 'string' },
            description: 'Wish stage images.',
            example: [
              'https://www.example.com/new-1.jpg',
              'https://www.example.com/new-2.jpg',
            ],
          },
        },
        required: ['id', 'title', 'description', 'urls', 'imageUrls'],
      },
    },
  },
};
