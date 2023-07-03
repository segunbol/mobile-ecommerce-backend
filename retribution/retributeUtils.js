import { expressjwt } from 'express-jwt';

export const isHumanResources = (req, res, next) => {
  if (req.body && req.body.role === 'Human Resources') {
    const oli = JSON.stringify(req.user)
    console.log(oli);
    next();
  } else {
    res.status(401).send({ message: "Invalid Token" });
  }
};

export const isManagerOrHumanResources = (req, res, next) => {
    if ((req.body && req.body.role === 'Human Resources') || (req.body && req.body.role === 'Manager')) {
      next();
    } else {
      res.status(401).send({ message: "Not Permitted" });
    }
  };

export const isManager = (req, res, next) => {
  if (req.body && req.body.role === "Manager") {
    next();
  } else {
    res.status(401).send({ message: "Not Permitted" });
  }
};

export const isEmployee = (req, res, next) => {
  if (req.body &&  req.body.role === "Employee") {
    next();
  } else {
    res.status(401).send({ message: "Not Permitted" });
  }
};

function authJwt() {
    const secret = process.env.SECRET
    const api = process.env.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/staffs/login`,
            `${api}/staffs`,
        ]
    })
}

async function isRevoked(req, token){
    if(!token.payload.isAdmin) {
       return true;
    }
}
export default authJwt;
