I need to create a full stack application with a frontend and a multi service backend. 
I need to setup the system locally,  setup CICD pipelines to build and deploy to cloud run or gke. 

it will be developed by myself alone or a very small team. I would prefer react or nextjs frontend. Typescript backend with apis using either express or fastify

If I go with nextjs monorepo, what are the possibilities of easily seperating the backend later

how about nextjs server side rendering capability that removes the need to implement apis


I think I will try the nextjs monorepo approach using ssr.  But making sure the backend  logic is loosely coupled so that a seperate service also can reuse the same logic to implement a rest api or grpc api as well.




