import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Define interfaces based on your proto file
interface AuthResult {
  userId: string;
  token: string;
}

interface UserProfile {
  userId: string;
  name: string;
  surname: string;
  displayName: string;
  email: string;
  telephoneNumber: string;
  lineId: string;
  profileImage?: string;
}

interface AuthClient {
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    surname: string;
    displayName: string;
    telephoneNumber?: string;
    lineId?: string;
    profileImage?: Buffer;
  }) => Promise<AuthResult>;
  getProfile: (userId: string) => Promise<UserProfile>;
  updateProfile: (userData: {
    userId: string;
    name: string;
    surname: string;
    displayName: string;
    telephoneNumber?: string;
    lineId?: string;
    profileImage?: Buffer;
  }) => Promise<UserProfile>;
  changePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<{ message: string }>;
  deleteProfile: (userId: string) => Promise<{ message: string }>;
  logout: (userId: string, token: string) => Promise<{ success: boolean; message: string }>;
}

// Load proto file
const PROTO_PATH = path.resolve(process.cwd(), 'src/libs/userService/grpc/proto/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;

// Create GRPC client
const client = new proto.AuthService(
  process.env.GRPC_SERVER_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
);

// Create and export auth client
export const authClient: AuthClient = {
  login: (email: string, password: string): Promise<AuthResult> => {
    return new Promise((resolve, reject) => {
      client.Login(
        { email, password },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Login error:', error);
            reject(error);
          } else {
            console.log('Login response:', response);
            resolve({
              userId: response.userId,
              token: response.token
            });
          }
        }
      );
    });
  },

  register: (userData): Promise<AuthResult> => {
    return new Promise((resolve, reject) => {
      client.Register(
        userData,
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Register error:', error);
            reject(error);
          } else {
            console.log('Register response:', response);
            resolve({
              userId: response.userId,
              token: response.token
            });
          }
        }
      );
    });
  },

  getProfile: (userId: string): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      client.GetProfile(
        { userId },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('GetProfile error:', error);
            reject(error);
          } else {
            console.log('GetProfile response:', response);
            resolve({
              userId: response.userId,
              name: response.name,
              surname: response.surname,
              displayName: response.displayName,
              email: response.email,
              telephoneNumber: response.telephoneNumber,
              lineId: response.lineId,
              profileImage: response.profileImage
            });
          }
        }
      );
    });
  },

  updateProfile: (userData): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      client.UpdateProfile(
        userData,
        (error: Error | null, response: any) => {
          if (error) {
            console.error('UpdateProfile error:', error);
            reject(error);
          } else {
            console.log('UpdateProfile response:', response);
            resolve({
              userId: response.userId,
              name: response.name,
              surname: response.surname,
              displayName: response.displayName,
              email: response.email,
              telephoneNumber: response.telephoneNumber,
              lineId: response.lineId,
              profileImage: response.profileImage
            });
          }
        }
      );
    });
  },

  changePassword: (userId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      client.ChangePassword(
        { userId, currentPassword, newPassword },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('ChangePassword error:', error);
            reject(error);
          } else {
            console.log('ChangePassword response:', response);
            resolve({ message: response.message });
          }
        }
      );
    });
  },

  deleteProfile: (userId: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      client.DeleteProfile(
        { userId },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('DeleteProfile error:', error);
            reject(error);
          } else {
            console.log('DeleteProfile response:', response);
            resolve({ message: response.message });
          }
        }
      );
    });
  },

  logout: (userId: string, token: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      client.Logout(
        { userId, token },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('Logout error:', error);
            reject(error);
          } else {
            console.log('Logout response:', response);
            resolve({
              success: response.success,
              message: response.message
            });
          }
        }
      );
    });
  },
};