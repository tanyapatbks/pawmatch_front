import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(process.cwd(), 'src/app/libs/grpc/proto/auth.proto');

interface UpdateProfileRequest {
  userId: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber: string;
  lineId: string;
}

interface UpdateProfileResponse {
  userId: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber: string;
  lineId: string;
}


export type AuthClient = {
  login: (userEmail: string, userPassword: string) => Promise<any>;
  register: (userData: any) => Promise<any>;
  getProfile: (userId: string) => Promise<any>;
  updateProfile: (data: UpdateProfileRequest) => Promise<UpdateProfileResponse>;
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;
const client = new proto.AuthService(
  '127.0.0.1:50051',
  grpc.credentials.createInsecure()
);

export const authClient: AuthClient = {
  login: (userEmail: string, userPassword: string) => {
    return new Promise((resolve, reject) => {
      client.Login(
        { email: userEmail, password: userPassword },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('gRPC login error:', error);
            reject(error);
          } else {
            console.log('gRPC login response:', response);
            resolve(response);
          }
        }
      );
    });
  },

  register: (userData: any) => {
    return new Promise((resolve, reject) => {
      client.Register(
        userData,
        (error: Error | null, response: any) => {
          if (error) {
            console.error('gRPC register error:', error);
            reject(error);
          } else {
            console.log('gRPC register response:', response);
            resolve(response);
          }
        }
      );
    });
  },

  getProfile: (userId: string) => {
    return new Promise((resolve, reject) => {
      client.GetProfile(
        { userId },
        (error: Error | null, response: any) => {
          if (error) {
            console.error('gRPC getProfile error:', error);
            reject(error);
          } else {
            console.log('gRPC getProfile response:', response);
            resolve(response);
          }
        }
      );
    });
  },

  updateProfile: (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return new Promise((resolve, reject) => {
      client.UpdateProfile(
        data,
        (error: Error | null, response: UpdateProfileResponse) => {
          if (error) {
            console.error('gRPC updateProfile error:', error);
            reject(error);
          } else {
            console.log('gRPC updateProfile response:', response);
            resolve(response);
          }
        }
      );
    });
  },
};