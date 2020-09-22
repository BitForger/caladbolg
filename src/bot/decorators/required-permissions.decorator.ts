/**
 * @author admin
 */
import { PermissionString } from 'discord.js';
import { SetMetadata } from '@nestjs/common';

export const RequiredPermissions = (...permissions: PermissionString[]) =>
  SetMetadata('permissions', permissions);
