// src/app/libs/grpc/auth-client.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(process.cwd(), 'src/app/libs/grpc/proto/auth.proto');

interface GetProfileResponse {
  userId: string;
  name: string;
  surname: string;
  displayName: string;
  email: string;
  telephoneNumber: string;
  lineId: string;
  profileImage: string;
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

export const authClient = {
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

  getProfile: (userId: string): Promise<GetProfileResponse> => {
    return new Promise((resolve, reject) => {
      client.GetProfile(
        { userId },
        (error: Error | null, response: GetProfileResponse) => {
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
};