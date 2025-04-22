import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

export const GRPC_CODE_FROM_HHTTP: Record<number, number> = {
	[HttpStatus.OK]: HttpStatus.OK,
	[HttpStatus.BAD_GATEWAY]: HttpStatus.BAD_GATEWAY,
	[HttpStatus.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
	[HttpStatus.REQUEST_TIMEOUT]: HttpStatus.REQUEST_TIMEOUT,
	[HttpStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
	[HttpStatus.CONFLICT]: HttpStatus.CONFLICT,
	[HttpStatus.FORBIDDEN]: HttpStatus.FORBIDDEN,
	[HttpStatus.PRECONDITION_REQUIRED]: HttpStatus.PRECONDITION_REQUIRED,
	[HttpStatus.METHOD_NOT_ALLOWED]: HttpStatus.METHOD_NOT_ALLOWED,
	[HttpStatus.PAYLOAD_TOO_LARGE]: HttpStatus.PAYLOAD_TOO_LARGE,
	[HttpStatus.NOT_IMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
	[HttpStatus.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
	[HttpStatus.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
};

@Catch(
	Prisma.PrismaClientInitializationError,
	Prisma.PrismaClientValidationError,
	Prisma.PrismaClientKnownRequestError,
	Prisma.PrismaClientUnknownRequestError,
	Prisma.PrismaClientRustPanicError,
	HttpException,
	Error,
)
export class PrismaClientExceptionFilter<
	T extends
		| Prisma.PrismaClientInitializationError
		| Prisma.PrismaClientValidationError
		| Prisma.PrismaClientKnownRequestError
		| Prisma.PrismaClientUnknownRequestError
		| Prisma.PrismaClientRustPanicError
		| HttpException,
> implements ExceptionFilter
{
	private readonly logger = new Logger('PrismaException');

	catch(exception: T, host: ArgumentsHost) {
		this.logger.error(exception.message, exception.stack);
		const request = host.switchToHttp().getRequest<Request>();
		const response = host.switchToHttp().getResponse<Response>();

		let statusCode: HttpStatus;
		let message: string;
		let log: string;

		if ('code' in exception && exception.code && HTTP_CODE_FROM_PRISMA?.[exception.code]) {
			const mapper = HTTP_CODE_FROM_PRISMA[exception.code];
			statusCode = mapper.status;
			message = mapper.message;
		} else {
			statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
			message = 'Sorry! something went to wrong on our end, Please try again later';
		}

		this.logger.error(exception.message);

		return {
			message: JSON.stringify({
				error: message,
				type: typeof message === 'string' ? 'string' : 'object',
			}),
			code: GRPC_CODE_FROM_HTTP[statusCode],
		};
	}
}
