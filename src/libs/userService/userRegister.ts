import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  process.cwd(),
  "src/app/libs/grpc/proto/auth.proto"
);

// Export interfaces
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber?: string;
  lineId?: string;
  profileImage?: Buffer;
}

export interface RegisterResponse {
  userId: string;
  token: string;
  message: string;
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  bytes: Buffer,
});

const proto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;
const client = new proto.AuthService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

export default async function userRegister(userData: RegisterRequest): Promise<RegisterResponse> {
  return new Promise((resolve, reject) => {
    console.log("Calling gRPC Register with:", {
      ...userData,
      password: '[REDACTED]'
    });

    client.Register(
      userData,
      (error: Error | null, response: RegisterResponse) => {
        if (error) {
          console.error("gRPC register error:", error);
          // Convert gRPC error to regular Error
          reject(new Error(error.message));
          return;
        }

        if (!response || !response.userId) {
          console.error("Invalid response from gRPC:", response);
          reject(new Error("Invalid response from registration service"));
          return;
        }

        console.log("gRPC register success:", {
          userId: response.userId,
          hasToken: !!response.token
        });

        resolve(response);
      }
    );
  });
}