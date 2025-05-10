import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
        cloud_name: 'dcaufvn3n',
        api_key: '423469859132672',
        api_secret: 'ovOFCG1X_3EG0_X8WVotYqa0wR4',
    });
  },
};