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
        operationId: 'AuthController_login',
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
            description:
              'User is deleted, blocked, not verified or the password is incorrect.',
          },
          404: { description: 'User not found.' },
        },
        tags: ['AuthController'],
      },
    },
    '/api/refresh': {
      post: {
        operationId: 'AuthController_refresh',
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
          401: { description: 'Refresh token is invalid.' },
        },
        tags: ['AuthController'],
      },
    },
    '/api/verify': {
      get: {
        operationId: 'AuthController_verify',
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
          400: { description: 'Something went wrong.' },
          404: { description: 'User not found.' },
        },
        tags: ['AuthController'],
      },
    },
    '/api/users': {
      get: {
        operationId: 'UsersController_getAllUsers',
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
        tags: ['UsersController'],
      },
      post: {
        operationId: 'UsersController_register',
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
        tags: ['UsersController'],
      },
    },
    '/api/users/{id}': {
      get: {
        operationId: 'UsersController_getUserById',
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
        tags: ['UsersController'],
      },
      delete: {
        operationId: 'UsersController_deleteUser',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/email/{email}': {
      get: {
        operationId: 'UsersController_getUserByEmail',
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
        tags: ['UsersController'],
      },
    },
    '/api/users/username/{username}': {
      get: {
        operationId: 'UsersController_getUserByUsername',
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
        tags: ['UsersController'],
      },
    },
    '/api/users/profile/{id}': {
      patch: {
        operationId: 'UsersController_updateProfile',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/profile-picture/{id}': {
      patch: {
        operationId: 'UsersController_updateProfilePicture',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
      delete: {
        operationId: 'UsersController_deleteProfilePicture',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/update-password/{id}': {
      patch: {
        operationId: 'UsersController_updatePassword',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/block/{id}': {
      patch: {
        operationId: 'UsersController_blockUser',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/unblock/{id}': {
      patch: {
        operationId: 'UsersController_unblockUser',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/users/undelete/{id}': {
      patch: {
        operationId: 'UsersController_undeleteUser',
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
        tags: ['UsersController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes': {
      get: {
        operationId: 'WishesController_getAllWishes',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
      post: {
        operationId: 'WishesController_post',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
      patch: {
        operationId: 'WishesController_update',
        parameters: [],
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/public': {
      get: {
        operationId: 'WishesController_getPublicWishes',
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
        tags: ['WishesController'],
      },
    },
    '/api/wishes/wisherId/{wisherId}': {
      get: {
        operationId: 'WishesController_getWishesByWisherId',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/{id}': {
      get: {
        operationId: 'WishesController_getWishById',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
      delete: {
        operationId: 'WishesController_deleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/undelete/{id}': {
      patch: {
        operationId: 'WishesController_undeleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/complete/{id}/{completionDate}': {
      patch: {
        operationId: 'WishesController_completeWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/uncomplete/{id}': {
      patch: {
        operationId: 'WishesController_uncompleteWish',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/change-privacy-level/{id}/{privacyLevel}': {
      patch: {
        operationId: 'WishesController_changeWishPrivacyLevel',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'Wish id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/stage': {
      post: {
        operationId: 'WishesController_createWishStage',
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
      patch: {
        operationId: 'WishesController_updateWishStage',
        parameters: [],
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
        tags: ['WishesController'],
        security: [{ bearer: [] }],
      },
    },
    '/api/wishes/stage/{wishStageId}': {
      delete: {
        operationId: 'WishesController_deleteWishStage',
        parameters: [
          {
            name: 'wishStageId',
            required: true,
            in: 'path',
            description: 'Wish Stage id.',
            example: '61872ad79452fa50b7b70f80',
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
        tags: ['WishesController'],
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
      'Privacy level.': {
        type: 'string',
        enum: ['Public', 'JustFriends', 'OnlyMe'],
      },
      OutputWishStageDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish stage id.',
            example: '61872ad79452fa50b7b70f80',
          },
          title: {
            type: 'string',
            description: 'Wish stage title.',
            example: 'Found the laptop model',
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
            description: 'Wish privacy level.',
            $ref: '#/components/schemas/Privacy level.',
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
          wisherId: {
            type: 'string',
            description: 'Wisher id.',
            example: '61872ad79452fa50b7b70f80',
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
          completedAt: {
            type: 'number',
            description: 'Wish completion date in milliseconds.',
            example: 1636128526164,
          },
        },
        required: [
          'id',
          'title',
          'description',
          'privacyLevel',
          'createdAt',
          'updatedAt',
          'wisherId',
          'urls',
          'imageUrls',
          'categories',
          'stages',
          'deletedAt',
          'completedAt',
        ],
      },
      PrivacyLevel: {
        type: 'string',
        enum: ['Public', 'JustFriends', 'OnlyMe'],
      },
      CreateWishDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Wish id.',
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
            description: 'Wish privacy level.',
            $ref: '#/components/schemas/PrivacyLevel',
            example: 'Public',
          },
          wisherId: {
            type: 'string',
            description: 'Wisher id.',
            example: '61872ad79452fa50b7b70f80',
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
        },
        required: [
          'id',
          'title',
          'description',
          'privacyLevel',
          'wisherId',
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
            description: 'Wish id.',
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
          wishStageId: {
            type: 'string',
            description: 'Wish Stage id.',
            example: '61872ad79452fa50b7b70f80',
          },
        },
        required: [
          'id',
          'title',
          'description',
          'urls',
          'imageUrls',
          'wishStageId',
        ],
      },
      UpdateWishStageDto: {
        type: 'object',
        properties: {
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
          wishStageId: {
            type: 'string',
            description: 'Wish Stage id.',
            example: '61872ad79452fa50b7b70f80',
          },
        },
        required: ['title', 'description', 'urls', 'imageUrls', 'wishStageId'],
      },
    },
  },
};
