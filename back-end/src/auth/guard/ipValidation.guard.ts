import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientIp = request.ip;
    const userAgent = request.headers['user-agent'];

    // Validate IP and user-agent (This is just a basic example, adjust as needed)
    if (clientIp && userAgent) {
      // You could check the IP and User-Agent against stored values or patterns
      // For simplicity, we're just logging them here
      console.log(`Client IP: ${clientIp}`);
      console.log(`User-Agent: ${userAgent}`);
      
      return true; // Allow access
    } else {
      throw new UnauthorizedException('Invalid request source');
    }
  }
}
