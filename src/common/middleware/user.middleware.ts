


// 中间件针对 request，拦截器针对 response
export default function userMiddleware(req: any, res: any, next: () => void) {
  console.log("---user-函数中间件-1--");
  // res.send('你已经被拦截了')
  next();
}
