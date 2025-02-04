import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { 
  S3Client, 
  PutObjectCommand, 
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  CompletedPart
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With",
  "Content-Type": "application/json"
};

// Helper function to wrap responses with CORS headers
const createResponse = (
  statusCode: number,
  body: any
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body)
  };
};

export const getUploadUrl: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, {});
  }

  const fileName = `uploads/${Date.now()}.jpg`;
  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_KEY!,
      secretAccessKey: process.env.AWS_SECRET!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: "dev-docsile-media-upload",
    Key: fileName,
  });

  try {
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const imageURL = `https://dev-docsile-media-upload.s3.ap-south-1.amazonaws.com/${fileName}`;
    return createResponse(200, { uploadURL, imageURL });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return createResponse(500, { error: "Failed to generate upload URL" });
  }
};

export const getMultipleUploadUrls: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, {});
  }

  if (!event.body) {
    return createResponse(400, { error: "Request body is required" });
  }

  const { fileCount, fileTypes, id, type } = JSON.parse(event.body);

  if (!fileCount || fileCount > 6 || !Array.isArray(fileTypes)) {
    return createResponse(400, {
      error: "Invalid request. Maximum 6 files allowed.",
    });
  }

  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_KEY!,
      secretAccessKey: process.env.AWS_SECRET!,
    },
  });

  try {
    const urls = await Promise.all(
      Array.from({ length: fileCount }).map(async (_, index) => {
        const uniqueSuffix = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`;
        const fileName = `${id}/${type}/${uniqueSuffix}.${
          fileTypes[index].split("/")[1]
        }`;
        const command = new PutObjectCommand({
          Bucket: "dev-docsile-media-upload",
          Key: fileName,
          ContentType: fileTypes[index],
        });

        const uploadURL = await getSignedUrl(s3Client, command, {
          expiresIn: 60,
        });
        const imageURL = `https://dev-docsile-media-upload.s3.ap-south-1.amazonaws.com/${fileName}`;
        return { uploadURL, imageURL };
      })
    );

    return createResponse(200, { urls });
  } catch (error) {
    console.error("Error generating upload URLs:", error);
    return createResponse(500, { error: "Failed to generate upload URLs" });
  }
};

export const MultipartUpload: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  if (!event.body) {
    return createResponse(400, { error: "Request body is required" });
  }

  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_KEY!,
      secretAccessKey: process.env.AWS_SECRET!,
    },
  });

  const path = event.resource;

  try {
    const body = JSON.parse(event.body);

    switch (path) {
      case '/start-multipart-upload': {
        const { fileName, contentType, partNumbers } = body;
        let params: any = {
          Bucket: "dev-docsile-media-upload",
          Key: fileName,
        };

        if (contentType === "VIDEO") {
          params.ContentDisposition = "inline";
          params.ContentType = "video/mp4";
        }

        try {
          const command = new CreateMultipartUploadCommand(params);
          const multipart = await s3Client.send(command);

          const uploadId =  multipart.UploadId

          const totalParts = Array.from({ length: partNumbers }, (_, i) => i + 1);

          try {
            const presignedUrls = await Promise.all(
              totalParts.map(async (partNumber) => {
                const command = new UploadPartCommand({
                  Bucket: "dev-docsile-media-upload",
                  Key: fileName,
                  PartNumber: partNumber,
                  UploadId: uploadId,
                });
  
                return getSignedUrl(s3Client, command, { expiresIn: 3600 * 3 });
              })
            );
            return createResponse(200, { presignedUrls , uploadId });
          } catch (error) {
            console.error("Error generating pre-signed URLs:", error);
            return createResponse(500, { error: "Error generating pre-signed URLs" });
          }

        } catch (error) {
          console.error("Error starting multipart upload:", error);
          return createResponse(500, { error: "Error starting multipart upload" });
        }
      }

      case '/generate-presigned-url': {
        const { fileName, uploadId, partNumbers } = body;
        const totalParts = Array.from({ length: partNumbers }, (_, i) => i + 1);

        try {
          const presignedUrls = await Promise.all(
            totalParts.map(async (partNumber) => {
              const command = new UploadPartCommand({
                Bucket: "dev-docsile-media-upload",
                Key: fileName,
                PartNumber: partNumber,
                UploadId: uploadId,
              });

              return getSignedUrl(s3Client, command, { expiresIn: 3600 * 3 });
            })
          );
          return createResponse(200, { presignedUrls });
        } catch (error) {
          console.error("Error generating pre-signed URLs:", error);
          return createResponse(500, { error: "Error generating pre-signed URLs" });
        }
      }

      case '/complete-multipart-upload': {
        const { fileName, uploadId, parts } = body;

        const params = {
          Bucket: "dev-docsile-media-upload",
          Key: fileName,
          UploadId: uploadId,
          MultipartUpload: {
            Parts: parts.map((part: { etag: string }, index: number): CompletedPart => ({
              ETag: part.etag,
              PartNumber: index + 1,
            })),
          },
        };

        try {
          const command = new CompleteMultipartUploadCommand(params);
          const data = await s3Client.send(command);
          return createResponse(200, { fileData: data });
        } catch (error) {
          console.error("Error completing multipart upload:", error);
          return createResponse(500, { error: "Error completing multipart upload" });
        }
      }

      default:
        return createResponse(400, { error: "Invalid endpoint" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return createResponse(500, { error: "Internal server error" });
  }
};