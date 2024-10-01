// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Here you can perform checks, such as checking cookies or headers
//       console.log('Request Body:', req.body);   // Inspect the request body
//       console.log('Request Headers:', req.headers); // Inspect the headers

//       // Perform any authentication logic you need (e.g., check tokens, cookies)
//       const isAuthenticated = await this.checkAuth(req); // Example function to check auth

//       if (!isAuthenticated) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }

//       next(); // Call the next middleware or controller
//     } catch (error) {
//       console.error('Error in middleware:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   private async checkAuth(req: Request): Promise<boolean> {
//     // Example logic: Check if there's a valid token/cookie
//     if (req.cookies && req.cookies['auth-token']) {
//       // Verify the token, or check user session
//       return true;
//     }
//     return false;
//   }
// }


import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Implement your authentication logic here
      console.log('-------------------- Request Headers:', req.headers);
      
      console.log('Cookies:', req.cookies); // Make sure this logs the cookies
      console.log('AccessToken:', req.cookies['accessToken']);

      // Example: Check for a token or cookie
      if (!req.cookies || !req.cookies['accessToken']) {
        console.log("no req.cookie")
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        console.log('im here im valid');
        next();
      }
    } catch (error) {
      console.error('Error in middleware:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
