import * as argon2 from "argon2";
import obj from "objection";
const {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = obj;
import * as jwt from "jsonwebtoken";
import { IncomingMessage, ServerResponse } from "h3";

const hashPass = async (pass: string): Promise<string> => {
  try {
    const hash = await argon2.hash(pass);
    return hash;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const comparePass = async (pass: string, hash: string): Promise<boolean> => {
  try {
    if (await argon2.verify(hash, pass)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const generateToken = user => {
  const payload = {
    iss: "michapio",
    sub: {
      user_id: user.id,
      email: user.email,
    },
  };
  return jwt.sign({ data: payload }, useRuntimeConfig().JWT_SECRET, {
    expiresIn: 3600,
  });
};

const validateToken = (req: IncomingMessage, token: string) => {
  try {
    const {
      data: { sub },
    } = jwt.verify(token, useRuntimeConfig().JWT_SECRET);
    req.sub = sub;
    return { valid: true };
  } catch (err) {
    const { TokenExpiredError } = jwt;
    if (err instanceof TokenExpiredError) {
      return {
        valid: false,
        message: "Unauthorized! Access Token has Expired!",
      };
    }
    return { valid: false, message: "Unauthorized!" };
  }
};

// In this example `res` is an express response object.
const errorHandler = (err: {}, res: ServerResponse) => {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
            type: err.type,
            data: err.data,
          })
        );
        break;
      case "RelationExpression":
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
            type: "RelationExpression",
            data: {},
          })
        );
        break;
      case "UnallowedRelation":
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
            type: err.type,
            data: {},
          })
        );
        break;
      case "InvalidGraph":
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
            type: err.type,
            data: {},
          })
        );
        break;
      default:
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
            type: "UnknownValidationError",
            data: {},
          })
        );
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "NotFound",
        data: {},
      })
    );
  } else if (err instanceof UniqueViolationError) {
    res.statusCode = 409;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "UniqueViolation",
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint,
        },
      })
    );
  } else if (err instanceof NotNullViolationError) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "NotNullViolation",
        data: {
          column: err.column,
          table: err.table,
        },
      })
    );
  } else if (err instanceof ForeignKeyViolationError) {
    res.statusCode = 409;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "ForeignKeyViolation",
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      })
    );
  } else if (err instanceof CheckViolationError) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "CheckViolation",
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      })
    );
  } else if (err instanceof DataError) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "InvalidData",
        data: {},
      })
    );
  } else if (err instanceof DBError) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "UnknownDatabaseError",
        data: {},
      })
    );
  } else {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: err.message,
        type: "UnknownError",
        data: {},
      })
    );
  }
};

// module.exports = { hashPass, comparePass, generateToken, validateToken, errorHandler };
export { comparePass, errorHandler, generateToken, hashPass, validateToken };
