import express from 'express';
import cors from 'cors';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DataService from './src/services/data.js';
import { createCompanySummaryVideo } from './src/compositions/company-summary/index.js';
// express connect & setup
const app = express();
const PORT = process.env.port || 3000;
const corsOptions = {
  origin: '*',
  methods: ['GET'],
};
app.use(cors(corsOptions));

// video upload api
app.get('/employer-branding-video/:companyId', (req, res) => {
  (async () => {
    try {
      const companyId = req.params['companyId'];
      // call apis get data
      const dataService = new DataService(companyId);
      await dataService.fetchData();
      const data = DataService.getCompanyData(companyId);
      res.status(200).send({ msg: 'success' });
      console.log('data===========', data);
      // await videos
      const outputFilePath = await createCompanySummaryVideo(companyId);
      console.log("outputFilePath", outputFilePath);
      // upload to s3
      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESSKEYID,
          secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        },
      });

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const videoAbsolutePath = path.join(__dirname, outputFilePath);
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `company-videos/${companyId}/${companyId}.mp4`,
        Body: fs.createReadStream(videoAbsolutePath),
      };

      // Upload the file to S3
      await s3Client.send(new PutObjectCommand(uploadParams)).then((data) => {
        console.log('data==', data);
        DataService.clearCompanyData(companyId);
        // Delete the file from the local filesystem after successful upload
        if (fs.existsSync(videoAbsolutePath)) {
          fs.unlink(videoAbsolutePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully.');
            }
          });
        }
      });
      // return 200 response
    } catch (err) {
      console.error('=========error========', err);
      res.status(500).send({ status: 'failed', msg: err });
    }
  })();
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log('Server created Successfully on PORT', PORT);
});
